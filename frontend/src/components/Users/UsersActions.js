import { API_URL } from '../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../helpers/requestHelpers'
import { CHANGE_TOURNAMENTS_PAGE } from '../Tournaments/TournamentsActions'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL'
export const CHANGE_USERS_PAGE = 'CHANGE_USERS_PAGE'
export const APPLY_USERS_FILTER = 'APPLY_USERS_FILTER'
export const getUsers = async (authContext, usersContext, page = 1, filters) => {
  const queryParams = {
    page: page,
    AND: filters
  }
  page === 1 &&
  usersContext.dispatch({
    type: FETCH_USERS
  })
  const query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/users?${query}`,
    method: 'get'
  })(authContext)
  response && usersContext.dispatch({
    type: FETCH_USERS_SUCCESS,
    payload: response.data
  })
}

export const getUserById = async ({ authContext, usersContext, userId = '' }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/users/${userId}`,
    method: 'get'
  })(authContext)
  response && usersContext.dispatch({
    type: FETCH_USER_SUCCESS,
    payload: { user: response.data }
  })
}
export const getUserByIdentityNumber = async (authContext, usersContext, identityNumber = '') => {
  const response = await makeAuthRequest({
    url: `${API_URL}/users/identityNumber/${identityNumber}`,
    method: 'get'
  })(authContext, false)
  if (response) {
    usersContext.dispatch({
      type: FETCH_USER_SUCCESS,
      payload: { user: response.data }
    })
  } else {
    usersContext.dispatch({
      type: FETCH_USER_FAIL
    })
  }
}

export const getUserByFullname = async ({ authContext, usersContext, fullname = '', tournamentID }) => {
  usersContext.dispatch({
    type: FETCH_USERS

  })
  const response = await makeAuthRequest({
    url: `${API_URL}/users/fullname/${fullname}`,
    method: 'get'
  })(authContext, false)
  if (response) {
    usersContext.dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data,
      keep: !!fullname
    })
  } else {
    // usersContext.dispatch({
    //   // type: FETCH_USER_FAIL
    // })
  }
}

export const changeUsersPage = async (usersContext, page) => {
  usersContext.dispatch({
    type: CHANGE_USERS_PAGE,
    payload: {
      page: page.selected + 1
    }
  })
}
export const applyUsersFilter = async (usersContext, filter) => {
  usersContext.dispatch({
    type: APPLY_USERS_FILTER,
    payload: filter
  })
}

export const CHANGE_USERS_SORT = 'CHANGE_USERS_SORT'
export const CLEAR_USERS_FILTERS = 'CLEAR_USERS_FILTERS'
export const REMOVE_USERS_FILTER = 'REMOVE_USERS_FILTER'
export const FETCH_USER_STATISTICS_SUCCESS = 'FETCH_USER_STATISTICS_SUCCESS'
export const CLEAR_USERS_SORT = 'CLEAR_USERS_SORT'

export const changeUsersSort = async (usersContext, sort) => {
  usersContext.dispatch({
    type: CHANGE_USERS_SORT,
    payload: sort
  })
}
export const clearUsersFilters = async (usersContext) => {
  usersContext.dispatch({
    type: CLEAR_USERS_FILTERS
  })
}
export const clearUsersSort = async (usersContext) => {
  usersContext.dispatch({
    type: CLEAR_USERS_SORT
  })
}
export const removeUsersFilter = async (usersContext, filterKey) => {
  usersContext.dispatch({
    type: REMOVE_USERS_FILTER,
    payload: filterKey
  })
}
