import React from 'react'
import { Field } from 'react-final-form'

class MyFieldAdapter extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.meta.active && this.props.onChange && this.props.input.value !== prevProps.input.value) {
      this.props.onChange(this.props.input.value, prevProps.input.value)
    }
  }

  render() {
    return this.props.children
  }
}

export default function CustomField({ name, onChange, ...rest }) {
  return <Field
    name={name}
    subscription={{ value: true, active: true }}
    render={props => (
      <MyFieldAdapter {...props} onChange={onChange}>
        <Field name={name} {...rest} />
      </MyFieldAdapter>
    )}
  />
}