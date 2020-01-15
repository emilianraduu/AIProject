import { PageContent } from '../../../styles/shared/wrapper'
import React from 'react'
import CourseCrateForm from './RoomsCrateForm'

export default function CourseCreateWeb({ onSubmit, users }) {
  return (

    <PageContent type={'web'} flex>
      <CourseCrateForm
        onSubmit={onSubmit}
        teachers={users}
        type={'web'}/>
    </PageContent>
  )
}
