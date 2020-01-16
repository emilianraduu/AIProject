import {API_URL} from '../../config/constants'
import {makeAuthRequest} from '../../helpers/requestHelpers'
import moment from 'moment'
import {showSuccess} from "../Global/Toast";

export const FETCH_ROOM = 'FETCH_ROOM'
export const FETCH_ROOM_SUCCESS = 'FETCH_ROOM_SUCCESS'
export const getRoom = async ({authContext, roomsContext, id = ''}) => {
    roomsContext.dispatch({
        type: FETCH_ROOM,
        payload: {currentTime: moment()}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/rooms/${id}`,
        method: 'get'
    })(authContext)
    response && roomsContext.dispatch({
        type: FETCH_ROOM_SUCCESS,
        payload: response.data
    })

}
export const updateRoom = async ({id, authContext, roomsContext, history, data}) => {
    const response = await makeAuthRequest({
        url: `${API_URL}/rooms/update/${id}`,
        method: 'put',
        data
    })
    (authContext, true)
    if (response) {
        roomsContext && roomsContext.dispatch({
            payload: id
        })
        showSuccess('Room updated')
        history.push('/rooms')
    }
}

