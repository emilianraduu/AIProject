import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { SelectWrapper } from './styles'
import { FieldError } from '../Input/styles'

export const CreateableFieldSelect = ({ onChange: customOnChange, input: { value, onChange, onFocus, onBlur }, options, meta: { error, touched }, ...props }) => {
  return (
    <SelectWrapper error={touched && error}>
      <CreatableSelect
        {...props}
        className='react-select-container'
        classNamePrefix='react-select'
        options={options}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value && value.value ? value : options && options.filter(option => option.value === value)}
      />
      {touched && error && <FieldError>{error}</FieldError>}
    </SelectWrapper>
  )
}
