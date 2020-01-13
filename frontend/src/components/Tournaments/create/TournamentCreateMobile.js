import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import TournamentCreateForm from './TorunamentCreateForm'
import { BoxWrapper } from '../../Global/Box/styles/box'
import { FILE_ICON } from '../../../styles/abstract/variables'
import { WizzardHeader } from '../../../styles/shared/headerWizzard'

export default function TournamentCreateMobile ({ onSubmit, festivals, type, initialValues, renderActions, steps, match }) {
  return (
    <PageContent>
      <BoxWrapper web={false} large={false}>

        <WizzardHeader currentStep={steps.details} steps={steps.total} title='Details' icon={FILE_ICON} />
        <TournamentCreateForm
          match={match}
          onSubmit={onSubmit}
          festivals={festivals}
          initialValues={initialValues}
          mobile
          renderActions={renderActions}
        />
      </BoxWrapper>
    </PageContent>
  )
}
