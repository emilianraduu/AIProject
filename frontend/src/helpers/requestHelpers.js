import axios from 'axios'
import httpStatus from 'http-status'
import {confirmAlert} from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' //
import {refreshToken, REQUEST_AUTH_TOKEN_FAILED} from '../components/Auth/AuthActions'
import moment from 'moment-timezone'

export const makeAuthRequest = (data, tries = 0, newTokenData) => async (authContext, showAlert = false) => {
    let {accessToken} = authContext.state
    data.headers = {Authorization: `Bearer ${accessToken}`}
    return await axios(data)
}
export const stringifyQuery = (queryParams) => {
    const params = []
    for (const param in queryParams) {
        if (queryParams.hasOwnProperty(param)) {
            if (Array.isArray(queryParams[param])) {
                for (const innerIndex in queryParams[param]) {
                    if (queryParams[param].hasOwnProperty(innerIndex)) {
                        if (Array.isArray(queryParams[param][innerIndex])) {
                            for (const innerInnerIndex in queryParams[param][innerIndex]) {
                                if (queryParams[param][innerIndex].hasOwnProperty(innerInnerIndex)) {
                                    if (!(Array.isArray(queryParams[param][innerIndex][innerInnerIndex])) && !(queryParams[param][innerIndex][innerInnerIndex] instanceof Object)) {
                                        params.push(`${param}[${innerIndex}][${innerInnerIndex}]=${queryParams[param][innerIndex][innerInnerIndex]}`)
                                    }
                                }
                            }
                        } else if (!(queryParams[param][innerIndex] instanceof Object)) {
                            params.push(`${param}[${innerIndex}]=${queryParams[param][innerIndex]}`)
                        }
                    }
                }
            } else if (queryParams[param] instanceof Object) {
                let index = 0
                for (const innerIndex in queryParams[param]) {
                    if (queryParams[param].hasOwnProperty(innerIndex)) {
                        params.push(`${param}[${index}][0]=${innerIndex}`)
                        if (Array.isArray(queryParams[param][innerIndex])) {
                            for (const innerInnerIndex in queryParams[param][innerIndex]) {
                                if (queryParams[param][innerIndex].hasOwnProperty(innerInnerIndex)) {
                                    if (!(Array.isArray(queryParams[param][innerIndex][innerInnerIndex])) && !(queryParams[param][innerIndex][innerInnerIndex] instanceof Object)) {
                                        params.push(`${param}[${index}][${Number(innerInnerIndex) + 1}]=${queryParams[param][innerIndex][innerInnerIndex]}`)
                                    }
                                }
                            }
                        } else if (!(queryParams[param][innerIndex] instanceof Object)) {
                            params.push(`${param}[${index}]=${queryParams[param][innerIndex]}`)
                        }
                    }
                    index++
                }
            } else {
                params.push(`${param}=${queryParams[param]}`)
            }
        }
    }
    return params.join('&')
}
