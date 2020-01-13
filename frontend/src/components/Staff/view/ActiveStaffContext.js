import React from 'react'
import {
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_HISTORIES_SUCCESS,
  CHANGE_STAFF_HISTORIES_PAGE,
  CHANGE_STAFF_HISTORIES_SORT,
  CLEAR_STAFF_HISTORIES_FILTERS,
  APPLY_STAFF_HISTORIES_FILTER,
  UPDATE_STAFF_DETAILS_SUCCESS
} from './ActiveStaffActions'

const initialState = {
  activeStaff: {},
  histories: {
    list: {},
    filters: {},
    sort: ['amount', 'DESC'],
    pagination: {
      page: 1,
      pageSize: 10
    }
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        activeStaff: action.payload.staff
      }
    case FETCH_STAFF_HISTORIES_SUCCESS: {
      return {
        ...state,
        histories: {
          ...state.histories,
          list: {
            ...state.histories.list,
            [action.payload.pagination.page]: action.payload.results
          },
          pagination: action.payload.pagination
        }
      }
    }
    case UPDATE_STAFF_DETAILS_SUCCESS:
      return {
        ...state,
        activeStaff: {
          ...state.activeStaff,
          ...action.payload
        }
      }
    case CHANGE_STAFF_HISTORIES_PAGE:
      return {
        ...state,
        histories: {
          ...state.histories,
          pagination: {
            ...state.histories.pagination,
            page: action.payload.page
          }
        }
      }
    case CHANGE_STAFF_HISTORIES_SORT:
      return {
        ...state,
        histories: {
          list: {},
          sort: action.payload.sort,
          pagination: {
            page: 1,
            pageSize: 10
          }
        }
      }
    case APPLY_STAFF_HISTORIES_FILTER:
      return {
        ...state,
        histories: {
          filters: {
            ...state.filters,
            [action.payload.filter.name]: action.payload.filter.value
          }
        }
      }
    case CLEAR_STAFF_HISTORIES_FILTERS:
      return {
        ...state,
        histories: {
          ...state.histories,
          filters: {}
        }
      }
    default:
      return state
  }
}

const ActiveStaffContext = React.createContext()

function ActiveStaffContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <ActiveStaffContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ActiveStaffContext.Provider>
  )
}

const ActiveStaffContextConsumer = ActiveStaffContext.Consumer

export { ActiveStaffContext, ActiveStaffContextProvider, ActiveStaffContextConsumer }
