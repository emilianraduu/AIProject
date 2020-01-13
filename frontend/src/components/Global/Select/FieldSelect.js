import React from 'react'
import Select from 'react-select'
import { SelectWrapper } from './styles'
import { FieldError } from '../Input/styles'
import AsyncSelect from 'react-select/async'

export const FieldSelect = ({
  onChange: customOnChange,
  input: { value, onChange, onFocus, onBlur },
  options,
  meta: { error, touched },
  ...props
}) => {
  return (
    <SelectWrapper error={touched && error}>
      <Select
        {...props}
        className='react-select-container'
        classNamePrefix='react-select'
        options={options}
        onChange={e => {
          onChange(e)
          customOnChange && customOnChange(e)
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        value={
          value && value.value
            ? value
            : options && options.filter(option => option.value === value)
        }
      />
      {touched && error && <FieldError>{error}</FieldError>}
    </SelectWrapper>
  )
}

export const FieldAsyncSelect = ({
  onChange: customOnChange,
  input,
  meta: { error, touched },
  options,
  ...props
}) => {
  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(options)
      }, 300)
    })

  return (

    <SelectWrapper error={touched && error}>
      <AsyncSelect
        {...props}
        {...input}
        className='react-select-container'
        classNamePrefix='react-select'
        loadOptions={promiseOptions}
        cacheOptions
        onBlur={() => {}}
        defaultOptions
      />
      {touched && error && <FieldError>{error}</FieldError>}
    </SelectWrapper>
  )
}
