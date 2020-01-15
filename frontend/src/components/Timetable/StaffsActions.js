import {API_URL} from '../../config/constants'
import {makeAuthRequest, stringifyQuery} from '../../helpers/requestHelpers'
import {showSuccess} from '../Global/Toast'

export const FETCH_STAFFS_SUCCESS = 'FETCH_STAFFS_SUCCESS'
export const FETCH_STAFFS = 'FETCH_STAFFS'
export const CHANGE_STAFFS_PAGE = 'CHANGE_STAFFS_PAGE'
export const APPLY_STAFFS_FILTER = 'APPLY_STAFFS_FILTER'
export const APPLY_STAFFS_FILTER_SUCCESS = 'APPLY_STAFFS_FILTER_SUCCESS'
export const CHANGE_STAFFS_SORT = 'CHANGE_STAFFS_SORT'
export const CLEAR_STAFFS_FILTERS = 'CLEAR_STAFFS_FILTERS'
export const REMOVE_STAFFS_FILTER = 'REMOVE_STAFFS_FILTER'
export const REMOVE_STAFFS_SORT = 'REMOVE_STAFFS_SORT'
export const FETCH_STAFF_HISTORIES_SUCCESS = 'FETCH_STAFF_HISTORIES_SUCCESS'
export const CHANGE_STAFF_HISTORIES_PAGE = 'CHANGE_STAFF_HISTORIES_PAGE'
export const getStaffs = async (authContext, staffsContext, page = 1, filters, sort) => {
    let queryParams = {
        page: page,
        ORDER: [sort],
        AND: filters
    }
    staffsContext.dispatch({
        type: FETCH_STAFFS,
    })
    let query = stringifyQuery(queryParams)
    const response = await makeAuthRequest({
        url: `${API_URL}/staffs?${query}`,
        method: 'get'
    })(authContext)
    response && staffsContext.dispatch({
        type: FETCH_STAFFS_SUCCESS,
        payload: {data: response.data}
    })
}
export const changeStaffsPage = async (staffsContext, page) => {
    staffsContext.dispatch({
        type: CHANGE_STAFFS_PAGE,
        payload: {
            page: page.selected + 1
        }
    })
}
export const applyStaffsFilter = async (staffsContext, filter) => {
    staffsContext.dispatch({
        type: APPLY_STAFFS_FILTER,
        payload: filter
    })
}
export const changeStaffsSort = async (staffsContext, sort) => {
    staffsContext.dispatch({
        type: CHANGE_STAFFS_SORT,
        payload: sort
    })
}
export const clearStaffsFilters = async (staffsContext) => {
    staffsContext.dispatch({
        type: CLEAR_STAFFS_FILTERS
    })
}
export const clearStaffsSort = async (staffsContext) => {
    staffsContext.dispatch({
        type: REMOVE_STAFFS_SORT
    })
}
export const removeStaffsFilter = async (staffsContext, filterKey) => {
    staffsContext.dispatch({
        type: REMOVE_STAFFS_FILTER,
        payload: filterKey
    })
}

export const CREATE_STAFF = 'CREATE_STAFF'
export const CREATE_STAFF_SUCCESS = 'CREATE_STAFF_SUCCESS'
export const CREATE_STAFF_FAIL = 'CREATE_STAFF_FAIL'

export const createCourse = async ({authContext, staffsContext, data, history}) => {
    staffsContext.dispatch({
        type: CREATE_STAFF
    })
    const response = await makeAuthRequest({
        url: `${API_URL}/classes/create`,
        method: 'post',
        data,
    })(authContext, true)
    response && staffsContext.dispatch({
        type: CREATE_STAFF_SUCCESS,
        payload: response.data
    })

    if (response && response.data) {
        showSuccess('Course created')
        history.push(`/courses`)
    } else {
        showSuccess(response.message)
    }
}
