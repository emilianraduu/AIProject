import {API_URL} from '../../config/constants'
import {makeAuthRequest} from '../../helpers/requestHelpers'
import moment from 'moment'

export const FETCH_ROOM = 'FETCH_ROOM'
export const FETCH_ROOM_SUCCESS = 'FETCH_ROOM_SUCCESS'
export const getTournament = async (authContext, tournamentsContext, tournamentId = '') => {
    tournamentsContext.dispatch({
        type: FETCH_ROOM,
        payload: {currentTime: moment()}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/tournaments/${tournamentId}`,
        method: 'get'
    })(authContext)
    response && tournamentsContext.dispatch({
        type: FETCH_ROOM_SUCCESS,
        payload: response.data
    })

}
