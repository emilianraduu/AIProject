import {API_URL} from '../../config/constants'
import {makeAuthRequest, stringifyQuery} from '../../helpers/requestHelpers'
import {showSuccess} from '../Global/Toast'


export const GET_TIMETABLE = 'GET_TIMETABLE'
export const GET_TIMETABLE_SUCCESS = 'GET_TIMETABLE_SUCCESS'
export const GET_TIMETABLE_FAIL = 'GET_TIMETABLE_FAIL'

export const getTimetable = async ({authContext, timetableContext}) => {
    timetableContext.dispatch({
        type: GET_TIMETABLE,
        payload: {loading: true}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/timetable`,
        method: 'get'
    })(authContext)
    if (response) {
        timetableContext.dispatch({
            type: GET_TIMETABLE_SUCCESS,
            payload: {data: response.data, loading: false}
        })
    } else {
        timetableContext.dispatch({
            type: GET_TIMETABLE_FAIL,
            payload: {loading: true}
        })
    }
}


export const CREATE_TIMETABLE = 'CREATE_TIMETABLE'
export const CREATE_TIMETABLE_SUCCESS = 'CREATE_TIMETABLE_SUCCESS'
export const CREATE_TIMETABLE_FAIL = 'CREATE_TIMETABLE_FAIL'

export const createTimetable = async ({authContext, timetableContext, data, history}) => {
    timetableContext.dispatch({
        type: CREATE_TIMETABLE,
        payload: {loading: true}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/timetable/create`,
        method: 'post',
        data
    })(authContext)
    if (response) {
        timetableContext.dispatch({
            type: CREATE_TIMETABLE_SUCCESS,
            payload: {data: response.data, loading: false}
        })
        showSuccess('Timetable created!')
        history.push('/timetable')
    } else {
        timetableContext.dispatch({
            type: CREATE_TIMETABLE_FAIL,
            payload: {loading: false}
        })
    }
}