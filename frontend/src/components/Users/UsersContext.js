import React from 'react'
import {
  CHANGE_USERS_PAGE,
  FETCH_USER_SUCCESS,
  FETCH_USERS_SUCCESS,
  APPLY_USERS_FILTER,
  FETCH_USER_FAIL,
  FETCH_USERS,
  REMOVE_USERS_FILTER
} from './UsersActions'

const initialState = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  countries: {},
  filters: {
    // dateTime: ['>=', '2019-08-08']
  },
  sort: ['createdAt', 'DESC'],
  activeUser: {},
  users: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        pagination: {
          page: 1
        }
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: [
          // ...state.users,
          ...action.payload.results
        ],
        countries: {
          ...state.countries,
          [action.payload.pagination.page]: action.payload.results
        },
        pagination: action.payload.pagination
      }
    case CHANGE_USERS_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page
        }
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        activeUser: action.payload.user
      }
    case FETCH_USER_FAIL:
      return {
        ...state,
        activeUser: undefined
      }
    case APPLY_USERS_FILTER:
      return {
        ...state,
        pagination: {
          ...initialState.pagination
        },
        countries: {},
        filters: {
          ...state.filters,
          [action.payload.name]:action.payload.value &&  [action.payload.operator, action.payload.value]
        }
      }
    case REMOVE_USERS_FILTER:
      return{
        ...state,
        filters: {}
      }
    default:
      return state
  }
}

const UsersContext = React.createContext()

function UsersContextProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UsersContext.Provider>
  )
}

const UsersContextConsumer = UsersContext.Consumer

export { UsersContext, UsersContextProvider, UsersContextConsumer }
