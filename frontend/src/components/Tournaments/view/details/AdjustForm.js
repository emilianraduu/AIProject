import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import { updateAdjusted, updateFee } from '../ActiveTournamentActions'
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

function AdjustForm({
                      onClose,
                      match,
                      renderActions,
                      onSubmit: customOnSubmit,
                      initialValues
                    }) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const authContext = useContext(AuthContext)
  const {
    activeTournament: {
      offsetNumberOfChips,
      offsetNumberOfActivePlayers,
      offsetTotalNumberOfPlayers,
      offsetPrizePool
    }
  } = tournamentsContext.state

  const onSubmit = values => {
    if (customOnSubmit) {
      customOnSubmit(values)
    } else {
      updateAdjusted({
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
        offsetNumberOfChips,
        offsetNumberOfActivePlayers,
        offsetTotalNumberOfPlayers,
        offsetPrizePool
      }}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <BoxContent>
            <FormItem>
              <Label>Extra number of chips</Label>
              <Field
                component={NumberInput}
                name='offsetNumberOfChips'
                placeholder='Ex: 2000'
                min={-1000000}
              />
            </FormItem>
            <FormItem>
              <Label>Extra active players</Label>
              <Field
                component={NumberInput}
                name='offsetNumberOfActivePlayers'
                placeholder='Ex: 2000'
                min={-1000000}
              />
            </FormItem>
            <FormItem>
              <Label>Extra total number of players</Label>
              <Field
                component={NumberInput}
                name='offsetTotalNumberOfPlayers'
                placeholder='Ex: 2000'
                min={-1000000}
              />
            </FormItem>
            <FormItem>
              <Label>Extra prize pool</Label>
              <Field
                component={NumberInput}
                name='offsetPrizePool'
                placeholder='Ex: 2000'
                min={-1000000}
              />
            </FormItem>
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

export default withRouter(AdjustForm)
