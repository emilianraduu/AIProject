import React from 'react'
import { Input } from '../../../styles/shared/input'

export const NoKeyboardInput = React.forwardRef(({ input,onClick, value, disabled, onFocus, onBlur, placeholderText, inactive }, ref) => {
  if(inactive)
    input.onChange(0)
  return (
    <Input
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      type='text'
      readOnly
      ref={ref}
      placeholder={placeholderText}
      inactive = {inactive}
    />
  )
})
