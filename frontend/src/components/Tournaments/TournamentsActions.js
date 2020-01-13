import { API_URL } from '../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../helpers/requestHelpers'
import { showSuccess, showError } from '../Global/Toast'
import { createFestival } from '../Festivals/FestivalActions'

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS'
export const CHANGE_TOURNAMENTS_PAGE = 'CHANGE_TOURNAMENTS_PAGE'
export const APPLY_TOURNAMENTS_FILTER = 'APPLY_TOURNAMENTS_FILTER'
export const CHANGE_TOURNAMENTS_SORT = 'CHANGE_TOURNAMENTS_SORT'
export const CLEAR_TOURNAMENTS_FILTERS = 'CLEAR_TOURNAMENTS_FILTERS'
export const REMOVE_TOURNAMENTS_FILTER = 'REMOVE_TOURNAMENTS_FILTER'
export const REMOVE_TOURNAMENTS_SORT = 'REMOVE_TOURNAMENTS_SORT'

export const getTournaments = async ({ authContext, tournamentsContext, page = 1, filters, sort, type }) => {
  tournamentsContext.dispatch({
    type: FETCH_TOURNAMENTS,
    payload: { loading: true }
  })
  const queryParams = {
    page: page,
    ORDER: [sort],
    AND: { ...filters, type: ['=', type] }
  }
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments?${query}`,
    method: 'get'
  })(authContext)
  if (response) {
    tournamentsContext.dispatch({
      type: FETCH_TOURNAMENTS_SUCCESS,
      payload: { data: response.data, loading: false }
    })
  } else {
    tournamentsContext.dispatch({
      type: FETCH_TOURNAMENTS,
      payload: { loading: true }
    })
  }
}
export const changeTournamentsPage = async (tournamentsContext, page) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENTS_PAGE,
    payload: {
      page: page.selected + 1
    }
  })
}
export const applyTournamentsFilter = async (tournamentsContext, filter) => {
  tournamentsContext.dispatch({
    type: APPLY_TOURNAMENTS_FILTER,
    payload: filter
  })
}
export const changeTournamentsSort = async (tournamentsContext, sort) => {
  tournamentsContext.dispatch({
    type: CHANGE_TOURNAMENTS_SORT,
    payload: sort
  })
}
export const clearTournamentsFilters = async (tournamentsContext) => {
  tournamentsContext.dispatch({
    type: CLEAR_TOURNAMENTS_FILTERS
  })
}

export const clearTournamentsSort = async (tournamentsContext) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENTS_SORT
  })
}
export const removeTournamentsFilter = async (tournamentsContext, filterKey) => {
  tournamentsContext.dispatch({
    type: REMOVE_TOURNAMENTS_FILTER,
    payload: filterKey
  })
}

export const saveTournament = async ({ authContext, tournamentsContext, wizzardContext, table, history, tournamentType }) => {
  const { festival, blinds, festivalCreated, fee, details, prize } = wizzardContext.state[tournamentType]
  let createdFestival
  if (festivalCreated) {
    createdFestival = await createFestival({ authContext, data: festival })
  }
  const type = tournamentType === 'tournaments' ? 'tournament' : 'cashGame'
  let data = {
    tournament: {
      type,
      festival: (createdFestival && createdFestival.id) || festival.name.value,
      blinds: blinds.blinds,
      ...details,
      ...table,
      ...fee,
      availableSeats: table.availableSeats.value
    }
  }
  if (tournamentType === 'tournaments') {
    data = {
      tournament: {
        ...data.tournament,
        prizes: prize.prizes,
        blindMinutesPerLevel: blinds.blindMinutesPerLevel.value
      }
    }
  }
  createTournament({
    authContext,
    tournamentsContext,
    wizzardContext,
    history,
    type,
    tournamentType,
    data
  })
}

export const CREATE_TOURNAMENT = 'CREATE_TOURNAMENT'
export const CREATE_TOURNAMENT_SUCCESS = 'CREATE_TOURNAMENT_SUCCESS'
export const CREATE_TOURNAMENT_FAIL = 'CREATE_TOURNAMENT_FAIL'

export const createTournament = async ({ authContext, tournamentsContext, data, history, type, wizzardContext, tournamentType }) => {
  tournamentsContext.dispatch({
    type: CREATE_TOURNAMENT
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments`,
    method: 'post',
    data: {
      ...data
    }
  })(authContext)
  response && tournamentsContext.dispatch({
    type: CREATE_TOURNAMENT_SUCCESS,
    payload: response.data
  })
  response && wizzardContext.dispatch({
    type: CREATE_TOURNAMENT_SUCCESS,
    payload: response.data,
    tournamentType
  })
  if (response && response.data.id) {
    showSuccess('Tournament created')
    history.push(`/${tournamentType}/${response.data.id}`)
  }
}

export const MAKE_TOURNAMENT_VISIBLE = 'MAKE_TOURNAMENT_VISIBLE'
export const MAKE_TOURNAMENT_VISIBLE_SUCCESS = 'MAKE_TOURNAMENT_VISIBLE_SUCCESS'
export const MAKE_TOURNAMENT_VISIBLE_FAIL = 'MAKE_TOURNAMENT_VISIBLE_FAIL'

export const makeTournamentVisible = async ({ authContext, tournamentId, tournamentsContext, status }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/tournaments/${tournamentId}`,
    method: 'put',
    data: {
      tournament: {
        status
      }
    }
  })(authContext, true)
}
