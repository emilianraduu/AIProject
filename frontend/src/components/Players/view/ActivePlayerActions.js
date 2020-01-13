import { API_URL } from '../../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../../helpers/requestHelpers'
import { showSuccess } from '../../Global/Toast'

export const FETCH_PLAYER_SUCCESS = 'FETCH_PLAYER_SUCCESS'
export const FETCH_PLAYER_PLAYERS_SUCCESS = 'FETCH_PLAYER_PLAYERS_SUCCESS'
export const CHANGE_PLAYER_PLAYERS_PAGE = 'CHANGE_PLAYER_PLAYERS_PAGE'
export const FETCH_PLAYER_LOGS_SUCCESS = 'FETCH_PLAYER_LOGS_SUCCESS'
export const CHANGE_PLAYER_LOGS_PAGE = 'CHANGE_PLAYER_LOGS_PAGE'
export const CHANGE_PLAYER_LOGS_SORT = 'CHANGE_PLAYER_LOGS_SORT'
export const APPLY_PLAYER_LOGS_FILTER = 'APPLY_PLAYER_LOGS_FILTER'
export const CLEAR_PLAYER_LOGS_FILTERS = 'CLEAR_PLAYER_LOGS_FILTERS'
export const FETCH_PLAYER_HISTORIES_SUCCESS = 'FETCH_PLAYER_HISTORIES_SUCCESS'
export const CHANGE_PLAYER_HISTORIES_PAGE = 'CHANGE_PLAYER_HISTORIES_PAGE'
export const CHANGE_PLAYER_HISTORIES_SORT = 'CHANGE_PLAYER_HISTORIES_SORT'
export const APPLY_PLAYER_HISTORIES_FILTER = 'APPLY_PLAYER_HISTORIES_FILTER'
export const CLEAR_PLAYER_HISTORIES_FILTERS = 'CLEAR_PLAYER_HISTORIES_FILTERS'
export const FETCH_PLAYER_STATISTICS_SUCCESS = 'FETCH_PLAYER_STATISTICS_SUCCESS'

export const getPlayer = async (authContext, playersContext, playerId = '') => {
  const response = await makeAuthRequest({
    url: `${API_URL}/players/${playerId}`,
    method: 'get'
  })(authContext)
  response && playersContext.dispatch({
    type: FETCH_PLAYER_SUCCESS,
    payload: { player: response.data, playerId }
  })
}

export const getPlayerHistories = async (authContext, playersContext, playerId, page = 1, filters, sort) => {
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
    url: `${API_URL}/players/${playerId}/histories?${query}`,
    method: 'get'
  })(authContext)
  response && playersContext.dispatch({
    type: FETCH_PLAYER_HISTORIES_SUCCESS,
    payload: {
      ...response.data,
      playerId
    }
  })
}

export const UPDATE_TOURNAMENT_PLAYER = 'UPDATE_TOURNAMENT_PLAYER'
export const UPDATE_TOURNAMENT_PLAYER_FAIL = 'UPDATE_TOURNAMENT_PLAYER_FAIL'
export const UPDATE_TOURNAMENT_PLAYER_SUCCESS = 'UPDATE_TOURNAMENT_PLAYER_SUCCESS'

export const updateTournamentPlayerDetails = async ({ authContext, playersContext, activePlayerContext, playerId, data, payment = false, successFunction = ()=>{} }) => {
  activePlayerContext.dispatch({
    type: UPDATE_TOURNAMENT_PLAYER
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/players/${playerId}`,
    method: 'put',
    data
  })(authContext, true)
  if (response) {
    activePlayerContext.dispatch({
      type: UPDATE_TOURNAMENT_PLAYER_SUCCESS,
      payload: {
        activePlayer: response.data,
        ...response.data,
        playerId,
        payment
      }
    })
    showSuccess('Player Payment Confirmed')
    successFunction()
  } else {
    activePlayerContext.dispatch({
      type: UPDATE_PLAYER_DETAILS_FAIL
    })
  }
}

export const changePlayerHistoriesPage = async (playersContext, playerId, page) => {
  playersContext.dispatch({
    type: CHANGE_PLAYER_HISTORIES_PAGE,
    payload: {
      page: page.selected + 1,
      playerId
    }
  })
}
export const changePlayerHistoriesSort = async (playersContext, playerId, sort) => {
  playersContext.dispatch({
    type: CHANGE_PLAYER_HISTORIES_SORT,
    payload: { sort, playerId }
  })
}
export const applyPlayerHistoriesFilter = async (playersContext, playerId, filter) => {
  playersContext.dispatch({
    type: APPLY_PLAYER_HISTORIES_FILTER,
    payload: { filter, playerId }
  })
}
export const clearPlayerHistoriesFilters = async (playersContext, playerId) => {
  playersContext.dispatch({
    type: CLEAR_PLAYER_HISTORIES_FILTERS,
    payload: { playerId }
  })
}

export const getPlayerStatistics = async (authContext, playersContext, tournamentId) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/players/${tournamentId}/statistics`,
    method: 'get'
  })(authContext)
  response && playersContext.dispatch({
    type: FETCH_PLAYER_STATISTICS_SUCCESS,
    payload: response.data
  })
}

export const UPDATE_PLAYER_DETAILS = 'UPDATE_PLAYER_DETAILS'
export const UPDATE_PLAYER_DETAILS_SUCCESS = 'UPDATE_PLAYER_DETAILS_SUCCESS'
export const UPDATE_PLAYER_DETAILS_FAIL = 'UPDATE_PLAYER_DETAILS_FAIL'

export const updatePlayerDetails = async ({ playersContext, playerId, data, authContext }) => {
  playersContext.dispatch({
    type: UPDATE_PLAYER_DETAILS
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/users/${playerId}`,
    method: 'put',
    data
  })(authContext)

  response && playersContext.dispatch({
    type: UPDATE_PLAYER_DETAILS_SUCCESS,
    payload: response.data
  })
  response && showSuccess('Player Updated')
  !response && playersContext.dispatch({
    type: UPDATE_PLAYER_DETAILS_FAIL
  })
}
export const unbustPlayer = async ({ playersContext, playerId, authContext, userId }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/players/${playerId}/unbust`,
    method: 'post'
  })(authContext)
  response && getPlayer(authContext, playersContext, userId)
}
export const deletePlayer = async ({ playersContext, playerId, authContext, userId }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/players/${playerId}`,
    method: 'delete'
  })(authContext)
  response && getPlayer(authContext, playersContext, userId)
}
