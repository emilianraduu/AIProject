import React from 'react'
import {
  FETCH_TOURNAMENT_SUCCESS,
  FETCH_TOURNAMENT_PLAYERS,
  CHANGE_TOURNAMENT_PLAYERS_PAGE,
  FETCH_TOURNAMENT_PLAYERS_SUCCESS,
  FETCH_TOURNAMENT_LOGS_SUCCESS,
  FETCH_TOURNAMENT_LOGS,
  CHANGE_TOURNAMENT_LOGS_PAGE,
  FETCH_TOURNAMENT_REPORTS_SUCCESS,
  CHANGE_TOURNAMENT_REPORTS_PAGE,
  FETCH_TOURNAMENT_STATISTICS_SUCCESS,
  CHANGE_TOURNAMENT_LOGS_SORT,
  APPLY_TOURNAMENT_LOGS_FILTER,
  CLEAR_TOURNAMENT_LOGS_FILTERS,
  CHANGE_TOURNAMENT_REPORTS_SORT,
  CLEAR_TOURNAMENT_REPORTS_FILTERS,
  APPLY_TOURNAMENT_REPORTS_FILTER,
  UPDATE_PRIZES_SUCCESS,
  REMOVE_TOURNAMENT_REPORTS_FILTER,
  REMOVE_TOURNAMENT_LOGS_FILTER,
  REMOVE_TOURNAMENT_PLAYERS_FILTER,
  CLEAR_TOURNAMENT_PLAYERS_FILTERS,
  APPLY_TOURNAMENT_PLAYERS_FILTER,
  CHANGE_TOURNAMENT_PLAYERS_SORT,
  UPDATE_TOURNAMENT_INFO_SUCCESS,
  UPDATE_BLINDS_SUCCESS,
  UPDATE_FEE_SUCCESS,
  IMPORT_TOURNAMENT_DETAILS_SUCCESS,
  CHANGE_TOURNAMENT_PROPRIETIES_SUCCESS,
  UPDATE_TOURNAMENT_TABLE_SUCCESS,
  CHANGE_TOURNAMENT_NOTIFICATIONS_PAGE,
  CHANGE_TOURNAMENT_NOTIFICATIONS_SORT,
  FETCH_TOURNAMENT_NOTIFICATIONS_SUCCESS,
  APPLY_TOURNAMENT_NOTIFICATIONS_FILTER,
  CLEAR_TOURNAMENT_NOTIFICATIONS_FILTERS,
  REMOVE_TOURNAMENT_NOTIFICATIONS_FILTER,
  TOURNAMENT_PLAYER_SWAP_TABLE_SUCCESS,
  APPLY_TOURNAMENT_TABLES_FILTER,
  CLEAR_TOURNAMENT_TABLES_FILTERS,
  FETCH_TOURNAMENT_NOTIFICATIONS,
  REMOVE_TOURNAMENT_TABLES_FILTER,
  GET_TOURNAMENT_PLAYER_INFO_SUCCESS,
  FETCH_TOURNAMENT_STATISTICS,
  CREATE_TOURNAMENT_PLAYER_SUCCESS,
  TOURNAMENT_PLAYER_DELETE_TABLE_SUCCESS,
  DELETE_TABLE_SUCCESS, FETCH_TOURNAMENT_WAITING_LIST, FETCH_TOURNAMENT_WAITING_LIST_SUCCESS, UPDATE_ADJUSTED_SUCCESS,
  FETCH_TOURNAMENT, GET_TOURNAMENT_TABLES_SUCCESS
} from './ActiveTournamentActions'
import _ from 'lodash'
import moment from 'moment'

