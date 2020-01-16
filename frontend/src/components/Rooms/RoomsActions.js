import {API_URL} from '../../config/constants'
import {makeAuthRequest} from '../../helpers/requestHelpers'
import {showSuccess} from "../Global/Toast";

export const FETCH_ROOMS = 'FETCH_ROOMS'
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS'

export const getRooms = async ({authContext, roomsContext}) => {
    roomsContext.dispatch({
        type: FETCH_ROOMS,
        payload: {loading: true}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/rooms`,
        method: 'get'
    })(authContext)
    if (response) {
        roomsContext.dispatch({
            type: FETCH_ROOMS_SUCCESS,
            payload: {data: response.data, loading: false}
        })
    } else {
        roomsContext.dispatch({
            type: FETCH_ROOMS,
            payload: {loading: true}
        })
    }
}

export const CREATE_ROOM = 'CREATE_ROOM'
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'

export const createRoom = async ({authContext, roomsContext, data, history}) => {
    roomsContext.dispatch({
        type: CREATE_ROOM,
        payload: {loading: true}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/rooms/create`,
        method: 'post',
        data
    })(authContext)
    if (response) {
        roomsContext.dispatch({
            type: CREATE_ROOM_SUCCESS,
            payload: {data: response.data, loading: false}
        })
        showSuccess('Room created')
        history.push('/rooms')
    } else {
        roomsContext.dispatch({
            type: FETCH_ROOMS,
            payload: {loading: true}
        })
    }
}