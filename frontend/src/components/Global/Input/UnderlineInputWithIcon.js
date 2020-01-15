import React from 'react'
import { UnderlineInput, UnderlineInputIcon, UnderlineInputWrapper, UnderlineInputError } from './styles'

export const UnderLineInputWithIcon = ({ input, placeholder, icon, meta: { error, touched }, styles = {}, simbol }) =>
  <UnderlineInputWrapper style={styles.container}>
    {icon && <UnderlineInputIcon styles={styles.icon}>{icon}</UnderlineInputIcon>}
    <UnderlineInput placeolder={placeholder} {...input} error={touched && error} style={styles.input} />
    {simbol && <div style={{ position: 'absolute', right: 10, bottom: 12 }}>{simbol}</div>}
    {touched && error && <UnderlineInputError styles={styles.error}>{error}</UnderlineInputError>}
  </UnderlineInputWrapper>
