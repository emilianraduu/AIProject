import React from 'react'
import {
  SAVE_TOURNAMENTS_WIZZARD_STEP,
  CLEAR_TOURNAMENT_WIZZARD
} from './WizzardActions'
import { reducerPersistor, statePersister } from '../../../../helpers/contextPersistor'
import { IMPORT_TOURNAMENT_DETAILS_SUCCESS } from '../../view/ActiveTournamentActions'
import { CREATE_TOURNAMENT_SUCCESS } from '../../TournamentsActions'
import { LOGOUT_SUCCESS } from '../../../Auth/AuthActions'

const initialState = {
  tournaments: {
    steps: {
      total: 6,
      details: 1,
      importDetails: 2,
      festival: 3,
      prizes: 4,
      blinds: 4,
      fee: 5,
      table: 6
    },
    table: { },
    festival: {},
    festivalCreated: false,
    festivalSearchTerm: '',
    fee: {},
    importDetails: {
    },
    details: {
    },

    blinds: {
      blinds: [{ amount: 1, name: '1', value: 0, order: 1 }]
    },
    prize: {
      prizes: [{ amount: 1, name: '1', value: 0, order: 1 }]
    }
  },
  cashgames: {
    steps: {
      total: 6,
      details: 1,
      importDetails: 2,
      festival: 3,
      // prizes: 4,
      blinds: 4,
      fee: 5,
      table: 6
    },
    table: {},
    festival: {},
    festivalCreated: false,
    festivalSearchTerm: '',
    fee: {},
    details: {
    },

    blinds: {
      blinds: [{ amount: 1, name: '1', value: 0, order: 1 }]
    },
    prize: {
      prizes: [{ amount: 1, name: '1', value: 0, order: 1 }]
    }
  }

}

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_TOURNAMENT_SUCCESS:
      return { ...state, [action.tournamentType]: { ...initialState[action.tournamentType] } }
    case IMPORT_TOURNAMENT_DETAILS_SUCCESS:
      return {
        ...state,
        [action.tournamentType]: {
          ...state[action.tournamentType],
          ...action.payload,
          table: {
            numberOfTables: action.payload.numberOfTables,
            availableSeats: action.payload.availableSeats ? { label: action.payload.availableSeats, value: action.payload.availableSeats } : null
          },
          fee: {
            buyIn: action.payload.buyIn,
            numberOfChips: action.payload.numberOfChips,
            maxPlayers: action.payload.maxPlayers
          },
          blinds: {
            blinds: action.payload.blinds && action.payload.blinds.length > 0 ? action.payload.blinds : initialState[action.tournamentType].blinds.blinds,
            blindLevels: action.payload.blindLevels ? {
              value: action.payload.blindLevels,
              label: action.payload.blindLevels
            } : null,
            blindMinutesPerLevel: action.payload.blindMinutesPerLevel ? {
              value: action.payload.blindMinutesPerLevel,
              label: action.payload.blindMinutesPerLevel
            } : null

          },
          festival: action.payload.festival ? {
            name: {
              value: action.payload.festival.id,
              label: action.payload.festival.name
            }
          } : null,
          prize: {
            prizes: action.payload.prizes && action.payload.prizes.length > 0 ? action.payload.prizes.sort((a, b) => {
              if (a.value < b.value) { return 1 }
              if (a.value > b.value) { return -1 }
              return 0
            }) : initialState[action.tournamentType].prize.prizes
          }
        }

      }
    case SAVE_TOURNAMENTS_WIZZARD_STEP:
      return { ...state, [action.tournamentType]: { ...state[action.tournamentType], [action.step]: action.payload } }

    case CLEAR_TOURNAMENT_WIZZARD:
      return { ...state, [action.tournamentType]: initialState[action.tournamentType] }
    case LOGOUT_SUCCESS:
      return { ...initialState }
    default:
      return state
  }
}

const WizzardContext = React.createContext()

function WizzardContextProvider (props) {
  const [state, dispatch] = React.useReducer(reducerPersistor('createWizzard', reducer), statePersister('createWizzard', initialState))
  // const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <WizzardContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WizzardContext.Provider>
  )
}

const WizzardContextConsumer = WizzardContext.Consumer

export { WizzardContext, WizzardContextProvider, WizzardContextConsumer }
