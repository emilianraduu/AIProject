import { API_URL } from '../../config/constants'
import { makeAuthRequest } from '../../helpers/requestHelpers'

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS'

export const getCourses = async ({ authContext, coursesContext }) => {
  coursesContext.dispatch({
    type: FETCH_TOURNAMENTS,
    payload: { loading: true }
  })
  const response = await makeAuthRequest({
    url: `${API_URL}/classes`,
    method: 'get'
  })(authContext)
  if (response) {
    coursesContext.dispatch({
      type: FETCH_TOURNAMENTS_SUCCESS,
      payload: { data: response.data, loading: false }
    })
  } else {
    coursesContext.dispatch({
      type: FETCH_TOURNAMENTS,
      payload: { loading: true }
    })
  }
}

