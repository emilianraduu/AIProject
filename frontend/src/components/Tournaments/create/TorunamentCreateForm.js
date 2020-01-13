import React from 'react'
import { createValidation, editValidation, cashGameValidation } from './TournamentValidation'
import { BoxContent } from '../../Global/Box/styles/box'
import { Label } from '../../../styles/typography/typography'
import { FormItem } from '../../../styles/shared/form'
import { Field, Form } from 'react-final-form'
import { FieldInput, FieldTextarea } from '../../Global/Input/FieldInput'
import { FieldDateAndTimePicker } from '../../Global/DatePickers/FieldDateAndTimePicker'
import { SecondaryButton } from '../../../styles/shared/button'
import { Tag, TagWrapper } from '../../../styles/shared/tag'
import { isMobile } from 'react-device-detect'

export const tournamentStatus = [
  { value: 'hidden', label: 'hidden' },
  { value: 'register', label: 'register' },
  { value: 'live', label: 'live' },
  { value: 'closed', label: 'closed' }
]

export const statusOptions = ({ initialStatus }) => {
  let increment = 0
  const options = []
  for (increment; increment < tournamentStatus.length; increment++) {
    if (tournamentStatus[increment].value === initialStatus) {
      break
    }
  }
  for (increment; increment < tournamentStatus.length; increment++) {
    options.push(tournamentStatus[increment])
  }
  return options
}

export default function TournamentCreateForm ({ match, renderActions, festivals, onSubmit, mobile, initialValues, edit, initialStatus }) {
  const customStatusOption = ({ value, label }) => (
    <TagWrapper noShadow><Tag space desktop status={value}>{label}</Tag></TagWrapper>
  )
  return (
    <Form
      onSubmit={onSubmit}
              initialValues={initialValues}
              validate={createValidation}
              render={({ handleSubmit, pristine, invalid, values, form }) => (
                <form onSubmit={handleSubmit}>
          <BoxContent>
            <FormItem>
              <Label>Name</Label>
              <Field component={FieldInput} name='name' placeholder='Type a name' />
            </FormItem>
            <FormItem>
              <Label>Description</Label>
              <Field component={FieldInput} name='description' placeholder='Type a description' />
            </FormItem>
            {/* <FormItem>
              <Label>Festival</Label>
              <Field
                component={CreateableFieldSelect}
                placeholder='Select festival'
                options={festivals.map(festival => ({ value: festival.id, label: festival.name }))}
                name='festival'
              />
            </FormItem> */}
            <FormItem>
              <Label>Starting time</Label>
              <Field
                component={FieldDateAndTimePicker} name='dateTime' mobile={mobile}
                minDate={new Date()}
                placeholder='Tournament start'
              />
            </FormItem>

            <FormItem>
              <Label>Receipt Description</Label>
              <Field
                component={FieldTextarea} name='receiptDescription' mobile={mobile}
                placeholder='Receipt Description'
              />
            </FormItem>
            {/* {!edit && (
              <>
                <FormItem>
                  <Label>Registration starting time</Label>
                  <Field
                    component={FieldDateAndTimePicker} name='registerStart' mobile={mobile}
                    max={(values && values.dateTime) || new Date()}
                    min={new Date()}
                    placeholder='Registration start'
                  />
                </FormItem>

                <FormItem>
                  <Label>Registration end time</Label>
                  <Field
                    component={FieldDateAndTimePicker} name='registerEnd' mobile={mobile}
                    min={(values && values.registrationStartDateTime) || new Date()}
                    placeholder='Registration end'
                  />
                </FormItem>
              </>)} */}
            {/* { */}
            {/*  edit && */}
            {/*  <FormItem> */}
            {/*    <Label>Status</Label> */}
            {/*    <Field component={FieldSelect} */}
            {/*           options={statusOptions({ initialStatus })} */}
            {/*           placeholder={'Select status'} */}
            {/*           name={'status'} */}
            {/*           formatOptionLabel={customStatusOption} */}
            {/*    /> */}
            {/*  </FormItem> */}
            {/* } */}
            <div style={{ height: 30, width: 30 }} />
            <FormItem style={!isMobile ? { display: 'flex', alignItems: 'center' } : {}}>
              {renderActions ? renderActions({ pristine, invalid, handleSubmit, reset: form.reset })
                : <SecondaryButton style={{ width: isMobile ? '100%' : '50%' }} filled type='submit'>Next</SecondaryButton>}
            </FormItem>
          </BoxContent>
        </form>
      )}
    />
  )
}
