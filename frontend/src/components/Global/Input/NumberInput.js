import React from 'react'
import { Input } from '../../../styles/shared/input'
import { FieldError } from './styles'

export const NumberInput = ({ input, meta: { touched, error }, disabled, placeholder, simbol, min }) => (
  <div style={{ position: 'relative' }}>
    <Input {...input} disabled={disabled} error={touched && error} placeholder={placeholder} type='number'
           min={min || 0}/>
    {simbol && <div style={{
      position: 'absolute',
      right: 30,
      bottom: 'calc(50% - 7px)',
      fontWeight: 'bold',
      fontSize: 14
    }}>{simbol}</div>}
    {error && touched && <FieldError>{error}</FieldError>}
  </div>)
