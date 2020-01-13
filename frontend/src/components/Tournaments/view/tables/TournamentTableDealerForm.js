import React, { useContext, useEffect } from 'react'
import { FormItem } from '../../../../styles/shared/form'
import { Label, NormalP, SmallP } from '../../../../styles/typography/typography'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { Field, Form } from 'react-final-form'
import { updateTable, updateTournamentTableProps } from '../ActiveTournamentActions'
import { AuthContext } from '../../../Auth/AuthContext'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { InfiniteSelect } from '../../../Global/Select/InfiniteSelect'
import { changeUsersPage, getUsers } from '../../../Users/UsersActions'
import { UsersContext } from '../../../Users/UsersContext'
import { CustomSwapWrapper, TablePlayerWrapper } from './style'
import { ProfileBoxLeft, ProfileBoxRight } from '../../../Global/Box/styles/box'
import { SYNC_ICON } from '../../../../styles/abstract/variables'
import { Avatar } from '../../../../styles/shared/avatar'
import Flag from 'react-world-flags'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import { changeCountriesPage } from '../../../Countries/CountriesActions'

const tableValidation = ({}) => {
  const errors = {}
  return errors
}
const customOption = ({ firstName, lastName, country, countryCode, value, type, seatNo, url }) => (
  <TablePlayerWrapper pointer>
    <ProfileBoxLeft small>
      <Avatar url={url}/>
    </ProfileBoxLeft>
    <ProfileBoxRight>
      <NormalP>{firstName} {lastName}</NormalP>
      <SmallP space>
        <> {
          countryCode && <Flag code={countryCode} height={10}/>} {country}</>
      </SmallP>
    </ProfileBoxRight>
  </TablePlayerWrapper>
)
export default function TournamentTableDealerForm({ onClose, renderActions, table }) {
  const authContext = useContext(AuthContext)
  const usersContext = useContext(UsersContext)
  const tournamentContext = useContext(ActiveTournamentContext)
  const { users: dealers } = usersContext.state
  const { pagination } = usersContext.state

  useEffect(() => {
    async function a() {
      getUsers(authContext, usersContext, pagination.page, [['role', '=', 'dealer']])
    }
    a()
  }, [pagination.page])

  const onSubmit = (data) => {
    updateTable({
      tableId: table.id,
      data: { dealer: data.dealer.id },
      authContext,
      tournamentContext
    })
    onClose()
  }

  const dealerOptions = () => {
    let options = []
    if (dealers) {
      dealers.map(dealer => {
        options.push({
          id: dealer.id,
          url: dealer.profileImage && dealer.profileImage.url,
          value: `${dealer.firstName} ${dealer.lastName}`,
          firstName: dealer.firstName,
          lastName: dealer.lastName
        })
      })
    }
    return options
  }
  const onDealersScrollToBottom = () => {
    pagination.page < pagination.pageCount && changeUsersPage(usersContext, { selected: pagination.page })
  }
  return (
    <Form
      onSubmit={onSubmit}
      validate={tableValidation}
      initialValues={{
        dealer: {

        }
      }}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
          <FormItem>
            <Label upper>Select Dealer</Label>
            <Field
              component={InfiniteSelect}
              formatOptionLabel={customOption}
              options={dealerOptions()}
              onMenuScrollToBottom={onDealersScrollToBottom}
              name='dealer'
              placeholder={'Select dealer'}
            />
          </FormItem>
          {renderActions ? renderActions({ invalid, pristine }) : (
            <PanelFooter>
              <PanelClear>
                <SecondaryButton rightMargin onClick={onClose}>
                  Close
                </SecondaryButton>
                <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                  Apply
                </SecondaryButton>
              </PanelClear>
            </PanelFooter>)}
        </form>
      )}
    />
  )
}
