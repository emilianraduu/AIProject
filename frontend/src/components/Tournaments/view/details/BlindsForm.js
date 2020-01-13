import React, { useContext, useState } from 'react'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import {
  blindsCashValidation,
  blindsValidation
} from './TournamentDetailsValidations'
import { BoxContent } from '../../../Global/Box/styles/box'
import { DualFormWrapper, FormItem } from '../../../../styles/shared/form'
import { Label } from '../../../../styles/typography/typography'
import {
  PanelFooter,
  PanelClear
} from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { Separator } from '../../../Global/Separators/styles'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import { FieldArray } from 'react-final-form-arrays'
import { UnderLineInputWithIcon } from '../../../Global/Input/UnderlineInputWithIcon'
import { CloseIcon } from '../../../Global/Icons/CloseIcon'
import {
  UnderlineInputSeparator,
  UnderlineInput
} from '../../../Global/Input/styles'
import {
  colorBlack80,
  colorFail,
  colorBlack02,
  colorPrimary
} from '../../../../styles/abstract/variables'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { AuthContext } from '../../../Auth/AuthContext'
import { updateBlinds } from '../ActiveTournamentActions'
import { sortByKey } from '../../../../helpers/sortHelpers'
import { withRouter } from 'react-router-dom'

function BlindsForm ({
  onClose,
  match,
  onSubmit: customOnSubmit,
  renderActions,
  initialValues
}) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const [pauseTime, setPauseTime] = useState(0)
  const authContext = useContext(AuthContext)
  const {
    activeTournament: { blindMinutesPerLevel, blinds }
  } = tournamentsContext.state
  const onSubmit = values => {
    if (customOnSubmit) {
      customOnSubmit({ ...values })
    } else {
      updateBlinds({
        successFunction: onClose,
        data: {
          ...values,
          blindMinutesPerLevel: values.blindMinutesPerLevel.value
        },
        authContext,
        tournamentsContext
      })
    }
  }
  let initialBlinds = [
    { smallBlind: 0, bigBlind: 0, ante: 0, pauseMinutes: pauseTime || 0, order: 0 }
  ]
  if (blinds && blinds.length === 0) {
    initialBlinds = [
      { smallBlind: 0, bigBlind: 0, ante: 0, pauseMinutes: pauseTime || 0, order: 0 }
    ]
  } else {
    if (blinds) {
      initialBlinds = blinds.sort((a, b) => sortByKey(a, b, 'order'))
    }
  }
  return (
    <Form
      onSubmit={onSubmit}
      // validate={
      //   match.path.includes('tournaments')
      //     ? blindsValidation
      //     : blindsCashValidation
      // }
      initialValues={
        initialValues || {
          blindMinutesPerLevel,
          blinds: initialBlinds
      }
      }
      mutators={arrayMutators}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <BoxContent>
            <div style={{ display: 'flex' }}>
              {!match.path.includes('cashgames') && (
                <DualFormWrapper>
                  <FormItem>
                    <Label> Pause after level</Label>
                    <FieldSelect
                      options={[...Array(200).keys()].map(item => ({
                        value: item + 1,
                        label: item + 1 + ' min'
                      }))}
                      name='pausePerLevel'
                      meta={{ error: '', touched: true }}
                      input={{
                        value: pauseTime,
                        onChange: (e) => {
                          setPauseTime(e.value)
                        }
                      }}
                    />
                  </FormItem>
                  <FormItem>
                    <Label> Time per level</Label>
                    <Field
                      component={FieldSelect}
                      name='blindMinutesPerLevel'
                      options={[...Array(50).keys()].map(item => ({
                        value: item + 1,
                        label: item + 1 + ' min'
                      }))}
                    />
                  </FormItem>
                </DualFormWrapper>
              )}
            </div>
          </BoxContent>
          {!match.path.includes('cashgames') && <Separator />}
          <BoxContent>
            <FieldArray name='blinds'>
              {({ fields }) => (
                <div>
                  <FormItem row center>
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Level
                    </Label>
                    <Label
                      style={{
                        width: 40,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Late entry
                    </Label>
                    <Label
                      style={{
                        width: 40,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Pause after
                    </Label>

                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Ante
                    </Label>
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      SB
                    </Label>
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      BB
                    </Label>
                    <Label style={{ width: 40 }} />
                  </FormItem>

                  {fields.map((name, index) => (
                    <div key={index}>
                      <BlindInput
                        name={name}
                        onRemove={() => fields.remove(index)}
                        index={index}
                      />
                    </div>
                  ))}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginRight: 10,
                      marginTop: 20,
                      marginBottom: 40
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: 20 }}>
                        {!match.path.includes('cashgames') && (
                          <SecondaryButton
                            mobile
                            onClick={e => {
                              e.preventDefault()
                              fields.push({
                                smallBlind: 0,
                                bigBlind: 0,
                                ante: 0,
                                order: fields.length + 1,
                                pauseMinutes: pauseTime || 0
                              })
                            }}
                          >
                            + New level
                          </SecondaryButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </FieldArray>
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
                  disabled={invalid}
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

const Checkbox = ({ input }) => (
  <input {...input} style={{ width: 20, height: 20 }} />
)
const BlindInput = ({ name, onRemove, index }) => {
  return (
    <div>
      <FormItem key={name} row center>
        <UnderlineInputSeparator>{index + 1}</UnderlineInputSeparator>
        <div
          style={{
            marginLeft: 10,
            marginRight: 10,
            width: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Field
            component={Checkbox}
            name={`${name}.canRebuy`}
            type='checkbox'
          />
        </div>
        <div
          style={{
            marginLeft: 10,
            marginRight: 10,
            flex: 1,
            display: 'flex',
            position: 'relative'
          }}
        >
          <Field
            component={UnderLineInputWithIcon}
            name={`${name}.pauseMinutes`}
          />
          <div style={{ position: 'absolute', top: 10, right: 0 }}>m</div>
        </div>

        <div style={{ marginLeft: 10, marginRight: 10, flex: 1 }}>
          <Field component={UnderLineInputWithIcon} name={`${name}.ante`} />
        </div>
        <div style={{ marginLeft: 10, marginRight: 10, flex: 1 }}>
          <Field
            component={UnderLineInputWithIcon}
            name={`${name}.smallBlind`}
          />
        </div>
        <div style={{ marginLeft: 10, marginRight: 10, flex: 1 }}>
          <Field component={UnderLineInputWithIcon} name={`${name}.bigBlind`} />
        </div>
        <div
          style={{
            width: 40,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            index !== 0 && onRemove()
          }}
        >
          <CloseIcon disabled={index === 0} />
        </div>
      </FormItem>
    </div>
  )
}

export default withRouter(BlindsForm)
