import React, { useContext } from 'react'
import { Form, Field, useFormState } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { prizesValidation } from './TournamentDetailsValidations'
import { updatePrizes } from '../ActiveTournamentActions'
import { FormItem } from '../../../../styles/shared/form'
import { CloseIcon } from '../../../Global/Icons/CloseIcon'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { AuthContext } from '../../../Auth/AuthContext'
import { SecondaryButton } from '../../../../styles/shared/button'
import {
  PanelFooter,
  PanelClear
} from '../../../Global/Filter/styles/filterMob'
import { sortByKey } from '../../../../helpers/sortHelpers'
import { UnderLineInputWithIcon } from '../../../Global/Input/UnderlineInputWithIcon'
import {
  UnderlineInputSeparator,
  UnderlineInput
} from '../../../Global/Input/styles'
import _ from 'lodash'
import { Label } from '../../../../styles/typography/typography'
import {
  colorBlack02,
  colorBlack80,
  colorPrimary
} from '../../../../styles/abstract/variables'
import { Separator } from '../../../Global/Separators/styles'
import { FieldCheckbox } from '../../../Global/Checkboxes/FieldCheckbox'
const addPointsToNumber = number => {
  const referenceNumber = number + ''
  let numberLength = referenceNumber.length
  let newNumber = ''
  while (numberLength > 3) {
    newNumber = '.' + referenceNumber.substr(numberLength - 3, 3) + newNumber
    numberLength -= 3
  }
  if (numberLength > 0) {
    newNumber = referenceNumber.substr(0, numberLength) + newNumber
  }
  return newNumber
}
export default function PrizesForm (props) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament } = tournamentsContext.state
  const authContext = useContext(AuthContext)

  const { onClose } = props
  const onSubmit = ({ prizes, isGuaranteedPrizePool, fixedPrizePool }) => {
    if (props.onSubmit) {
      props.onSubmit({
        prizes
      })
    } else {
      updatePrizes({
        tournamentsContext,
        authContext,
        data: {
          prizes,
          isGuaranteedPrizePool,
          fixedPrizePool
        },
        successFunction: onClose
      })
    }
  }
  let initialPrizes = [
    {
      amount: 1,
      name: '1',
      value: 0,
      order: 1,
      percentage: 0,
      hasDescription: false,
      description: ''
    }
  ]
  if (
    activeTournament &&
    activeTournament.prizes &&
    activeTournament.prizes.length === 0
  ) {
    initialPrizes = [
      {
        amount: 1,
        name: '1',
        value: 0,
        order: 1,
        percentage: 0,
        hasDescription: false,
        description: ''
      }
    ]
  } else {
    if (activeTournament && activeTournament.prizes) {
      initialPrizes = activeTournament.prizes.sort((a, b) =>
        sortByKey(a, b, 'order')
      )
    }
  }

  const getLastPosition = ({ prizes }) => {
    if (Number(_.last(prizes).name)) {
      return Number(_.last(prizes).name) + 1
    } else {
      if (_.split(_.last(prizes).name, '-')) {
        return Number(_.split(_.last(prizes).name, '-')[1]) + 1
      }
    }
  }
  const { renderActions } = props
  const prizePool = activeTournament.calculatedPrizePool
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={(
        props.initialValues
          ? props.initialValues
          : {
            prizes: initialPrizes,
            isGuaranteedPrizePool: activeTournament.isGuaranteedPrizePool,
            fixedPrizePool: activeTournament.fixedPrizePool
          }
      )}
      mutators={arrayMutators}
      validate={prizesValidation}
      render={({ handleSubmit, pristine, invalid, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FieldArray name='prizes'>
              {({ fields }) => (
                <div>
                  <div style={{ marginBottom: 20, marginTop: 15 }}>
                    <div
                      style={{
                        fontSize: 14,
                        marginBottom: 5,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Field
                          type='checkbox'
                          component={FieldCheckbox}
                          name='isGuaranteedPrizePool'
                          text='MIN. GUARANTEED PRIZE POOL'
                        />
                      </div>
                      <Field
                        component={UnderLineInputWithIcon}
                        name='fixedPrizePool'
                        style={{ width: 200 }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      marginBottom: 20,
                      marginTop: 50,
                      display: 'flex',
                      alignItems: 'flex-end'
                    }}
                  >
                    <div style={{ fontSize: 20, marginRight: 10 }}>
                      Prize pool{' '}
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: 25 }}>
                      {parseInt(prizePool)}
                    </div>
                  </div>
                  <Separator />
                  <FormItem row center>
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Place
                    </Label>
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Place amount
                    </Label>
                    <div style={{ width: 20 }} />
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Prize percentage
                    </Label>
                    <div style={{ width: 20 }} />
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        color: colorBlack80
                      }}
                    >
                      Fixed amount
                    </Label>
                    <div style={{ width: 40 }} />
                  </FormItem>
                  {fields.map((name, index) => (
                    <>
                      <Field
                        prizePool={prizePool}
                        name={name}
                        isGuaranteedPrizePool={values.isGuaranteedPrizePool}
                        fixedPrizePool={values.fixedPrizePool}
                        key={index}
                        index={index}
                        component={PrizeInput}
                        onRemove={() => fields.remove(index)}
                        length={fields.length}
                      />
                    </>
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
                    <SecondaryButton
                      prizes
                      onClick={e => {
                        e.preventDefault()
                        fields.push({
                          name: `${getLastPosition({ prizes: values.prizes })}`,
                          amount: 1,
                          value: 0,
                          order: fields.length + 1,
                          percentage: 0,
                          hasDescription: false,
                          description: ''
                        })
                      }}
                    >
                      + Add
                    </SecondaryButton>
                  </div>
                  <FormItem
                    row
                    center
                    style={{ borderTop: '1px solid #cecece' }}
                  >
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: colorBlack80
                      }}
                    >
                      {(values &&
                        values.prizes &&
                        values.prizes.reduce(
                          (acumulator, item) =>
                            (Number(item.amount) || 0) + acumulator,
                          0
                        )) ||
                        0}
                    </Label>
                    <div style={{ width: 20 }} />
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: colorBlack80
                      }}
                    >
                      {(
                        values &&
                        values.prizes &&
                        values.prizes.reduce(
                          (acumulator, item) =>
                            (Number(item.percentage) * Number(item.amount) ||
                              0) + acumulator,
                          0
                        )
                      ).toFixed(2) || 0}
                      %
                    </Label>
                    <div style={{ width: 20 }} />
                    <Label
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        margin: 10,
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: colorBlack80
                      }}
                    >
                      {(values &&
                        values.prizes &&
                        values.prizes.reduce(
                          (acumulator, item) =>
                            (Number(
                              (item.value && (item.value + '').includes('.')
                                ? (item.value + '').replace('.', '')
                                : item.value) * Number(item.amount) || 0
                            ) || 0) + acumulator,
                          0
                        )) ||
                        0}
                    </Label>
                    <div style={{ width: 40 }} />
                  </FormItem>
                </div>
              )}
            </FieldArray>
            {renderActions ? (
              renderActions({ invalid, pristine })
            ) : (
              <PanelFooter>
                <PanelClear>
                  <SecondaryButton type='button' rightMargin onClick={onClose}>
                    Close
                  </SecondaryButton>
                  <SecondaryButton filled onClick={handleSubmit}>
                    Apply
                  </SecondaryButton>
                </PanelClear>
              </PanelFooter>
            )}
          </form>
        )
      }}
    />
  )
}
const PrizeInput = ({
  name,
  onRemove,
  index,
  length,
  input: { value: prizeValue, onChange },
  meta: { error, touched },
  prizePool,
  isGuaranteedPrizePool,
  fixedPrizePool
}) => {
  const selectedPrizePool =
    isGuaranteedPrizePool && fixedPrizePool > prizePool
      ? fixedPrizePool
      : prizePool
  return (
    <FormItem key={name}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UnderLineInputWithIcon
          meta={{ error: '', touched: true }}
          input={{
            value: prizeValue.name,
            onChange: e => {
              if ((e.target.value + '').trim().includes('-')) {
                onChange({
                  ...prizeValue,
                  name: e.target.value,
                  amount:
                    e.target.value.trim().split('-')[1] -
                    Number(e.target.value.split('-')[0]) +
                    1
                })
              } else {
                onChange({
                  ...prizeValue,
                  name: e.target.value,
                  amount: 1
                })
              }
            }
          }}
          icon='#'
        />
        <div style={{ width: 20 }} />

        <div>{prizeValue.amount}</div>
        <div style={{ width: 20 }} />

        <UnderLineInputWithIcon
          meta={{ error: '', touched: true }}
          simbol='%'
          input={{
            value: prizeValue.percentage,
            onChange: e => {
              onChange({
                ...prizeValue,
                percentage: e.target.value,
                value: (
                  (Number(e.target.value.replace('.', '')) / 100) *
                  selectedPrizePool
                ).toFixed(0)
              })
            }
          }}
        />
        <div style={{ width: 20 }} />
        <UnderLineInputWithIcon
          meta={{ error: '', touched: true }}
          input={{
            value: prizeValue.value,
            onChange: e => {
              onChange({
                ...prizeValue,
                value: e.target.value,
                percentage: (
                  (Number(e.target.value.replace('.', '')) * 100) /
                  selectedPrizePool
                ).toFixed(2)
              })
            }
          }}
        />
        <div style={{ width: 20 }} />

        <div
          style={{
            width: 40,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            paddingLeft: '15px',
            zIndex: '1',
            outline: 'none'
          }}
          onClick={() => {
            index !== length - 1 || (index !== 0 && onRemove())
          }}
        >
          <CloseIcon disabled={index !== length - 1 || index === 0} />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <input
            style={{ marginRight: 5 }}
            type='checkbox'
            checked={prizeValue.hasDescription}
            onChange={e => {
              onChange({
                ...prizeValue,
                hasDescription: e.target.checked
              })
            }}
          />
          <div>Description</div>
        </div>

        {prizeValue.hasDescription && (
          <textarea
            style={{
              marginBottom: 20,
              border: `1px solid ${colorPrimary}`,
              borderRadius: 5,
              marginTop: 10,
              appearance: 'none',
              height: 30,
              paddingLeft: 20,
              paddingTop: 5,
              fontSize: 15
            }}
            placeholder='Prize description'
            value={prizeValue.description}
            onChange={e => {
              onChange({
                ...prizeValue,
                description: e.target.value
              })
            }}
          />
        )}
      </div>
    </FormItem>
  )
}
