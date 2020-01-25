import React from 'react'
import {Input, Textarea} from '../../../styles/shared/input'
import {FieldError} from './styles'

export const FieldInput = ({input, meta: {touched, error}, disabled, placeholder, autoComplete, onBlur}) => {
    console.log(touched)
    return (
        <div>
            <Input
                {...input}
                disabled={disabled}
                error={touched && error}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            {error && <FieldError>{error}</FieldError>}
        </div>
    )
}


export const FieldTextarea = ({input, meta: {touched, error}, disabled, placeholder, autoComplete, onBlur}) => {
    return (
        <div>
            <Textarea
                {...input}
                disabled={disabled}
                error={touched && error}
                placeholder={placeholder}
                onBlur={onBlur}
                autoComplete={autoComplete}
            />
            {error && touched && <FieldError>{error}</FieldError>}
        </div>
    )
}
