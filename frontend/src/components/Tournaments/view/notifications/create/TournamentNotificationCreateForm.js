import React from 'react'
import { createValidation } from '../TournamentNotificationValidation'
import { BoxContent, BoxHeader, BoxWrapper, HeaderWithIcon } from '../../../../Global/Box/styles/box'
import { BigPGreyBold, Label } from '../../../../../styles/typography/typography'
import { FormItem } from '../../../../../styles/shared/form'
import { Field, Form } from 'react-final-form'
import { FieldInput } from '../../../../Global/Input/FieldInput'
import CustomField from '../../../../Global/Input/CustomField'
import { FieldSelect } from '../../../../Global/Select/FieldSelect'
import { NOTIFICATION_TYPES } from './TournamentNotificationCreate'
import _ from 'lodash'
import { SecondaryButton } from '../../../../../styles/shared/button'
import { FILE_ICON } from '../../../../../styles/abstract/variables'

export default function NotificationCreateForm({ onSubmit, type }) {
  return (
    <Form
      onSubmit={onSubmit}
      validate={(props) => createValidation(props)}
      render={({ handleSubmit }) => (
        <form flex={type === 'web'} onSubmit={handleSubmit}>
          <BoxWrapper web={type === 'web'} large={type === 'web'}>
            <BoxHeader>
              <HeaderWithIcon flex>
                <i className={FILE_ICON}/>
                <BigPGreyBold>Notification details</BigPGreyBold>
              </HeaderWithIcon>
            </BoxHeader>
            <BoxContent>
              <FormItem>
                <Label>Title</Label>
                <CustomField
                  component={FieldInput}
                  name='title'
                />
              </FormItem>
              <FormItem>
                <Label>Message</Label>
                <CustomField
                  component={FieldInput}
                  name='message'
                />
              </FormItem>
              <FormItem>
                <Label>Target users</Label>
                <Field
                  component={FieldSelect}
                  placeholder='Select target users'
                  options={NOTIFICATION_TYPES.map(type => ({ value: type, label: _.startCase(type) }))}
                  name='type'
                />
              </FormItem>
              <FormItem>
                <SecondaryButton filled type={'submit'}>Create</SecondaryButton>
              </FormItem>
            </BoxContent>
          </BoxWrapper>
        </form>
      )}
    />
  )
}