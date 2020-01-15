import React, { useState } from 'react'
import { DualFormWrapper, FormItem, StyledToggle } from '../../../../styles/shared/form'
import { BigP, Label, PasswordChangeWrapper } from '../../../../styles/typography/typography'
import { Field, Form } from 'react-final-form'
import { FieldInput } from '../../../Global/Input/FieldInput'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import { colorBlack12, colorPrimary } from '../../../../styles/abstract/variables'
import { STAFF_ROLES } from '../../../Courses/create/CourseCreate'
import _ from 'lodash'
import { emailRegex } from '../../../../config/constants'

const staffValidation = ({ email, role }) => {
  const errors = {}
  if (!email) {
    errors.email = 'Insert email'
  } else {
    if (!emailRegex.test(email)) {
      errors.email = 'Incorrect email'
    }
  }
  if (!role) {
    errors.role = 'Select role'
  }
  return errors
}
export default function StaffAccountEdit({ onSubmit, onClose, staff }) {
  const [toggleChecked, setToggleChecked] = useState(false)
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={
        {
          email: staff.email,
          role: { value: staff.role, label: _.startCase(staff.role) }
        }
      }
      validate={staffValidation}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
          <div style={{ paddingBottom: 25 }}>

            <FormItem>
              <Label>Email</Label>
              <Field component={FieldInput} name='email' placeholder={'Change email'}/>
            </FormItem>
            <FormItem>
              <Label upper>Role</Label>
              <Field component={FieldSelect}
                     options={STAFF_ROLES.map(role => ({ value: role, label: _.startCase(role) }))}
                     name='role' placeholder={'Pick a role'}/>
            </FormItem>
            <FormItem>
              <DualFormWrapper space>
                <BigP>Change Password</BigP>
                <StyledToggle>
                 
                </StyledToggle>
              </DualFormWrapper>
              <PasswordChangeWrapper expand={toggleChecked}>
                <FormItem>
                  <Label upper>Current Password</Label>
                  <Field component={FieldInput} name='currentPassword' placeholder={'Current Password'}/>
                </FormItem>
                <FormItem>
                  <Label upper>New Password</Label>
                  <Field component={FieldInput} name='newPassword' placeholder={'New Password'}/>
                </FormItem>
                <FormItem>
                  <Label upper>Repeat New Password</Label>
                  <Field component={FieldInput} name='repeatNewPassword' placeholder={'Repeat New Password'}/>
                </FormItem>
              </PasswordChangeWrapper>
            </FormItem>


            <PanelFooter>
              <PanelClear>
                <SecondaryButton type={'button'} rightMargin onClick={onClose}>
                  Close
                </SecondaryButton>
                <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                  Apply
                </SecondaryButton>
              </PanelClear>
            </PanelFooter>
          </div>
        </form>
      )}/>
  )
}