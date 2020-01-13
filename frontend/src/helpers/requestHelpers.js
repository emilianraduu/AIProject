import axios from 'axios'
import httpStatus from 'http-status'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' //
import { refreshToken, REQUEST_AUTH_TOKEN_FAILED } from '../components/Auth/AuthActions'
import moment from 'moment-timezone'

export const makeAuthRequest = (data, tries = 0, newTokenData) => async (authContext, showAlert = false) => {
  try {
    let tokenData = authContext.state
    if (newTokenData) {
      tokenData = newTokenData
    }
    if (tokenData.access_token) {
      if (tokenData.refresh_token && moment().diff(tokenData.expires_at, 'second') > -10) {
        await refreshToken(authContext)
      }
      data.headers = { Authorization: `${tokenData.token_type} ${tokenData.access_token}` }
    }
    return await axios(data)
  } catch (error) {
    if (error.response) {
      if (error.response.status === httpStatus.extra.iis.LOGIN_TIME_OUT) {
        if (tries === 0) {
          const tokenResponse = await refreshToken(authContext)
          if (tokenResponse) {
            return await makeAuthRequest(data, tries + 1, tokenResponse)(authContext)
          }
        } else {
          authContext.dispatch({
            type: REQUEST_AUTH_TOKEN_FAILED
          })
        }
      } else {
        if (error.response.data) {
          if (error.response.data.errors) {
            if (showAlert) {
              if (error.response.data.errorType === 'other') {
                confirmAlert({
                  title: 'Message',
                  message: error.response.data.errors.message,
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () => { }
                    }
                  ]
                })
              }
            }
          }
        }
      }
      console.log('wat', error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
  }
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
