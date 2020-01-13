import React from 'react'
import DatePicker from 'react-datepicker'
import { DatePickerCustomStyle, DatePickerWrapper } from './styles'
import { FieldError } from '../Input/styles'
import { NoKeyboardInput } from '../Input/NoKeyboardInput'

export const FieldDatepicker = ({ input: { value, onChange, onFocus, onBlur }, meta: { touched, error }, disabled, placeholder, validity, min, max, yearCount, rightAlignment }) => {
  const ref = React.createRef()
  return (
    <DatePickerWrapper error={touched && error}>
      <DatePickerCustomStyle addStaff rightAlignment={rightAlignment}>
        <DatePicker
          dateFormat='MM/dd/yyyy'
          customInput={<NoKeyboardInput disabled={disabled} placeholderText={placeholder} ref={ref} />}
          selected={value}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          disabled={disabled}
          minDate={min}
          maxDate={max}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={yearCount ? yearCount : 10}
          showMonthDropdown
        />
        {touched && error && <FieldError>{error}</FieldError>}
      </DatePickerCustomStyle>
    </DatePickerWrapper>
  )
}
