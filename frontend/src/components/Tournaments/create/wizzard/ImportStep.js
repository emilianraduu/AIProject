import React, { useContext } from 'react'
import ImportDetailsForm from '../../view/details/ImportDetailsForm'
import { WizzardHeader } from '../../../../styles/shared/headerWizzard'
import { BoxWrapper } from '../../../Global/Box/styles/box'
import { isMobile } from 'react-device-detect'
import { PageContent } from '../../../../styles/shared/wrapper'
import { WizzardContext } from './WizzardContext'
import { saveTournamentWizzardStep } from './WizzardActions'
import { SecondaryButton } from '../../../../styles/shared/button'
import { IMPORT_ICON } from '../../../../styles/abstract/variables'
import { importTournamentDetails } from '../../view/ActiveTournamentActions'
import { AuthContext } from '../../../Auth/AuthContext'

export default ({ history, match }) => {
  const wizzardContext = useContext(WizzardContext)
  const authContext = useContext(AuthContext)
  const tournamentType = match.url.split('/')[1]
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'importDetails', data: values, wizzardContext, tournamentType })
    importTournamentDetails({
      authContext,
      tournamentsContext: wizzardContext,
      data: values,
      tournamentType,
      successFunction: () => {
        history.push(`/${tournamentType}/create/festival`)
      }
    })
  }
  const { importDetails, steps } = wizzardContext.state[tournamentType]
  return (
    <PageContent type={isMobile ? undefined : 'web'}>

      <BoxWrapper web={!isMobile} large={!isMobile}>
        <WizzardHeader currentStep={steps.importDetails} steps={steps.total} icon={IMPORT_ICON} title='Import data' />
        <ImportDetailsForm
          type={tournamentType === 'tournaments' ? 'tournament' : 'cashGame'}
          initialValues={importDetails} onSubmit={onSubmit}
          renderActions={({ invalid, pristine }) => (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
              <SecondaryButton type='submit' full filled>Import</SecondaryButton>
              <div style={{ height: 0, width: 30 }} />
              <SecondaryButton onClick={() => history.push(`/${tournamentType}/create/festival`)} full filled>Skip</SecondaryButton>
              <div style={{ height: 0, width: 30 }} />
              <SecondaryButton full onClick={() => history.push(`/${tournamentType}/create`)}>Previous step</SecondaryButton>
            </div>
          )}
        />

      </BoxWrapper>

    </PageContent>
  )
}
