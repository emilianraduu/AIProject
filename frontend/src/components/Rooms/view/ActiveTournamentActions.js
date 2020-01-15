import { API_URL } from '../../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../../helpers/requestHelpers'
import { showSuccess } from '../../Global/Toast'
import moment from 'moment'

export const FETCH_TOURNAMENT = 'FETCH_TOURNAMENT'
export const FETCH_TOURNAMENT_SUCCESS = 'FETCH_TOURNAMENT_SUCCESS'
export const getTournament = async (authContext, tournamentsContext, tournamentId = '') => {
  tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT,
    payload: { currentTime: moment() }
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_SUCCESS,
    payload: { tournament: response.data, tournamentId, currentTime: moment() }
  })

}

export const FETCH_TOURNAMENT_PLAYERS_SUCCESS = 'FETCH_TOURNAMENT_PLAYERS_SUCCESS'
export const FETCH_TOURNAMENT_PLAYERS = 'FETCH_TOURNAMENT_PLAYERS'
export const FETCH_TOURNAMENT_WAITING_LIST = 'FETCH_TOURNAMENT_WAITING_LIST'
export const FETCH_TOURNAMENT_WAITING_LIST_SUCCESS = 'FETCH_TOURNAMENT_WAITING_LIST_SUCCESS'
export const CHANGE_TOURNAMENT_PLAYERS_PAGE = 'CHANGE_TOURNAMENT_PLAYERS_PAGE'
export const CHANGE_TOURNAMENT_PLAYERS_SORT = 'CHANGE_TOURNAMENT_PLAYERS_SORT'
export const APPLY_TOURNAMENT_PLAYERS_FILTER = 'APPLY_TOURNAMENT_PLAYERS_FILTER'
export const CLEAR_TOURNAMENT_PLAYERS_FILTERS = 'CLEAR_TOURNAMENT_PLAYERS_FILTERS'
export const REMOVE_TOURNAMENT_PLAYERS_FILTER = 'REMOVE_TOURNAMENT_PLAYERS_FILTER'
export const getTournamentPlayers = async (authContext, tournamentsContext, tournamentId, page = 1, filters, sort) => {
  tournamentsContext.dispatch({
    FETCH_TOURNAMENT_PLAYERS
  })
  const queryParams = {
    page: page
  }
  if (sort) {
    queryParams.ORDER = [sort]
  }
  if (filters) {
    queryParams.AND = filters
  }
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/players?${query}`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_PLAYERS_SUCCESS,
    payload: {
      ...response.data,
      tournamentId
    }
  })
}
export const getWaitingList = async (authContext, tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    FETCH_TOURNAMENT_WAITING_LIST
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/players?AND[0][0]=players.status&AND[0][1]==&AND[0][2]=waiting&waitingList=1&ORDER[0][0]=players.createdAt&ORDER[0][1]=ASC`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_WAITING_LIST_SUCCESS,
    payload: {
      waitingList: response.data,
      tournamentId
    }
  })
}
export const assignEveryone = async (authContext, tournamentsContext, tournamentId) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/assign-waiting`,
    method: 'post'
  })(authContext)
  // response && await getWaitingList(authContext, tournamentsContext, tournamentId)
}
export const changeTournamentPlayersPage = async (tournamentsContext, tournamentId, page) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_PLAYERS_PAGE,
    payload: {
      page: page.selected + 1,
      tournamentId
    }
  })
}
export const changeTournamentPlayersSort = async (tournamentsContext, tournamentId, sort) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_PLAYERS_SORT,
    payload: { sort, tournamentId }
  })
}
export const applyTournamentPlayersFilter = async (tournamentsContext, tournamentId, filter) => {
  tournamentsContext.dispatch({
    type: APPLY_TOURNAMENT_PLAYERS_FILTER,
    payload: { filter, tournamentId }
  })
}
export const clearTournamentPlayersFilters = async (tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    type: CLEAR_TOURNAMENT_PLAYERS_FILTERS,
    payload: { tournamentId }
  })
}
export const removeTournamentPlayersFilter = async (tournamentsContext, filterKey) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENT_PLAYERS_FILTER,
    payload: filterKey
  })
}
export const FETCH_TOURNAMENT_LOGS_SUCCESS = 'FETCH_TOURNAMENT_LOGS_SUCCESS'
export const FETCH_TOURNAMENT_LOGS = 'FETCH_TOURNAMENT_LOGS'
export const CHANGE_TOURNAMENT_LOGS_PAGE = 'CHANGE_TOURNAMENT_LOGS_PAGE'
export const CHANGE_TOURNAMENT_LOGS_SORT = 'CHANGE_TOURNAMENT_LOGS_SORT'
export const APPLY_TOURNAMENT_LOGS_FILTER = 'APPLY_TOURNAMENT_LOGS_FILTER'
export const CLEAR_TOURNAMENT_LOGS_FILTERS = 'CLEAR_TOURNAMENT_LOGS_FILTERS'
export const REMOVE_TOURNAMENT_LOGS_FILTER = 'REMOVE_TOURNAMENT_LOGS_FILTER'
export const getTournamentLogs = async (authContext, tournamentsContext, tournamentId, page = 1, filters, sort) => {
  tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_LOGS
  })
  const queryParams = {
    page: page
  }
  if (sort) {
    queryParams.ORDER = [sort]
  }
  if (filters) {
    queryParams.AND = filters
  }
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/logs?${query}`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_LOGS_SUCCESS,
    payload: {
      ...response.data,
      tournamentId
    }
  })
}
export const changeTournamentLogsPage = async (tournamentsContext, tournamentId, page) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_LOGS_PAGE,
    payload: {
      page: page.selected + 1,
      tournamentId
    }
  })
}
export const changeTournamentLogsSort = async (tournamentsContext, tournamentId, sort) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_LOGS_SORT,
    payload: { sort, tournamentId }
  })
}
export const applyTournamentLogsFilter = async (tournamentsContext, tournamentId, filter) => {
  tournamentsContext.dispatch({
    type: APPLY_TOURNAMENT_LOGS_FILTER,
    payload: { filter, tournamentId }
  })
}
export const clearTournamentLogsFilters = async (tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    type: CLEAR_TOURNAMENT_LOGS_FILTERS,
    payload: { tournamentId }
  })
}
export const removeTournamentLogsFilter = async (tournamentsContext, filterKey) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENT_LOGS_FILTER,
    payload: filterKey
  })
}
export const FETCH_TOURNAMENT_NOTIFICATIONS_SUCCESS = 'FETCH_TOURNAMENT_NOTIFICATIONS_SUCCESS'
export const FETCH_TOURNAMENT_NOTIFICATIONS = 'FETCH_TOURNAMENT_NOTIFICATIONS'
export const CHANGE_TOURNAMENT_NOTIFICATIONS_PAGE = 'CHANGE_TOURNAMENT_NOTIFICATIONS_PAGE'
export const CHANGE_TOURNAMENT_NOTIFICATIONS_SORT = 'CHANGE_TOURNAMENT_NOTIFICATIONS_SORT'
export const APPLY_TOURNAMENT_NOTIFICATIONS_FILTER = 'APPLY_TOURNAMENT_NOTIFICATIONS_FILTER'
export const CLEAR_TOURNAMENT_NOTIFICATIONS_FILTERS = 'CLEAR_TOURNAMENT_NOTIFICATIONS_FILTERS'
export const REMOVE_TOURNAMENT_NOTIFICATIONS_FILTER = 'REMOVE_TOURNAMENT_NOTIFICATIONS_FILTER'
export const CREATE_TOURNAMENT_NOTIFICATION = 'CREATE_TOURNAMENT_NOTIFICATION'
export const CREATE_TOURNAMENT_NOTIFICATION_SUCCESS = 'CREATE_TOURNAMENT_NOTIFICATION_SUCCESS'
export const getTournamentNotifications = async (authContext, tournamentsContext, tournamentId, page = 1, filters, sort) => {
  const queryParams = {
    page: page
  }
  tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_NOTIFICATIONS
  })
  if (sort) {
    queryParams.ORDER = [sort]
  }
  if (filters) {
    queryParams.AND = filters
  }
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/notifications?${query}`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_NOTIFICATIONS_SUCCESS,
    payload: {
      ...response.data,
      tournamentId
    }
  })
}
export const changeTournamentNotificationsPage = async (tournamentsContext, tournamentId, page) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_NOTIFICATIONS_PAGE,
    payload: {
      page: page.selected + 1,
      tournamentId
    }
  })
}
export const changeTournamentNotificationsSort = async (tournamentsContext, tournamentId, sort) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_NOTIFICATIONS_SORT,
    payload: { sort, tournamentId }
  })
}
export const applyTournamentNotificationsFilter = async (tournamentsContext, tournamentId, filter) => {
  tournamentsContext.dispatch({
    type: APPLY_TOURNAMENT_NOTIFICATIONS_FILTER,
    payload: { filter, tournamentId }
  })
}
export const clearTournamentNotificationsFilters = async (tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    type: CLEAR_TOURNAMENT_NOTIFICATIONS_FILTERS,
    payload: { tournamentId }
  })
}
export const removeTournamentNotificationsFilter = async (tournamentsContext, filterKey) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENT_NOTIFICATIONS_FILTER,
    payload: filterKey
  })
}
export const createTournamentNotification = async ({ authContext, tournamentsContext, tournamentId, data, history }) => {
  tournamentsContext.dispatch({
    type: CREATE_TOURNAMENT_NOTIFICATION
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/notifications`,
    method: 'post',
    data
  })(authContext)
  response && tournamentsContext.dispatch({
    type: CREATE_TOURNAMENT_NOTIFICATION_SUCCESS,
    payload: response.data
  })
  if (response && response.data.id) {
    showSuccess('Notification created')
    history.push(`/tournaments/${tournamentId}/notifications`)
  }
}
export const FETCH_TOURNAMENT_REPORTS_SUCCESS = 'FETCH_TOURNAMENT_REPORTS_SUCCESS'
export const CHANGE_TOURNAMENT_REPORTS_PAGE = 'CHANGE_TOURNAMENT_REPORTS_PAGE'
export const CHANGE_TOURNAMENT_REPORTS_SORT = 'CHANGE_TOURNAMENT_REPORTS_SORT'
export const APPLY_TOURNAMENT_REPORTS_FILTER = 'APPLY_TOURNAMENT_REPORTS_FILTER'
export const CLEAR_TOURNAMENT_REPORTS_FILTERS = 'CLEAR_TOURNAMENT_REPORTS_FILTERS'
export const REMOVE_TOURNAMENT_REPORTS_FILTER = 'REMOVE_TOURNAMENT_REPORTS_FILTER'
export const getTournamentReports = async (authContext, tournamentsContext, tournamentId, page = 1, filters, sort) => {
  const queryParams = {
    page: page
  }
  if (sort) {
    queryParams.ORDER = [sort]
  }
  if (filters) {
    queryParams.AND = filters
  }
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/reports?${query}`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_REPORTS_SUCCESS,
    payload: {
      ...response.data,
      tournamentId
    }
  })
}
export const changeTournamentReportsPage = async (tournamentsContext, tournamentId, page) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_REPORTS_PAGE,
    payload: {
      page: page.selected + 1,
      tournamentId
    }
  })
}
export const changeTournamentReportsSort = async (tournamentsContext, tournamentId, sort) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_REPORTS_SORT,
    payload: { sort, tournamentId }
  })
}
export const applyTournamentReportsFilter = async (tournamentsContext, tournamentId, filter) => {
  tournamentsContext.dispatch({
    type: APPLY_TOURNAMENT_REPORTS_FILTER,
    payload: { filter, tournamentId }
  })
}
export const clearTournamentReportsFilters = async (tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    type: CLEAR_TOURNAMENT_REPORTS_FILTERS,
    payload: { tournamentId }
  })
}
export const removeTournamentReportsFilter = async (tournamentsContext, filterKey) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENT_REPORTS_FILTER,
    payload: filterKey
  })
}

export const FETCH_TOURNAMENT_STATISTICS_SUCCESS = 'FETCH_TOURNAMENT_STATISTICS_SUCCESS'
export const FETCH_TOURNAMENT_STATISTICS = 'FETCH_TOURNAMENT_STATISTICS'
export const getTournamentStatistics = async (authContext, tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_STATISTICS
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/statistics`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: FETCH_TOURNAMENT_STATISTICS_SUCCESS,
    payload: { statistics: response.data, tournamentId }
  })
}