const initialState = {
  tablesFilters: {},
  activePlayer: {},
  activeTournament: {},
  waitingList: [],
  loading: true,
  loadingTournament: false,
  players: {
    list: {},
    filters: {},
    sort: ['players.createdAt', 'DESC'],
    pagination: {
      page: 1,
      pageSize: 10
    }
  },
  logs: {
    list: {},
    filters: {},
    sort: ['logs.createdAt', 'DESC'],
    pagination: {
      page: 1,
      pageSize: 10
    }
  },
  notifications: {
    list: {},
    filters: {},
    sort: ['notifications.createdAt', 'DESC'],
    pagination: {
      page: 1,
      pageSize: 10
    }
  },
  reports: {
    list: {},
    filters: {},
    sort: ['amount', 'DESC'],
    pagination: {
      page: 1,
      pageSize: 10
    }
  },
  statistics: {
    list: {}
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case DELETE_TABLE_SUCCESS:
      let newTables = [...state.activeTournament.tables]
      _.remove(newTables, newTables.find(table => table.id === action.payload))
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          tables: newTables
        }
      }
    case TOURNAMENT_PLAYER_DELETE_TABLE_SUCCESS:
      let tables = [...state.activeTournament.tables]
      let table = tables.find(table => table.id === action.payload.id)
      let removePlayer = table.players.find(player => player.id === action.payload.playerId)
      _.remove(table.players, removePlayer)
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          tables
        }
      }
    case GET_TOURNAMENT_TABLES_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          ...action.payload
        }
      }
    case CREATE_TOURNAMENT_PLAYER_SUCCESS:
      return {
        ...state,
        registeringUser: action.payload
      }
    case GET_TOURNAMENT_PLAYER_INFO_SUCCESS:
      return {
        ...state,
        activePlayer: action.payload
      }
    case UPDATE_TOURNAMENT_TABLE_SUCCESS: {
      let tables = [...state.activeTournament.tables]
      for (let i = 0; i < tables.length; i++) {
        if (action.payload.id === tables[i].id) {
          tables[i] = { ...tables[i], ...action.payload }
          break
        }
      }
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          tables
        }
      }
    }
    case TOURNAMENT_PLAYER_SWAP_TABLE_SUCCESS: {
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament
        }
      }
    }
    case IMPORT_TOURNAMENT_DETAILS_SUCCESS:
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          ...action.payload
        }
      }
    case UPDATE_BLINDS_SUCCESS:
      const { blindMinutesPerLevel, blinds, blindLevels } = action.payload

      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          blinds,
          blindLevels,
          blindMinutesPerLevel
        }
      }
    case UPDATE_FEE_SUCCESS:
      const { buyIn, numberOfChips } = action.payload
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          buyIn,
          numberOfChips
        }
      }
    case UPDATE_ADJUSTED_SUCCESS:
      const { offsetNumberOfChips, offsetNumberOfActivePlayers, offsetTotalNumberOfPlayers, offsetPrizePool } = action.payload
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          offsetNumberOfChips,
          offsetNumberOfActivePlayers,
          offsetTotalNumberOfPlayers,
          offsetPrizePool
        }
      }
    case UPDATE_TOURNAMENT_INFO_SUCCESS:
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          ...action.payload
        }
      }
    case UPDATE_PRIZES_SUCCESS:
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          prizes: action.payload.prizes
        }
      }
    case CHANGE_TOURNAMENT_PROPRIETIES_SUCCESS: {
      return {
        ...state,
        activeTournament: {
          ...state.activeTournament,
          ...action.payload
        }
      }
    }
    case FETCH_TOURNAMENT:
      return {
        ...state,
        currentTime: action.payload.currentTime,
        loadingTournament: true
      }
    case FETCH_TOURNAMENT_SUCCESS:
      return {
        ...state,
        activeTournament: {
          ...action.payload.tournament,
          currentServerTime: moment(action.payload.tournament.currentServerTime).add(action.payload.currentTime.diff(state.currentTime, 'millisecond'), 'millisecond').toISOString()
        },
        loadingTournament: false
      }

    case FETCH_TOURNAMENT_PLAYERS:
      return {
        ...state,
        loading: true
      }

    case FETCH_TOURNAMENT_PLAYERS_SUCCESS:
      return {
        ...state,
        loading: false,
        players: {
          ...state.players,
          list: {
            ...state.players.list,
            [action.payload.pagination.page]: action.payload.results
          },
          pagination: action.payload.pagination
        }
      }
    case FETCH_TOURNAMENT_WAITING_LIST:
      return {
        ...state,
        waitingList: []
      }

    case FETCH_TOURNAMENT_WAITING_LIST_SUCCESS:
      return {
        ...state,
        waitingList: action.payload.waitingList
      }
    case CHANGE_TOURNAMENT_PLAYERS_PAGE:
      return {
        ...state,
        players: {
          ...state.players,
          pagination: {
            ...state.players.pagination,
            page: action.payload.page
          }
        }
      }
    case CHANGE_TOURNAMENT_PLAYERS_SORT:
      return {
        ...state,
        loading: true,
        players: {
          ...state.players,
          list: {},
          sort: action.payload.sort,
          pagination: {
            page: 1,
            pageSize: 10
          }
        }
      }
    case APPLY_TOURNAMENT_PLAYERS_FILTER:
      return {
        ...state,
        loading: true,
        players: {
          ...state.players,
          filters: {
            ...state.players.filters,
            [action.payload.filter.name]: [action.payload.filter.operator, action.payload.filter.value]
          },
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {}
        }
      }
    case CLEAR_TOURNAMENT_PLAYERS_FILTERS:
      return {
        ...state,
        loading: true,
        players: {
          ...state.players,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: {}
        }
      }
    case REMOVE_TOURNAMENT_PLAYERS_FILTER: {
      let newFilters = {
        ...state.players.filters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        loading: true,
        players: {
          ...state.players,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: { ...newFilters }
        }
      }
    }
    case FETCH_TOURNAMENT_LOGS:
      return {
        ...state,
        loading: true
      }
    case FETCH_TOURNAMENT_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        logs: {
          ...state.logs,
          list: {
            ...state.logs.list,
            [action.payload.pagination.page]: action.payload.results
          },
          pagination: action.payload.pagination
        }
      }
    case CHANGE_TOURNAMENT_LOGS_PAGE:
      return {
        ...state,
        logs: {
          ...state.logs,
          pagination: {
            ...state.logs.pagination,
            page: action.payload.page
          }
        }
      }
    case CHANGE_TOURNAMENT_LOGS_SORT:
      return {
        ...state,
        logs: {
          ...state.logs,
          sort: action.payload.sort,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {}
        }
      }
    case APPLY_TOURNAMENT_LOGS_FILTER:
      return {
        ...state,
        loading: true,
        logs: {
          ...state.logs,
          filters: {
            ...state.logs.filters,
            [action.payload.filter.name]: [action.payload.filter.operator, action.payload.filter.value]
          },
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {}
        }
      }
    case CLEAR_TOURNAMENT_LOGS_FILTERS:
      return {
        ...state,
        loading: true,
        logs: {
          ...state.logs,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: {}
        }
      }
    case REMOVE_TOURNAMENT_LOGS_FILTER: {
      let newFilters = {
        ...state.logs.filters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        loading: true,
        logs: {
          ...state.logs,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: { ...newFilters }
        }
      }
    }
    case FETCH_TOURNAMENT_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      }
    case FETCH_TOURNAMENT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: {
          ...state.notifications,
          list: {
            ...state.notifications.list,
            [action.payload.pagination.page]: action.payload.results
          },
          pagination: action.payload.pagination
        }
      }
    case CHANGE_TOURNAMENT_NOTIFICATIONS_PAGE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          pagination: {
            ...state.notifications.pagination,
            page: action.payload.page
          }
        }
      }
    case CHANGE_TOURNAMENT_NOTIFICATIONS_SORT:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          sort: action.payload.sort,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {}
        }
      }
    case APPLY_TOURNAMENT_NOTIFICATIONS_FILTER:
      return {
        ...state,
        loading: true,
        notifications: {
          ...state.notifications,
          filters: {
            ...state.notifications.filters,
            [action.payload.filter.name]: [action.payload.filter.operator, action.payload.filter.value]
          },
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {}
        }
      }
    case CLEAR_TOURNAMENT_NOTIFICATIONS_FILTERS:
      return {
        ...state,
        loading: true,
        notifications: {
          ...state.notifications,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: {}
        }
      }
    case REMOVE_TOURNAMENT_NOTIFICATIONS_FILTER: {
      let newFilters = {
        ...state.notifications.filters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        loading: true,
        notifications: {
          ...state.notifications,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: { ...newFilters }
        }
      }
    }
    case FETCH_TOURNAMENT_REPORTS_SUCCESS: {
      return {
        ...state,
        reports: {
          ...state.reports,
          list: {
            ...state.reports.list,
            [action.payload.pagination.page]: action.payload.results
          },
          pagination: action.payload.pagination
        }
      }
    }
    case CHANGE_TOURNAMENT_REPORTS_PAGE:
      return {
        ...state,
        reports: {
          ...state.reports,
          pagination: {
            ...state.reports.pagination,
            page: action.payload.page
          }
        }
      }
    case CHANGE_TOURNAMENT_REPORTS_SORT:
      return {
        ...state,
        reports: {
          ...state.reports,
          list: {},
          sort: action.payload.sort,
          pagination: {
            page: 1,
            pageSize: 10
          }
        }
      }
    case APPLY_TOURNAMENT_REPORTS_FILTER:
      return {
        ...state,
        reports: {
          ...state.reports,
          filters: {
            ...state.reports.filters,
            [action.payload.filter.name]: [action.payload.filter.operator, action.payload.filter.value]
          },
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {}
        }
      }
    case CLEAR_TOURNAMENT_REPORTS_FILTERS:
      return {
        ...state,
        reports: {
          ...state.reports,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: {}
        }
      }
    case REMOVE_TOURNAMENT_REPORTS_FILTER: {
      let newFilters = {
        ...state.reports.filters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        reports: {
          ...state.reports,
          pagination: {
            page: 1,
            pageSize: 10
          },
          list: {},
          filters: { ...newFilters }
        }
      }
    }
    case FETCH_TOURNAMENT_STATISTICS:
      return {
        ...state,
        loading: true
      }
    case FETCH_TOURNAMENT_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: {
          ...state.statistics,
          list: action.payload.statistics
        }
      }
    case APPLY_TOURNAMENT_TABLES_FILTER:
      return {
        ...state,
        loading: true,
        tablesFilters: {
          ...state.tablesFilters,
          [action.payload.filter.name]: [action.payload.filter.operator, action.payload.filter.value]
        }
      }
    case CLEAR_TOURNAMENT_TABLES_FILTERS:
      return {
        ...state,
        loading: true,
        tablesFilters: {}
      }
    case REMOVE_TOURNAMENT_TABLES_FILTER: {
      let newFilters = {
        ...state.tablesFilters
      }
      delete newFilters[action.payload]
      return {
        ...state,
        loading: true,
        tablesFilters: { ...newFilters }
      }
    }
    default:
      return state
  }
}

const ActiveTournamentContext = React.createContext()

function ActiveTournamentContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <ActiveTournamentContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ActiveTournamentContext.Provider>
  )
}

const ActiveTournamentContextConsumer = ActiveTournamentContext.Consumer

export { ActiveTournamentContext, ActiveTournamentContextProvider, ActiveTournamentContextConsumer }
