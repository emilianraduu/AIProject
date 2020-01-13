import React from 'react'
import {
  APPLY_STAFFS_FILTER,
  CHANGE_STAFFS_PAGE,
  CHANGE_STAFFS_SORT,
  CLEAR_STAFFS_FILTERS,
  FETCH_STAFFS,
  FETCH_STAFFS_SUCCESS,
  REMOVE_STAFFS_SORT,
  REMOVE_STAFFS_FILTER
} from './StaffsActions'

const initialState = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  staffs: {},
  filters: {
    // dateTime: ['>=', '2019-08-08']
  },
  loading: true,
  sort: ['users.createdAt', 'DESC']
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_STAFFS:
      return {
        ...state,
        loading: true
      }
    case FETCH_STAFFS_SUCCESS:
      return {
        ...state,
        staffs: {
          ...state.staffs,
          [action.payload.data.pagination.page]: action.payload.data.results
        },
        loading: false,
        pagination: action.payload.data.pagination
      }
    case CHANGE_STAFFS_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page
        }
      }
    case REMOVE_STAFFS_SORT:
      return{
        ...state,
        sort: initialState.sort
      }
    case APPLY_STAFFS_FILTER:
      return {
        ...state,
        pagination: {
          ...initialState.pagination
        },
        staffs: {},
        loading: true,
        filters: {
          ...state.filters,
          [action.payload.name]: [action.payload.operator, action.payload.value]
        }
      }
    case CHANGE_STAFFS_SORT:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        staffs: {},
        sort: action.payload
      }
    case CLEAR_STAFFS_FILTERS:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        staffs: {},
        filters: {}
      }
    case REMOVE_STAFFS_FILTER:
      let newFilters = {
        ...state.filters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        staffs: {},
        filters: { ...newFilters }
      }
    default:
      return state
  }
}

const StaffsContext = React.createContext()

function StaffsContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <StaffsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StaffsContext.Provider>
  )
}

const StaffsContextConsumer = StaffsContext.Consumer

export { StaffsContext, StaffsContextProvider, StaffsContextConsumer }