export const CREATE_TOURNAMENT_PLAYER = 'CREATE_TOURNAMENT_PLAYER'
export const CREATE_TOURNAMENT_PLAYER_SUCCESS = 'CREATE_TOURNAMENT_PLAYER_SUCCESS'
export const CREATE_TOURNAMENT_PLAYER_FAIL = 'CREATE_TOURNAMENT_PLAYER_FAIL'

export const CREATE_TOURNAMENT_USER = 'CREATE_TOURNAMENT_USER'
export const CREATE_TOURNAMENT_USER_SUCCESS = 'CREATE_TOURNAMENT_USER_SUCCESS'
export const CREATE_TOURNAMENT_USER_FAIL = 'CREATE_TOURNAMENT_USER_FAIL'

export const createTournamentUser = async ({ authContext, usersContext, tournamentsContext, tournamentId, data, history }) => {
  tournamentsContext.dispatch({
    type: CREATE_TOURNAMENT_USER
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/users`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })(authContext)
  if (response) {
    tournamentsContext.dispatch({
      type: CREATE_TOURNAMENT_USER_SUCCESS,
      payload: response.data
    })
  }
  if (response && response.data.id) {
    createTournamentPlayer({ authContext, tournamentsContext, tournamentId, userId: response.data.id, history })
  }
}
export const createTournamentPlayer = async ({ authContext, tournamentsContext, tournamentId, userId, history }) => {
  tournamentsContext.dispatch({
    type: CREATE_TOURNAMENT_PLAYER
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/players`,
    method: 'post',
    data: {
      user: userId
    }
  })(authContext, true)
  if (response && response.status === 200) {
    tournamentsContext.dispatch({
      type: CREATE_TOURNAMENT_PLAYER_SUCCESS,
      payload: response.data
    })
    history.push(`/tournaments/${tournamentId}/players/create/${response.data.id}`)
  } else {
    tournamentsContext.dispatch({
      type: CREATE_TOURNAMENT_PLAYER_FAIL
    })
  }
}

