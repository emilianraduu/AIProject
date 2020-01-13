import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import { updateFee } from '../ActiveTournamentActions'
import { FormItem } from '../../../../styles/shared/form'
import { BoxContent } from '../../../Global/Box/styles/box'
import { Label } from '../../../../styles/typography/typography'
import { SecondaryButton } from '../../../../styles/shared/button'
import {
  PanelFooter,
  PanelClear
} from '../../../Global/Filter/styles/filterMob'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { AuthContext } from '../../../Auth/AuthContext'
import { NumberInput } from '../../../Global/Input/NumberInput'
import { withRouter } from 'react-router-dom'
import {
  feeCashValidation,
  feeTournamentValidation
} from './TournamentDetailsValidations'

export const cashgamesPath = '/cashgames/:tournamentId'

function FeeForm ({
  onClose,
  match,
  renderActions,
  onSubmit: customOnSubmit,
  initialValues
}) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const authContext = useContext(AuthContext)
  const { activeTournament: { buyIn, numberOfChips, rakeFixed, rakePercent, reentryChips, numberOfReentries } } = tournamentsContext.state

  const onSubmit = values => {
    if (customOnSubmit) {
      customOnSubmit(values)
    } else {
      updateFee({
        data: values,
        authContext,
        tournamentsContext,
        successFunction: onClose
      })
    }
  }
  return (
    <Form
      onSubmit={onSubmit}
      // validate={match.url.includes('cashgames') ? feeCashValidation : feeTournamentValidation}
      initialValues={initialValues || {
        buyIn: buyIn,
        numberOfChips: numberOfChips,
        rakeFixed,
        rakePercent,
        reentryChips,
        numberOfReentries
      }}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <BoxContent>
            <FormItem>
              <Label>
                {!match.path.includes('cashgames')
                  ? 'Buy in'
                  : 'Minimum Buy in'}
              </Label>
              <Field
                component={NumberInput}
                name='buyIn'
                placeholder='Ex: 500'
                simbol='EUR'
              />
            </FormItem>
            {!match.path.includes('cashgames') && (
              <>
                <FormItem>
                  <Label>Fixed Rake</Label>
                  <Field
                    component={NumberInput}
                    name='rakeFixed'
                    placeholder='Ex: 50'
                    simbol='EUR'
                  />
                </FormItem>
                <FormItem>
                  <Label>Percent Rake</Label>
                  <Field
                    component={NumberInput}
                    name='rakePercent'
                    placeholder='Ex: 2%'
                    simbol='%'
                  />
                </FormItem>
                <FormItem>
                  <Label>Entry chips</Label>
                  <Field
                    component={NumberInput}
                    name='numberOfChips'
                    placeholder='Ex: 2000'
                  />
                </FormItem>
                <FormItem>
                  <Label>Number of re-entries</Label>
                  <Field
                    component={NumberInput}
                    name='numberOfReentries'
                    placeholder='Ex: 3 re-entry'
                  />
                </FormItem>
                <FormItem>
                  <Label>Re-entry chips</Label>
                  <Field
                    component={NumberInput}
                    name='reentryChips'
                    placeholder='Ex: 2000'
                  />
                </FormItem>

                {/* <FormItem>
                    <Label> Maximum number of players</Label>
                    <Field component={NumberInput} name='maxPlayers' placeholder='Maximum number of players' />
                  </FormItem> */}
              </>
            )}
          </BoxContent>
          {renderActions ? (
            renderActions({ pristine, invalid })
          ) : (
            <PanelFooter>
              <PanelClear>
                <SecondaryButton type='button' rightMargin onClick={onClose}>
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
          )}
        </form>
      )}
    />
  )
}

export default withRouter(FeeForm)
