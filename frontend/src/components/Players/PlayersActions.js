import { API_URL } from '../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../helpers/requestHelpers'

export const FETCH_PLAYERS = 'FETCH_PLAYERS'
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS'
export const CHANGE_PLAYERS_PAGE = 'CHANGE_PLAYERS_PAGE'
export const APPLY_PLAYERS_FILTER = 'APPLY_PLAYERS_FILTER'
export const CHANGE_PLAYERS_SORT = 'CHANGE_PLAYERS_SORT'
export const CLEAR_PLAYERS_FILTERS = 'CLEAR_PLAYERS_FILTERS'
export const REMOVE_PLAYERS_FILTER = 'REMOVE_PLAYERS_FILTER'
export const FETCH_PLAYER_STATISTICS_SUCCESS = 'FETCH_PLAYER_STATISTICS_SUCCESS'
export const CLEAR_PLAYERS_SORT = 'CLEAR_PLAYERS_SORT'
export const getPlayers = async (authContext, playersContext, page = 1, filters, sort, isMobile) => {
  playersContext.dispatch({
    type: FETCH_PLAYERS
  })
  const queryParams = {
    page: page,
    ORDER: [sort],
    AND: filters
  }
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/users?${query}`,
    method: 'get'
  })(authContext)
  response && playersContext.dispatch({
    type: FETCH_PLAYERS_SUCCESS,
    payload: response.data,
    isMobile
  })
}

export const FETCH_PLAYER_SUCCESS = 'FETCH_PLAYER_SUCCESS'
export const FETCH_PLAYER = 'FETCH_PLAYERS'
export const FETCH_PLAYER_FAIL = 'FETCH_PLAYER_FAIL'

export const getPlayer = async ({ authContext, activePlayerContext, playerID }) => {
  activePlayerContext.dispatch({
    type: FETCH_PLAYER
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/users/${playerID}`,
    method: 'get'
  })(authContext)
  if (response && response.status === 200) {
    activePlayerContext.dispatch({
      type: FETCH_PLAYER_SUCCESS,
      payload: response.data
    })
  } else {
    activePlayerContext.dispatch({
      type: FETCH_PLAYER_FAIL
    })
  }
}

export const changePlayersPage = async (playersContext, page) => {
  playersContext.dispatch({
    type: CHANGE_PLAYERS_PAGE,
    payload: {
      page: page.selected + 1
    }
  })
}
export const applyPlayersFilter = async (playersContext, filter) => {
  playersContext.dispatch({
    type: APPLY_PLAYERS_FILTER,
    payload: filter
  })
}
export const changePlayersSort = async (playersContext, sort) => {
  playersContext.dispatch({
    type: CHANGE_PLAYERS_SORT,
    payload: sort
  })
}
export const clearPlayersFilters = async (playersContext) => {
  playersContext.dispatch({
    type: CLEAR_PLAYERS_FILTERS
  })
}
export const clearPlayersSort = async (playersContext) => {
  playersContext.dispatch({
    type: CLEAR_PLAYERS_SORT
  })
}
export const removePlayersFilter = async (playersContext, filterKey) => {
  playersContext.dispatch({
    type: REMOVE_PLAYERS_FILTER,
    payload: filterKey
  })
}