export const updateTournament = ({ tournamentId, data, authContext }) => makeAuthRequest({
  url: `${API_URL}/tournaments/${tournamentId}`,
  method: 'put',
  data: { tournament: data }
})(authContext, true)

export const UPDATE_PRIZES_SUCCESS = 'UPDATE_PRIZES_SUCCESS'
export const updatePrizes = async ({ authContext, tournamentsContext, successFunction, data }) => {
  const { dispatch } = tournamentsContext
  const tournamentId = tournamentsContext.state.activeTournament.id
  const response = await updateTournament({ tournamentId, data, authContext })
  showSuccess('Prizes updated')
  dispatch({
    type: UPDATE_PRIZES_SUCCESS,
    payload: response.data
  })
  if (successFunction) {
    successFunction()
  }
}

export const UPDATE_GAME_RULES_SUCCESS = 'UPDATE_GAME_RULES_SUCCESS'
export const updateGameRules = async ({ authContext, tournamentsContext, successFunction, data }) => {
  const { dispatch } = tournamentsContext
  const tournamentId = tournamentsContext.state.activeTournament.id
  const response = await updateTournament({ tournamentId, data, authContext })
  showSuccess('Game rules updated')
  dispatch({
    type: UPDATE_GAME_RULES_SUCCESS,
    payload: response.data
  })
  if (successFunction) {
    successFunction()
  }
}

