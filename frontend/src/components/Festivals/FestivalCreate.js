import React from 'react'
import FestivalForm from './FestivalForm'
import { festivalValidation } from './FestivalValidation'
export default ({ onSubmit: customOnSubmit, initialValues, renderActions }) => {
  const onSubmit = () => {

  }
  return (
    <FestivalForm renderActions={renderActions} onSubmit={customOnSubmit || onSubmit} initialValues={initialValues} validation={festivalValidation} />
  )
}
