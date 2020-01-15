import { API_URL } from '../../config/constants'
import { makeAuthRequest } from '../../helpers/requestHelpers'

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS'
export const CHANGE_TOURNAMENTS_PAGE = 'CHANGE_TOURNAMENTS_PAGE'

export const getRooms = async ({ authContext, tournamentsContext, page = 1, filters, sort, type }) => {
  tournamentsContext.dispatch({
    type: FETCH_TOURNAMENTS,
    payload: { loading: true }
  })
  const queryParams = {
    page: page,
    ORDER: [sort],
    AND: { ...filters, type: ['=', type] }
  }
  const response = await makeAuthRequest({
    url: `${API_URL}/rooms`,
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
