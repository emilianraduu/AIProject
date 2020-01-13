import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import TournamentCreateForm from './TorunamentCreateForm'
import { BoxWrapper } from '../../Global/Box/styles/box'
import { FILE_ICON } from '../../../styles/abstract/variables'
import { WizzardHeader } from '../../../styles/shared/headerWizzard'

export default function TournamentCreateWeb ({ onSubmit, festivals, type, initialValues, renderActions, steps, match }) {
  return (
    <PageContent type='web'>
      <BoxWrapper web large>
        <WizzardHeader currentStep={steps.details} steps={steps.total} title='Details' icon={FILE_ICON} />
        <TournamentCreateForm
          onSubmit={onSubmit}
          festivals={festivals}
          match={match}
          initialValues={initialValues}
          renderActions={renderActions}
        />
      </BoxWrapper>
    </PageContent>
  )
}
