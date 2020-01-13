import React from 'react'
import { Form, Field } from 'react-final-form'
import { FormItem } from '../../styles/shared/form'
import { Label } from '../../styles/typography/typography'
import { FieldInput } from '../Global/Input/FieldInput'
import { FieldDateAndTimePicker } from '../Global/DatePickers/FieldDateAndTimePicker'
import { SecondaryButton } from '../../styles/shared/button'
import { festivalValidation } from './FestivalValidation'

export default function FestivalForm ({ initialValues, onSubmit, validation, renderActions, pristine }) {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validation || festivalValidation}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          <FormItem>
            <Label>Festival Name</Label>
            <Field component={FieldInput} name='name' placeholder='Type a name' />
          </FormItem>
          <FormItem>
            <Label>Festival starting date</Label>
            <Field component={FieldDateAndTimePicker} name='startDate' placeholder='Select start date' min={new Date()} />
          </FormItem>
          <FormItem>
            <Label>Festival ending date</Label>
            <Field component={FieldDateAndTimePicker} name='endDate' placeholder='Select end date' min={values.startDate} />
          </FormItem>
          <div style={{ height: 30, width: 30 }} />
          {renderActions ? renderActions({ invalid, pristine }) : <SecondaryButton filled full type='submit'>Create</SecondaryButton>}
        </form>)}
    />
  )
}
