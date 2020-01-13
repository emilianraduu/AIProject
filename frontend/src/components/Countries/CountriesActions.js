import { API_URL } from '../../config/constants'
import { makeAuthRequest, stringifyQuery } from '../../helpers/requestHelpers'

export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS'
export const FETCH_COUNTRY_SUCCESS = 'FETCH_COUNTRY_SUCCESS'
export const CHANGE_COUNTRIES_PAGE = 'CHANGE_COUNTRIES_PAGE'
export const APPLY_COUNTRIES_FILTER = 'APPLY_COUNTRIES_FILTER'
export const getCountries = async (authContext, countriesContext, page = 1, filters, pageSize = 300) => {
  let queryParams = {
    page: page,
    ORDER: [['name', 'ASC']],
    AND: filters,
    pageSize
  }
  let query = stringifyQuery(queryParams)
  const response = await makeAuthRequest({
    url: `${API_URL}/countries?${query}`,
    method: 'get'
  })(authContext)
  response && countriesContext.dispatch({
    type: FETCH_COUNTRIES_SUCCESS,
    payload: response.data
  })
}
export const getCountry = async (authContext, countriesContext, countryId = '') => {
  const response = await makeAuthRequest({
    url: `${API_URL}/countries/${countryId}`,
    method: 'get'
  })(authContext)
  response && countriesContext.dispatch({
    type: FETCH_COUNTRY_SUCCESS,
    payload: { country: response.data, countryId }
  })
}

export const changeCountriesPage = async (countriesContext, page) => {
  countriesContext.dispatch({
    type: CHANGE_COUNTRIES_PAGE,
    payload: {
      page: page.selected + 1
    }
  })
}
export const applyCountriesFilter = async (countriesContext, filter) => {
  countriesContext.dispatch({
    type: APPLY_COUNTRIES_FILTER,
    payload: filter
  })
}