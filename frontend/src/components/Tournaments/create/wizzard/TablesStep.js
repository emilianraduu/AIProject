import React, { useContext } from 'react'
import TournamentTablesProprietiesForm from '../../view/tables/TournamentTablesProprietiesForm'
import { saveTournamentWizzardStep } from './WizzardActions'
import { WizzardContext } from './WizzardContext'
import { isMobile } from 'react-device-detect'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BoxWrapper } from '../../../Global/Box/styles/box'
import { WizzardHeader } from '../../../../styles/shared/headerWizzard'
import { TABLES } from '../../../../styles/abstract/variables'
import { SecondaryButton } from '../../../../styles/shared/button'
import { saveTournament } from '../../TournamentsActions'
import { TournamentsContext } from '../../TournamentsContext'
import { AuthContext } from '../../../Auth/AuthContext'

export default ({ history, match }) => {
  const wizzardContext = useContext(WizzardContext)
  const tournamentsContext = useContext(TournamentsContext)
  const authContext = useContext(AuthContext)
  const tournamentType = match.url.split('/')[1]
  const { table, steps } = wizzardContext.state[tournamentType]
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'table', data: values, wizzardContext, tournamentType })
    saveTournament({ wizzardContext, tournamentsContext, authContext, table: values, history, tournamentType })
  }
  return (
    <PageContent type={isMobile ? undefined : 'web'}>

      <BoxWrapper web={!isMobile} large={!isMobile}>
        {/* <BoxHeader>
        <HeaderWithIcon flex>
          <i className={MONEY_BILL_ICON} />
          <BigPGreyBold>Fee</BigPGreyBold>
        </HeaderWithIcon>
      </BoxHeader> */}
        <WizzardHeader currentStep={steps.table} steps={steps.total} icon={TABLES} title='Table properties' />

        <TournamentTablesProprietiesForm
          onSubmit={onSubmit} initialValues={table} renderActions={({ invalid, pristine }) => (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', marginTop: 20 }}>
              <SecondaryButton type='submit' full filled>Save {match.path.includes('cashgames') ? 'cash game' : 'tournament'}</SecondaryButton>
              <div style={{ height: 0, width: 30 }} />
              <SecondaryButton full onClick={() => history.push(`/${tournamentType}/create/fee`)}>Previous step</SecondaryButton>
            </div>
          )}
        />
      </BoxWrapper>

    </PageContent>
  )
}
