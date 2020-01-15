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
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case REQUEST_AUTH_TOKEN:
      return{
        ...state,
        accessToken: action.payload.accessToken,
        expires_at: moment().add(action.payload.expiresIn, 'ms'),
        loggedIn: true,

      }
    case REQUEST_AUTH_TOKEN_FAILED:
        return {
          ...state,
          errorLogin: 'Error'
        }
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      }

    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        users: action.payload
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
