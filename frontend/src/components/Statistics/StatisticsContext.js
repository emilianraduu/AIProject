import React from 'react'
import {
  FETCH_STATISTICS_SUCCESS
} from './StatisticsActions'

const initialState = {
  statistics: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        statistics: action.payload
      }

    default:
      return state
  }
}

const StatisticsContext = React.createContext()

function StatisticsContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <StatisticsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StatisticsContext.Provider>
  )
}

const StatisticsContextConsumer = StatisticsContext.Consumer

export { StatisticsContext, StatisticsContextProvider, StatisticsContextConsumer }