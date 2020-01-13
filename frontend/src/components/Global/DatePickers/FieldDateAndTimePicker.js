import React from 'react'
import DatePicker from 'react-datepicker'
import { DatePickerCustomStyle, DatePickerWrapper } from './styles'
import { FieldError } from '../Input/styles'
import { NoKeyboardInput } from '../Input/NoKeyboardInput'

export const FieldDateAndTimePicker = ({ input: { value, onChange, onFocus, onBlur }, meta: { touched, error }, disabled, mobile, placeholder, min, type, max, minTime, maxTime }) => {
  return (
    <DatePickerWrapper error={touched && error} noOutline>
      <DatePickerCustomStyle addTournament mobile={mobile}>
        <DatePicker
          customInput={<NoKeyboardInput disabled={disabled} placeholderText={placeholder} />}
          selected={value && new Date(value)}
          showTimeSelect
          dateFormat='MM/dd/yyyy HH:mm'
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          disabled={disabled}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={5}
          showMonthDropdown
          minDate={min}
          maxDate={max}
          minTime={minTime}
          maxTime={maxTime}
        />
        {touched && error && <FieldError>{error}</FieldError>}
      </DatePickerCustomStyle>
    </DatePickerWrapper>
  )
}
