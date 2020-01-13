import { API_URL } from '../../config/constants'
import { makeAuthRequest } from '../../helpers/requestHelpers'

export const FETCH_STATISTICS_SUCCESS = 'FETCH_STATISTICS_SUCCESS'
export const getStatistics = async (authContext, statisticsContext) => {
  const response = await makeAuthRequest({
    url: `${API_URL}/statistics`,
    method: 'get'
  })(authContext)
  response && statisticsContext.dispatch({
    type: FETCH_STATISTICS_SUCCESS,
    payload: response.data
  })
}