import React, { useContext } from 'react'
import { FormItem } from '../../../../styles/shared/form'
import { Label, SmallP } from '../../../../styles/typography/typography'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { Field, Form } from 'react-final-form'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import { updateTournamentTableProps } from '../ActiveTournamentActions'
import { AuthContext } from '../../../Auth/AuthContext'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { NumberInput } from '../../../Global/Input/NumberInput'

const tableValidation = ({ numberOfTables,  availableSeats }) => {
  const errors = {}
  if (!numberOfTables) {
    errors.numberOfTables = 'Insert number of tables'
  } else {
    if (!Number(numberOfTables)) {
      errors.numberOfTables = 'Invalid number'
    } else {
      if (Number(numberOfTables) < 0) {
        errors.numberOfTables = 'Invalid number'
      }
    }
  }
  return errors
}

export default function TournamentTablesProprietiesForm ({ tournament, onClose, renderActions, onSubmit: customOnSubmit, initialValues }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  let tournamentId = ''
  if (tournament) {
    tournamentId = tournament.id
  }

  const getAvailableSeats = () => {
    const availableSeats = []
    for (let i = 2; i <= 10; i++) { availableSeats.push({ value: i, label: i }) }
    return availableSeats
  }

  const onSubmit = (values) => {
    if (customOnSubmit) {
      customOnSubmit(values)
    } else {
      if (values.availableSeats) { values.availableSeats = values.availableSeats.value }
      updateTournamentTableProps({
        authContext,
        tournamentsContext,
        data: values,
        tournamentId,
        successFunction: onClose
      })
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={
        customOnSubmit ? initialValues : ({
          numberOfTables: tournament.numberOfTables,
          availableSeats: tournament.availableSeats
        })
      }
      validate={tableValidation}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
          <FormItem>
            <Label upper>Number of tables</Label>
            <Field
              component={NumberInput}
              name='numberOfTables'
              // placeholder={tournament.numberOfTables}
            />
          </FormItem>
          <FormItem>
            <Label upper>Available seats per table</Label>
            <Field
              component={FieldSelect}
              options={getAvailableSeats()}
              name='availableSeats'
              // placeholder={tournament.availableSeats}
            />
          </FormItem>
          <SmallP>Once the game is live, you will not be able to edit this settings.</SmallP>
          {renderActions ? renderActions({ invalid, pristine }) : (
            <PanelFooter>
              <PanelClear>
                <SecondaryButton rightMargin onClick={onClose}>
                Close
                </SecondaryButton>
                <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                Apply
                </SecondaryButton>
              </PanelClear>
            </PanelFooter>)}
        </form>
      )}
    />
  )
}
