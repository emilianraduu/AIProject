import React from 'react'
import { FETCH_FESTIVALS_SUCCESS } from './FestivalActions'

const initialState = {
  pagination: {
    page: 1,
    pageSize: 1
  },
  festivals: [],
  filters: {
    // dateTime: ['>=', '2019-08-08']
  },
  sort: ['dateTime', 'DESC']
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_FESTIVALS_SUCCESS:
      return { ...state, festivals: action.payload.results, pagination: action.payload.pagination }
    default:
      return state
  }
}

const FestivalContext = React.createContext()

function FestivalContextProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <FestivalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FestivalContext.Provider>
  )
}

const FestivalContextConsumer = FestivalContext.Consumer

export { FestivalContext, FestivalContextProvider, FestivalContextConsumer }