export const CHANGE_TOURNAMENT_PROPRIETIES = 'CHANGE_TOURNAMENT_PROPRIETIES'
export const CHANGE_TOURNAMENT_PROPRIETIES_SUCCESS = 'CHANGE_TOURNAMENT_PROPRIETIES_SUCCESS'
export const CHANGE_TOURNAMENT_PROPRIETIES_FAIL = 'CHANGE_TOURNAMENT_PROPRIETIES_FAIL'

export const updateTournamentTableProps = async ({ authContext, tournamentsContext, data, tournamentId, successFunction }) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_PROPRIETIES
  })
  const response = await updateTournament({ tournamentId, data, authContext })
  response && tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENT_PROPRIETIES_SUCCESS,
    payload: response.data
  })
  if (response && response.data.id) {
    showSuccess('Tournament table proprieties updated')
  }

  if (!response) {
    tournamentsContext.dispatch({
      type: CHANGE_TOURNAMENT_PROPRIETIES_FAIL
    })
  }
  if (successFunction) {
    successFunction()
  }
}

export const UPDATE_TOURNAMENT_INFO_SUCCESS = 'UPDATE_TOURNAMENT_INFO_SUCCESS'
export const updateTournamentInfo = async ({ authContext, tournamentsContext, successFunction, data }) => {
  const { dispatch } = tournamentsContext
  const tournamentId = tournamentsContext.state.activeTournament.id
  const response = await updateTournament({ tournamentId, data, authContext })
  if (response) {
    showSuccess('Info updated')
    dispatch({
      type: UPDATE_TOURNAMENT_INFO_SUCCESS,
      payload: response.data
    })
    if (successFunction) {
      successFunction()
    }
  }
}

