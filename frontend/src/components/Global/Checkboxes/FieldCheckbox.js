import React from 'react'
import { CheckboxText, CheckboxWrapper } from './styles'
import { FieldError } from '../Input/styles'

export const FieldCheckbox = ({
  disabled,
  input: { value = false, onChange },
  meta: { touched, error },
  text = 'checkbox',
  defaultValue
}) => {
  return (
    <>
      <CheckboxWrapper>
        <Checkbox
          checked={value || defaultValue}
          onChange={onChange}
          disabled={disabled}
        />
        <CheckboxText>{text}</CheckboxText>
      </CheckboxWrapper>
      {error && <FieldError>{error}</FieldError>}
    </>
  )
}
const Checkbox = props => <input type='checkbox' {...props} />
