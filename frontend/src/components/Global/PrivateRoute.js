import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, redirectTo = 'login', render, allowed = true, type = 'tournaments', ...rest }) => (
  <Route
    {...rest}
    render={props =>
      allowed ? (
        render ? render(props)
          : <Component type={type} {...props} />
      )
        : (
          <Redirect to={{
            pathname: redirectTo,
            state: { from: props.location }
          }}
          />)}
  />
)