export const UPDATE_BLINDS_SUCCESS = 'UPDATE_BLINDS_SUCCESS'
export const updateBlinds = async ({ authContext, tournamentsContext, successFunction, data }) => {
  const { dispatch } = tournamentsContext
  const tournamentId = tournamentsContext.state.activeTournament.id
  const response = await updateTournament({ tournamentId, data, authContext })
  if (response) {
    showSuccess('Blinds details updated')
    dispatch({
      type: UPDATE_BLINDS_SUCCESS,
      payload: response.data
    })
    if (successFunction) {
      successFunction()
    }
  }
}
export const UPDATE_FEE_SUCCESS = 'UPDATE_FEE_SUCCESS'
export const updateFee = async ({ authContext, tournamentsContext, successFunction, data }) => {
  const { dispatch } = tournamentsContext
  const tournamentId = tournamentsContext.state.activeTournament.id
  const response = await updateTournament({ tournamentId, data, authContext })
  if (response) {
    showSuccess('Fee details updated')
    dispatch({
      type: UPDATE_FEE_SUCCESS,
      payload: response.data
    })
    if (successFunction) {
      successFunction()
    }
  }
}
export const UPDATE_ADJUSTED_SUCCESS = 'UPDATE_ADJUSTED_SUCCESS'
export const updateAdjusted = async ({ authContext, tournamentsContext, successFunction, data }) => {
  const { dispatch } = tournamentsContext
  const tournamentId = tournamentsContext.state.activeTournament.id
  const response = await updateTournament({ tournamentId, data, authContext })
  if (response) {
    showSuccess('Adjust details updated')
    dispatch({
      type: UPDATE_ADJUSTED_SUCCESS,
      payload: response.data
    })
    if (successFunction) {
      successFunction()
    }
  }
}
export const IMPORT_TOURNAMENT_DETAILS_SUCCESS = 'IMPORT_TOURNAMENT_DETAILS_SUCCESS'
export const importTournamentDetails = async ({ authContext, tournamentsContext, successFunction, data, tournamentType }) => {
  const { dispatch } = tournamentsContext
  const {
    data: {
      numberOfTables,
      buyIn,
      blinds,
      prizes,
      blindMinutesPerLevel,
      blindLevels,
      numberOfChips,
      festival,
      availableSeats
    }
  } = await makeAuthRequest({
    url: `${API_URL}/tournaments/${data.tournament.value}`,
    method: 'get'
  })(authContext)
  // const tournamentId = tournamentsContext.state.activeTournament.id
  let importedData = {}
  const { importAll, importTable, importBlinds, importFee, importPrizes, importFestival, importGameRules } = data
  if (importAll || importTable) {
    importedData = {
      ...importedData,
      numberOfTables,
      availableSeats
    }
  }
  if (importAll || importBlinds) {
    importedData = {
      ...importedData,
      blinds: [...blinds].sort((a, b) => {
        if (a.order > b.order) {
          return 1
        }
        if (a.order < b.order) {
          return -1
        }
        return 0
      }),
      blindMinutesPerLevel,
      blindLevels
    }
  }
  if (importAll || importFestival) {
    importedData = {
      ...importedData,
      festival
    }
  }
  if (importAll || importPrizes) {
    importedData = {
      ...importedData,
      prizes
    }
  }
  if (importAll || importGameRules) {
    importedData = {
      ...importedData
    }
  }
  if (importAll || importFee) {
    importedData = {
      ...importedData,
      buyIn,
      numberOfChips
    }
  }
  dispatch({ type: IMPORT_TOURNAMENT_DETAILS_SUCCESS, payload: importedData, tournamentType })
  if (successFunction) {
    successFunction()
  }
  // const response = await updateTournament({ tournamentId, data: importedData, authContext })
  // if (response) {
  //   showSuccess(`Successfuly imported information from ${name}`)
  //   dispatch({
  //     type: IMPORT_TOURNAMENT_DETAILS_SUCCESS,
  //     payload: response.data
  //   })
  //   if (successFunction) {
  //     successFunction()
  //   }
  // }
}

