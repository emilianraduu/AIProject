import React, { useContext } from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BoxWrapper, BoxHeader, HeaderWithIcon } from '../../../Global/Box/styles/box'
import { isMobile } from 'react-device-detect'
import { DIAMOND_ICON } from '../../../../styles/abstract/variables'
import { BigPGreyBold } from '../../../../styles/typography/typography'
import BlindsForm from '../../view/details/BlindsForm'
import { saveTournamentWizzardStep } from './WizzardActions'
import { WizzardContext } from './WizzardContext'
import { SecondaryButton, PrimaryButton } from '../../../../styles/shared/button'
import { WizzardHeader } from '../../../../styles/shared/headerWizzard'

export default ({ history, match }) => {
  const wizzardContext = useContext(WizzardContext)
  const tournamentType = match.url.split('/')[1]
  const { blinds, steps } = wizzardContext.state[tournamentType]
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'blinds', data: values, wizzardContext, tournamentType })
    history.push(`/${tournamentType}/create/fee`)
  }
  return (
    <PageContent type={isMobile ? undefined : 'web'}>

      <BoxWrapper web={!isMobile} large={!isMobile}>
        {/* <BoxHeader>
          <HeaderWithIcon flex>
            <i className={DIAMOND_ICON} />
            <BigPGreyBold>Blinds</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeader> */}
        <WizzardHeader currentStep={steps.blinds} steps={steps.total} icon={DIAMOND_ICON} title='Blinds' />

        <BlindsForm
          initialValues={blinds}
          onSubmit={onSubmit} renderActions={({ invalid, pristine }) =>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
              <SecondaryButton type='submit' full filled>Continue</SecondaryButton>
              <div style={{ height: 0, width: 30 }} />

              <SecondaryButton full onClick={() => history.push(`/${tournamentType}/create/festival`)}>Previous step</SecondaryButton>
            </div>}
        />
      </BoxWrapper>

    </PageContent>
  )
}
