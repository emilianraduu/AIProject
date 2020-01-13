import { API_URL } from '../../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../../helpers/requestHelpers'
import { showSuccess } from '../../Global/Toast'

export const FETCH_STAFF_SUCCESS = 'FETCH_STAFF_SUCCESS'
export const FETCH_STAFF_PLAYERS_SUCCESS = 'FETCH_STAFF_PLAYERS_SUCCESS'
export const CHANGE_STAFF_PLAYERS_PAGE = 'CHANGE_STAFF_PLAYERS_PAGE'
export const FETCH_STAFF_LOGS_SUCCESS = 'FETCH_STAFF_LOGS_SUCCESS'
export const CHANGE_STAFF_LOGS_PAGE = 'CHANGE_STAFF_LOGS_PAGE'
export const CHANGE_STAFF_LOGS_SORT = 'CHANGE_STAFF_LOGS_SORT'
export const APPLY_STAFF_LOGS_FILTER = 'APPLY_STAFF_LOGS_FILTER'
export const CLEAR_STAFF_LOGS_FILTERS = 'CLEAR_STAFF_LOGS_FILTERS'
export const FETCH_STAFF_HISTORIES_SUCCESS = 'FETCH_STAFF_HISTORIES_SUCCESS'
export const CHANGE_STAFF_HISTORIES_PAGE = 'CHANGE_STAFF_HISTORIES_PAGE'
export const CHANGE_STAFF_HISTORIES_SORT = 'CHANGE_STAFF_HISTORIES_SORT'
export const APPLY_STAFF_HISTORIES_FILTER = 'APPLY_STAFF_HISTORIES_FILTER'
export const CLEAR_STAFF_HISTORIES_FILTERS = 'CLEAR_STAFF_HISTORIES_FILTERS'
export const FETCH_STAFF_STATISTICS_SUCCESS = 'FETCH_STAFF_STATISTICS_SUCCESS'

export const getStaff = async (authContext, staffsContext, staffId = '') => {
  const response = await makeAuthRequest({
    url: `${API_URL}/staffs/${staffId}`,
    method: 'get'
  })(authContext)
  response && staffsContext.dispatch({
    type: FETCH_STAFF_SUCCESS,
    payload: { staff: response.data, staffId }
  })
}

export const getStaffHistories = async (authContext, staffsContext, staffId, page = 1, filters, sort) => {
  let queryParams = {
    page: page
  }
  if (sort) {
    queryParams.ORDER = [sort]
  }
  if (filters) {
    queryParams.AND = filters
  }
  let query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/staffs/${staffId}/histories?${query}`,
    method: 'get'
  })(authContext)
  response && staffsContext.dispatch({
    type: FETCH_STAFF_HISTORIES_SUCCESS,
    payload: {
      ...response.data,
      staffId
    }
  })
}
export const changeStaffHistoriesPage = async (staffsContext, staffId, page) => {
  staffsContext.dispatch({
    type: CHANGE_STAFF_HISTORIES_PAGE,
    payload: {
      page: page.selected + 1,
      staffId
    }
  })
}
export const changeStaffHistoriesSort = async (staffsContext, staffId, sort) => {
  staffsContext.dispatch({
    type: CHANGE_STAFF_HISTORIES_SORT,
    payload: { sort, staffId }
  })
}
export const applyStaffHistoriesFilter = async (staffsContext, staffId, filter) => {
  staffsContext.dispatch({
    type: APPLY_STAFF_HISTORIES_FILTER,
    payload: { filter, staffId }
  })
}
export const clearStaffHistoriesFilters = async (staffsContext, staffId) => {
  staffsContext.dispatch({
    type: CLEAR_STAFF_HISTORIES_FILTERS,
    payload: { staffId }
  })
}

export const UPDATE_STAFF_DETAILS = 'UPDATE_STAFF_DETAILS'
export const UPDATE_STAFF_DETAILS_SUCCESS = 'UPDATE_STAFF_DETAILS_SUCCESS'
export const UPDATE_STAFF_DETAILS_FAIL = 'UPDATE_STAFF_DETAILS_FAIL'

export const updateStaffDetails = async ({ staffsContext, staffId, data, authContext }) => {
  staffsContext.dispatch({
    type: UPDATE_STAFF_DETAILS
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/users/${staffId}`,
    method: 'put',
    data
  })(authContext)

  response && staffsContext.dispatch({
    type: UPDATE_STAFF_DETAILS_SUCCESS,
    payload: response.data
  })
  response && showSuccess('Staff Updated')
  !response && staffsContext.dispatch({
    type: UPDATE_STAFF_DETAILS_FAIL
  })
}