export const UPDATE_TOURNAMENT_TABLE = 'UPDATE_TOURNAMENT_TABLE'
export const UPDATE_TOURNAMENT_TABLE_FAIL = 'UPDATE_TOURNAMENT_TABLE_FAIL'
export const UPDATE_TOURNAMENT_TABLE_SUCCESS = 'UPDATE_TOURNAMENT_TABLE_SUCCESS'

export const addCustomTable = async ({ data, authContext, tournamentId, successFunction }) => {
  let response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/tables`,
    method: 'post',
    data
  })
  (authContext, true)
  response && successFunction()
}
export const updateTable = async ({ tableId, data, authContext, tournamentContext }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/tables/${tableId}`,
    method: 'put',
    data: { table: data }
  })
  (authContext, true)
  if (response) {
    tournamentContext && tournamentContext.dispatch({
      type: UPDATE_TOURNAMENT_TABLE_SUCCESS,
      payload: response.data
    })
    tournamentContext && showSuccess('Table updated')
  }
}
export const DELETE_TABLE_SUCCESS = 'DELETE_TABLE_SUCCESS'

export const deleteTable = async ({ tableId, authContext, tournamentContext }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/tables/${tableId}`,
    method: 'delete'
  })
  (authContext, true)
  if (response) {
    tournamentContext && tournamentContext.dispatch({
      type: DELETE_TABLE_SUCCESS,
      payload: tableId
    })
    tournamentContext && showSuccess('Table deleted')
  }
}

export const updateTableProps = async ({ authContext, tournamentContext, data, tableId, successFunction }) => {
  tournamentContext.dispatch({
    type: UPDATE_TOURNAMENT_TABLE
  })
  const response = await updateTable({ tableId, data, authContext })
  response && tournamentContext.dispatch({
    type: UPDATE_TOURNAMENT_TABLE_SUCCESS,
    payload: response.data
  })
  if (response && response.data.id) {
    showSuccess('Table updated')
  }

  if (!response) {
    tournamentContext.dispatch({
      type: UPDATE_TOURNAMENT_TABLE_FAIL
    })
  }
  if (successFunction) {
    successFunction()
  }
}

export const TOURNAMENT_PLAYER_SWAP_TABLE = 'TOURNAMENT_PLAYER_SWAP_TABLE'
export const TOURNAMENT_PLAYER_SWAP_TABLE_FAIL = 'TOURNAMENT_PLAYER_SWAP_TABLE_FAIL'
export const TOURNAMENT_PLAYER_SWAP_TABLE_SUCCESS = 'TOURNAMENT_PLAYER_SWAP_TABLE_SUCCESS'

export const playerSwap = async ({ tableId, playerId, tournamentsContext, authContext, seatNo, swapPlayerId }) => {
  tournamentsContext.dispatch({
    type: TOURNAMENT_PLAYER_SWAP_TABLE
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tables/${tableId}/players/${playerId}`,
    method: 'put',
    data: { seatNo, swap: swapPlayerId !== 'newPlayer' }
  })(authContext)
  response && tournamentsContext.dispatch({
    type: TOURNAMENT_PLAYER_SWAP_TABLE_SUCCESS
  })
  response && showSuccess('Player Moved')
  !response && tournamentsContext.dispatch({
    type: TOURNAMENT_PLAYER_SWAP_TABLE_FAIL
  })
}

