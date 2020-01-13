import React from 'react'
import {
  GET_USER_SUCCESS,
  LOGOUT_SUCCESS,
  REQUEST_AUTH_TOKEN,
  REQUEST_AUTH_TOKEN_FAILED,
  UPDATE_USER_DETAILS_SUCCESS
} from './AuthActions'
import moment from 'moment-timezone'
import { reducerPersistor, statePersister } from '../../helpers/contextPersistor'

const STORAGE_KEY = 'auth'
const initialState = {
  access_token: undefined,
  refresh_token: undefined,
  expires_at: undefined,
  token_type: '',
  loggedIn: false,
  errorLogin: false,
  user: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case REQUEST_AUTH_TOKEN:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_at: moment().add(action.payload.expires_in, 'second'),
        token_type: action.payload.token_type,
        loggedIn: true,
        errorLogin: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      }
    case REQUEST_AUTH_TOKEN_FAILED:
      return {
        ...state,
        loggedIn: false,
        errorLogin: true
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    default:
      return state
  }
}
const AuthContext = React.createContext()

function AuthContextProvider (props) {
  const [state, dispatch] = React.useReducer(reducerPersistor(STORAGE_KEY, reducer), statePersister(STORAGE_KEY, initialState))
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  )
}

const AuthContextConsumer = AuthContext.Consumer

export { AuthContext, AuthContextProvider, AuthContextConsumer }
