import React from 'react'
import {
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_HISTORIES_SUCCESS,
  CHANGE_PLAYER_HISTORIES_PAGE,
  CHANGE_PLAYER_HISTORIES_SORT,
  CLEAR_PLAYER_HISTORIES_FILTERS,
  APPLY_PLAYER_HISTORIES_FILTER,
  UPDATE_PLAYER_DETAILS_SUCCESS,
  UPDATE_TOURNAMENT_PLAYER_SUCCESS, UPDATE_TOURNAMENT_PLAYER_FAIL, UPDATE_TOURNAMENT_PLAYER
} from './ActivePlayerActions'
import { FETCH_PLAYER, FETCH_PLAYER_STATISTICS_SUCCESS } from '../PlayersActions'

const initialState = {
  activePlayer: {},
  histories: {
    list: {},
    filters: {},
    sort: ['amount', 'DESC'],
    pagination: {
      page: 1,
      pageSize: 10
    }
  },
  successfulPayment: false,
  statistics: {},
  hasPayed: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PLAYER:
      return {
        ...state,
        activePlayer: undefined
      }
    case FETCH_PLAYER_SUCCESS:
      return {
        ...state,
        activePlayer: action.payload
      }
    case UPDATE_TOURNAMENT_PLAYER:
      return {
        ...state,
        hasPayed: false
      }
    case UPDATE_TOURNAMENT_PLAYER_SUCCESS: {
      return {
        ...state,
        activePlayer: {
          ...state.activePlayer,
          ...action.payload
        },
        hasPayed: action.payload.payment
      }
    }
    case UPDATE_TOURNAMENT_PLAYER_FAIL:
      return {
        ...state,
        hasPayed: false
      }
    case UPDATE_PLAYER_DETAILS_SUCCESS:
      return {
        ...state,
        activePlayer: {
          ...state.activePlayer,
          ...action.payload
        }
      }
    case FETCH_PLAYER_HISTORIES_SUCCESS: {
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
    case CHANGE_PLAYER_HISTORIES_PAGE:
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
    case CHANGE_PLAYER_HISTORIES_SORT:
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
    case APPLY_PLAYER_HISTORIES_FILTER:
      return {
        ...state,
        histories: {
          filters: {
            ...state.filters,
            [action.payload.filter.name]: action.payload.filter.value
          }
        }
      }
    case CLEAR_PLAYER_HISTORIES_FILTERS:
      return {
        ...state,
        histories: {
          ...state.histories,
          filters: {}
        }
      }
    case FETCH_PLAYER_STATISTICS_SUCCESS:
      return {
        ...state,
        statistics: action.payload
      }
    default:
      return state
  }
}

const ActivePlayerContext = React.createContext()

function ActivePlayerContextProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <ActivePlayerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ActivePlayerContext.Provider>
  )
}

const ActivePlayerContextConsumer = ActivePlayerContext.Consumer

export { ActivePlayerContext, ActivePlayerContextProvider, ActivePlayerContextConsumer }
