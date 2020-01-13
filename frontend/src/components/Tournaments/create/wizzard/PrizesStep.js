import React, { useContext } from 'react'
import PrizesForm from '../../view/details/PrizesForm'
import { saveTournamentWizzardStep } from './WizzardActions'
import { WizzardContext } from './WizzardContext'
import { SecondaryButton } from '../../../../styles/shared/button'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BoxWrapper } from '../../../Global/Box/styles/box'
import { isMobile } from 'react-device-detect'
import { GOLD_ICON } from '../../../../styles/abstract/variables'
import { WizzardHeader } from '../../../../styles/shared/headerWizzard'

export default ({ history, match }) => {
  const wizzardContext = useContext(WizzardContext)
  const tournamentType = match.url.split('/')[1]
  const { prize, steps } = wizzardContext.state[tournamentType]
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'prize', data: values, wizzardContext, tournamentType })
    history.push(`/${tournamentType}/create/blinds`)
  }
  return (
    <PageContent type={isMobile ? undefined : 'web'}>

      <BoxWrapper web={!isMobile} large={!isMobile}>
        {/* <BoxHeader>
          <HeaderWithIcon flex>
            <i className={GOLD_ICON} />
            <BigPGreyBold>Prizes</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeader> */}
        <WizzardHeader currentStep={steps.prizes} steps={steps.total} icon={GOLD_ICON} title='Prizes' />

        <PrizesForm
          initialValues={prize}
          onSubmit={onSubmit} renderActions={({ invalid, pristine }) => (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
              <SecondaryButton type='submit' full filled>Continue</SecondaryButton>
              <div style={{ height: 0, width: 30 }} />
              <SecondaryButton full onClick={() => history.push(`/${tournamentType}/create/festival`)}>Previous step</SecondaryButton>
            </div>)}
        />
      </BoxWrapper>

    </PageContent>
  )
}
