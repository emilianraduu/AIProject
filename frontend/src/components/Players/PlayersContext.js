import React from 'react'
import {
  APPLY_PLAYERS_FILTER,
  CHANGE_PLAYERS_PAGE,
  CHANGE_PLAYERS_SORT,
  CLEAR_PLAYERS_FILTERS,
  FETCH_PLAYERS_SUCCESS,
  REMOVE_PLAYERS_FILTER,
  CLEAR_PLAYERS_SORT,
  FETCH_PLAYERS,
  FETCH_PLAYER_SUCCESS,
  FETCH_PLAYER_FAIL,
  FETCH_PLAYER
} from './PlayersActions'

const initialState = {
  pagination: {
    page: 1,
    pageSize: 10
  },
  players: [],
  filters: {},
  loading: true,
  sort: ['users.createdAt', 'DESC'],
  activePlayer: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PLAYER_SUCCESS:
      return { ...state, activePlayer: action.payload }
    case FETCH_PLAYERS:
      return { ...state, loading: true }
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: action.isMobile ? [...state.players, ...action.payload.results] : action.payload.results,
        pagination: action.payload.pagination
      }
    case CHANGE_PLAYERS_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page
        }
      }
    case CLEAR_PLAYERS_SORT:
      return {
        ...state,
        sort: initialState.sort
      }
    case APPLY_PLAYERS_FILTER:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        players: {},
        filters: {
          ...state.filters,
          [action.payload.name]: [action.payload.operator, action.payload.value]
        }
      }
    case CHANGE_PLAYERS_SORT:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        players: {},
        sort: action.payload
      }
    case CLEAR_PLAYERS_FILTERS:
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        players: {},
        filters: {}
      }
    case REMOVE_PLAYERS_FILTER:
      const newFilters = {
        ...state.filters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        loading: true,
        pagination: {
          ...initialState.pagination
        },
        players: {},
        filters: { ...newFilters }
      }
    default:
      return state
  }
}

const PlayersContext = React.createContext()

function PlayersContextProvider (props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <PlayersContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PlayersContext.Provider>
  )
}

const PlayersContextConsumer = PlayersContext.Consumer

export { PlayersContext, PlayersContextProvider, PlayersContextConsumer }
