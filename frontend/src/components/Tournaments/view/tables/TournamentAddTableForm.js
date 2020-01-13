import React, { useContext } from 'react'
import { FormItem } from '../../../../styles/shared/form'
import { Label, SmallP } from '../../../../styles/typography/typography'
import {
  PanelClear,
  PanelFooter
} from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { Field, Form } from 'react-final-form'
import { AuthContext } from '../../../Auth/AuthContext'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { NumberInput } from '../../../Global/Input/NumberInput'
import { addCustomTable } from '../ActiveTournamentActions'

const tableValidation = ({ tableNumber }) => {
  const errors = {}
  if (!tableNumber) {
    errors.tableNumber = 'Insert tableNumber'
  } else {
    if (!Number(tableNumber)) {
      errors.tableNumber = 'Invalid number'
    } else {
      if (Number(tableNumber) < 0) {
        errors.tableNumber = 'Invalid number'
      }
    }
  }
  return errors
}

export default function TournamentAddTableForm ({
  tournament,
  onClose,
  renderActions,
  onSubmit: customOnSubmit,
  initialValues
}) {
  const authContext = useContext(AuthContext)
  const tournamentId = tournament && tournament.id
  const onSubmit = values => {
    const data = {
      table: {
        number: values.tableNumber
      }
    }
    addCustomTable({
      authContext,
      tournamentId,
      data,
      successFunction: onClose
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={tableValidation}
      render={({ handleSubmit, pristine, invalid }) => (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexFlow: 'column' }}
        >
          <FormItem>
            <Label upper>Number of the table</Label>
            <Field
              component={NumberInput}
              name='tableNumber'
              placeholder='Ex: 3'
            />
          </FormItem>
          <PanelFooter>
            <PanelClear>
              <SecondaryButton rightMargin onClick={onClose}>
                Close
              </SecondaryButton>
              <SecondaryButton
                filled
                onClick={handleSubmit}
                disabled={pristine || invalid}
              >
                Apply
              </SecondaryButton>
            </PanelClear>
          </PanelFooter>
        </form>
      )}
    />
  )
}
