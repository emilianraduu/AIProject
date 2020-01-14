import { makeAuthRequest, stringifyQuery } from '../../helpers/requestHelpers'
import { API_URL } from '../../config/constants'
// export const FETCH_FESTIVALS = 'FETCH_FESTIVALS'
export const FETCH_FESTIVALS_SUCCESS = 'FETCH_FESTIVALS_SUCCESS'
// export const FETCH_FESTIVALS_FAIL = 'FETCH_FESTIVALS_FAIL'
export const fetchFestivals = async ({ authContext, festivalContext, search = '', page = 1 }) => {
  const { dispatch } = festivalContext
  // const { page, sort, filters } = festivalContext.state
  const response = await makeAuthRequest({
    url: `${API_URL}/classes`,
    method: 'get'
  })(authContext)
  response && dispatch({
    type: FETCH_FESTIVALS_SUCCESS,
    payload: response.data
  })
}

export const CREATE_FESTIVAL = 'CREATE_FESTIVAL'
export const CREATE_FESTIVAL_SUCCESS = 'CREATE_FESTIVAL_SUCCESS'
export const CREATE_FESTIVAL_FAIL = 'CREATE_FESTIVAL_FAIL'

export const createFestival = async ({ authContext, data }) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/festivals`,
    method: 'post',
    data: {
      festival: {
        ...data
      }
    }
  })(authContext)
  return response.data
}
