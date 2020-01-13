import React from 'react'
import {
  CHANGE_COUNTRIES_PAGE, FETCH_COUNTRY_SUCCESS, FETCH_COUNTRIES_SUCCESS, APPLY_COUNTRIES_FILTER
} from './CountriesActions'

const initialState = {
  pagination: {
    page: 1,
    pageSize: 300
  },
  countries: {},
  filters: {
    // dateTime: ['>=', '2019-08-08']
  },
  sort: ['createdAt', 'DESC'],
  singles: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: {
          ...state.countries,
          [action.payload.pagination.page]: action.payload.results
        },
        pagination: action.payload.pagination
      }
    case CHANGE_COUNTRIES_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page
        }
      }
    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        singles: {
          ...state.singles,
          [action.payload.countryId]: {
            country: action.payload.country
          }
        }
      }
    case APPLY_COUNTRIES_FILTER:
      return {
        ...state,
        pagination: {
          ...initialState.pagination
        },
        countries: {},
        filters: {
          ...state.filters,
          [action.payload.name]: [action.payload.operator, action.payload.value]
        }
      }
    default:
      return state
  }
}

const CountriesContext = React.createContext()

function CountriesContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <CountriesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CountriesContext.Provider>
  )
}

const CountriesContextConsumer = CountriesContext.Consumer

export { CountriesContext, CountriesContextProvider, CountriesContextConsumer }