import {API_URL} from '../../config/constants'
import {makeAuthRequest} from '../../helpers/requestHelpers'
import {showSuccess} from "../Global/Toast";

export const FETCH_COURSES = 'FETCH_COURSES'
export const CREATE_COURSE = 'CREATE_COURSE'
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS'
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS'

export const getCourses = async ({authContext, coursesContext}) => {
    coursesContext.dispatch({
        type: FETCH_COURSES,
        payload: {loading: true}
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/classes`,
        method: 'get'
    })(authContext)
    if (response) {
        coursesContext.dispatch({
            type: FETCH_COURSES_SUCCESS,
            payload: {data: response.data, loading: false}
        })
    } else {
        coursesContext.dispatch({
            type: FETCH_COURSES,
            payload: {loading: true}
        })
    }
}


export const createCourse = async ({authContext, staffsContext, data, history}) => {
    staffsContext.dispatch({
        type: CREATE_COURSE
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/classes/create`,
        method: 'post',
        data,
    })(authContext, true)
    response && staffsContext.dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: response.data
    })

    if (response && response.data) {
        showSuccess('Course created')
        history.push(`/courses`)
    } else {
        showSuccess(response.message)
    }
}