export const TOURNAMENT_PLAYER_DELETE_TABLE = 'TOURNAMENT_PLAYER_DELETE_TABLE'
export const TOURNAMENT_PLAYER_DELETE_TABLE_FAIL = 'TOURNAMENT_PLAYER_DELETE_TABLE_FAIL'
export const TOURNAMENT_PLAYER_DELETE_TABLE_SUCCESS = 'TOURNAMENT_PLAYER_DELETE_TABLE_SUCCESS'

export const kickPlayer = async ({ tableId, playerId, tournamentsContext, authContext, kicked = false }) => {
  tournamentsContext.dispatch({
    type: TOURNAMENT_PLAYER_DELETE_TABLE
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tables/${tableId}/players/${playerId}`,
    method: 'delete',
    data: { kicked: kicked }
  })(authContext)
  response && tournamentsContext.dispatch({
    type: TOURNAMENT_PLAYER_DELETE_TABLE_SUCCESS,
    payload: {
      ...response.data,
      playerId
    }
  })
  response && showSuccess(`Player ${kicked ? 'Kicked' : 'Unseated'}`)
  !response && tournamentsContext.dispatch({
    type: TOURNAMENT_PLAYER_DELETE_TABLE_FAIL
  })
}

export const APPLY_TOURNAMENT_TABLES_FILTER = 'APPLY_TOURNAMENT_TABLES_FILTER'
export const CLEAR_TOURNAMENT_TABLES_FILTERS = 'CLEAR_TOURNAMENT_TABLES_FILTERS'
export const REMOVE_TOURNAMENT_TABLES_FILTER = 'REMOVE_TOURNAMENT_TABLES_FILTER'
export const applyTournamentTablesFilter = async (tournamentsContext, tournamentId, filter) => {
  tournamentsContext.dispatch({
    type: APPLY_TOURNAMENT_TABLES_FILTER,
    payload: { filter, tournamentId }
  })
}
export const clearTournamentTablesFilters = async (tournamentsContext, tournamentId) => {
  tournamentsContext.dispatch({
    type: CLEAR_TOURNAMENT_TABLES_FILTERS,
    payload: { tournamentId }
  })
}
export const removeTournamentTablesFilter = async (tournamentsContext, filterKey) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENT_TABLES_FILTER,
    payload: filterKey
  })
}

export const GET_TOURNAMENT_PLAYER_INFO = 'GET_TOURNAMENT_PLAYER_INFO'
export const GET_TOURNAMENT_PLAYER_INFO_SUCCESS = 'GET_TOURNAMENT_PLAYER_INFO_SUCCESS'
export const GET_TOURNAMENT_PLAYER_INFO_FAIL = 'GET_TOURNAMENT_PLAYER_INFO_FAIL'

export const getTournamentPlayerInfo = async ({ tournamentsContext, playerId, authContext }) => {
  tournamentsContext.dispatch({
    type: GET_TOURNAMENT_PLAYER_INFO
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournament-players/${playerId}`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: GET_TOURNAMENT_PLAYER_INFO_SUCCESS,
    payload: response.data
  })
  !response && tournamentsContext.dispatch({
    type: GET_TOURNAMENT_PLAYER_INFO_FAIL
  })
}


export const GET_TOURNAMENT_TABLES = 'GET_TOURNAMENT_TABLES'
export const GET_TOURNAMENT_TABLES_SUCCESS = 'GET_TOURNAMENT_TABLES_SUCCESS'
export const GET_TOURNAMENT_TABLES_FAIL = 'GET_TOURNAMENT_TABLES_FAIL'

export const getTournamentTables = async ({ tournamentsContext, tournamentId, authContext }) => {
  tournamentsContext.dispatch({
    type: GET_TOURNAMENT_TABLES
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}/tables`,
    method: 'get'
  })(authContext)
  response && tournamentsContext.dispatch({
    type: GET_TOURNAMENT_TABLES_SUCCESS,
    payload: response.data
  })
  !response && tournamentsContext.dispatch({
    type: GET_TOURNAMENT_TABLES_FAIL
  })
}
