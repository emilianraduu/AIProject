import React, { useContext } from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BoxWrapper, BoxHeader, HeaderWithIcon } from '../../../Global/Box/styles/box'
import { isMobile } from 'react-device-detect'
import { MONEY_BILL_ICON } from '../../../../styles/abstract/variables'
import { BigPGreyBold } from '../../../../styles/typography/typography'
import { saveTournamentWizzardStep } from './WizzardActions'
import { WizzardContext } from './WizzardContext'
import { SecondaryButton } from '../../../../styles/shared/button'
import FeeForm from '../../view/details/FeeForm'
import { WizzardHeader } from '../../../../styles/shared/headerWizzard'

export default ({ history, match }) => {
  const wizzardContext = useContext(WizzardContext)
  const tournamentType = match.url.split('/')[1]
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'fee', data: values, wizzardContext, tournamentType })
    history.push(`/${tournamentType}/create/table`)
  }
  const { fee, steps } = wizzardContext.state[tournamentType]
  return (
    <PageContent type={isMobile ? undefined : 'web'}>

      <BoxWrapper web={!isMobile} large={!isMobile}>
        {/* <BoxHeader>
          <HeaderWithIcon flex>
            <i className={MONEY_BILL_ICON} />
            <BigPGreyBold>Fee</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeader> */}
        <WizzardHeader currentStep={steps.fee} steps={steps.total} icon={MONEY_BILL_ICON} title='Registration' />

        <FeeForm
          initialValues={fee}
          onSubmit={onSubmit} renderActions={({ invalid, pristine }) => (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
              <SecondaryButton type='submit' full filled>Continue</SecondaryButton>
              <div style={{ height: 0, width: 30 }} />
              <SecondaryButton full onClick={() => history.push(`/${tournamentType}/create/blinds`)}>Previous step</SecondaryButton>
            </div>
          )}
        />
      </BoxWrapper>

    </PageContent>
  )
}
