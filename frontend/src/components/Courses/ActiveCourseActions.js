import {API_URL} from '../../config/constants'
import {makeAuthRequest} from '../../helpers/requestHelpers'
import {showSuccess} from '../Global/Toast'
import moment from 'moment'

export const FETCH_COURSE = 'FETCH_COURSE'
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS'
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS'
export const getCourse = async (authContext, coursesContext, id = '') => {
    coursesContext.dispatch({
        type: FETCH_COURSE,
        payload: {currentTime: moment()}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/classes/${id}`,
        method: 'get'
    })(authContext)
    response && coursesContext.dispatch({
        type: FETCH_COURSE_SUCCESS,
        payload: response.data
    })

}


export const deleteCourse = async ({id, authContext, coursesContext, history}) => {
    const response = await makeAuthRequest({
        url: `${API_URL}/classes/remove/${id}`,
        method: 'delete'
    })
    (authContext, true)
    if (response) {
        coursesContext && coursesContext.dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: id
        })
        coursesContext && showSuccess('Course deleted')
        history.push('/courses')
    }
}


export const updateCourse = async ({id, authContext, coursesContext, history, data}) => {
    const response = await makeAuthRequest({
        url: `${API_URL}/classes/update/${id}`,
        method: 'put',
        data
    })
    (authContext, true)
    if (response) {
        coursesContext && coursesContext.dispatch({
            payload: id
        })
        showSuccess('Course updated')
        history.push('/courses')
    }
}
