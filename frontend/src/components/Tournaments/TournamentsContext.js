import React from 'react'
import {
  CHANGE_TOURNAMENTS_PAGE,
  FETCH_TOURNAMENTS_SUCCESS,
  CHANGE_TOURNAMENTS_SORT,
  APPLY_TOURNAMENTS_FILTER,
  CLEAR_TOURNAMENTS_FILTERS,
  REMOVE_TOURNAMENTS_FILTER,
  REMOVE_TOURNAMENTS_SORT,
  FETCH_TOURNAMENTS
} from './TournamentsActions'

const initialState = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  tournaments: {},
  loading: true,
  filters: {
    // dateTime: ['>=', '2019-08-08']
  },
  sort: ['dateTime', 'DESC']
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_TOURNAMENTS:
      return {
        ...state,
        loading: true,
      }
    case FETCH_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        tournaments: {
          ...state.tournaments,
          [action.payload.data.pagination.page]: action.payload.data.results
        },
        pagination: action.payload.data.pagination,
        loading: false,
      }
    case CHANGE_TOURNAMENTS_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page
        },
        // loading: true
      }
    case APPLY_TOURNAMENTS_FILTER:
      return {
        ...state,
        pagination: {
          ...initialState.pagination
        },
        tournaments: {},
        loading: true,
        filters: {
          ...state.filters,
          [action.payload.name]: [action.payload.operator, action.payload.value]
        }
      }
    case REMOVE_TOURNAMENTS_SORT:
      return{
        ...state,
        sort: initialState.sort
      }
    case CHANGE_TOURNAMENTS_SORT:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        tournaments: {},
        sort: action.payload
      }
    case CLEAR_TOURNAMENTS_FILTERS:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        tournaments: {},
        filters: {}
      }
    case REMOVE_TOURNAMENTS_FILTER:
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
        tournaments: {},
        filters: { ...newFilters }
      }
    default:
      return state
  }
}

const TournamentsContext = React.createContext()

function TournamentsContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <TournamentsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TournamentsContext.Provider>
  )
}

const TournamentsContextConsumer = TournamentsContext.Consumer

export { TournamentsContext, TournamentsContextProvider, TournamentsContextConsumer }
