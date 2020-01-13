import React, { useContext, useState } from 'react'
import { Form, Field } from 'react-final-form'
import { gameRulesValidation } from './TournamentDetailsValidations'
import {ActiveTournamentContext} from '../ActiveTournamentContext'
import { AuthContext } from '../../../Auth/AuthContext'
import { FormItem, FormWithToggle, StyledToggle } from '../../../../styles/shared/form'
import { Label } from '../../../../styles/typography/typography'
import { FieldInput } from '../../../Global/Input/FieldInput'
import { BoxContent } from '../../../Global/Box/styles/box'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import {updateGameRules} from '../ActiveTournamentActions'
import { colorBlack12, colorPrimary } from '../../../../styles/abstract/variables'
import { NoKeyboardInput } from '../../../Global/Input/NoKeyboardInput'
import moment from 'moment-timezone'
import { FieldDateAndTimePicker } from '../../../Global/DatePickers/FieldDateAndTimePicker'

export default function GameRulesForm ({onClose}) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const {activeTournament : {shotClock, registerStart, registerEnd, dateTime}} = tournamentsContext.state
  const authContext = useContext(AuthContext)
  const onSubmit = (values) => {
    updateGameRules({
      authContext,
      tournamentsContext,
      successFunction: onClose,
      data: values
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={gameRulesValidation}
      initialValues={{
        shotClock: shotClock || 0,
        registerStart: registerStart && moment(registerStart).toDate(),
        registerEnd: registerEnd && moment(registerEnd).toDate()
      }}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} >
          <BoxContent>
            <GameRulesInput name={'shotClock'} value={shotClock} labelName = {'Shot Clock'} />
            <FormItem>
              <Label>Register Starts</Label>
              <Field component={FieldDateAndTimePicker} min={new Date()} max={moment(dateTime).toDate()} name='registerStart' placeholder={'Pick a date'}/>
            </FormItem>
            <FormItem>
              <Label>Register Ends</Label>
              <Field component={FieldDateAndTimePicker} date={values.registerStart ? values.registerStart : registerStart && registerStart} name='registerEnd' disabled={!values.registerStart} placeholder={'Pick a date'}/>
            </FormItem>
          </BoxContent>
          <PanelFooter>
            <PanelClear>
              <SecondaryButton type={'button'}  rightMargin onClick={onClose}>
                Close
              </SecondaryButton>
              <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                Apply
              </SecondaryButton>
            </PanelClear>
          </PanelFooter>
        </form>
      )}
    />
  )
}

const GameRulesInput = ({name, value, labelName}) => {
  const [toggleChecked , setToggleChecked] = useState(value > 0)
  //value > 0 ? true : false
  return (
      <FormItem gameRules>
        <FormWithToggle>
          <Label>{labelName}</Label>
          <StyledToggle>
           
          </StyledToggle>
        </FormWithToggle>
        {
          toggleChecked ?
            <Field component={FieldInput} name={`${name}`} placeholder={"Insert value"} />
            :
            <Field  component={NoKeyboardInput} name={`${name}`} inactive={true} placeholderText={"Insert value"} value={0}/>
        }
      </FormItem>
  )
}