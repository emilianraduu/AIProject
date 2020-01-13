import React, { useContext } from 'react'
import { HeaderWrapper, HeaderImage } from './styles/headerWeb'
import { HorizontalLine } from '../../../styles/shared/horizontalLine'
import HeaderTopWeb from './HeaderTopWeb'
import HeaderBottomWeb from './HeaderBottomWeb'
import getUserRoutes from '../../../config/UserRoutes'
import { routes } from '../../../config/Router'
import { withRouter } from 'react-router-dom'
import HeaderFilters from '../Filter/HeaderFilters'
import UsersListingWeb from '../../Users/listing/UsersListingWeb'
import { PLAYERS_FILTER_HEADERS } from '../../Users/listing/UsersListing'
import { UsersContext } from '../../Users/UsersContext'
import { applyUsersFilter, changeUsersSort, clearUsersFilters, removeUsersFilter } from '../../Users/UsersActions'

function Header({ role, location }) {
  let showHeaderBottom = true
  routes.forEach(route => {
    if (route.path === location.pathname) {
      showHeaderBottom = false
    }
  })
  const usersContext = useContext(UsersContext)
  const { pagination, users, filters, sort, loading } = usersContext.state
  const handleFilter = filter => applyUsersFilter(usersContext, filter)
  const clearFilters = () => clearUsersFilters(usersContext)
  const removeFilter = (filterKey) => removeUsersFilter(usersContext, filterKey)

  return (
    <HeaderWrapper>
      <HeaderImage/>
      <HeaderTopWeb role={role}/>
      <HorizontalLine/>
      {
        showHeaderBottom && <>
          <HeaderBottomWeb/>
        </>
      }
      {
        location.pathname === '/users' &&
          <HeaderFilters
            filters={filters}
            filterFields={PLAYERS_FILTER_HEADERS}
            handleFilter={handleFilter}
            clearFilters={clearFilters}
            removeFilter={removeFilter}
          />
      }
    </HeaderWrapper>
  )
}

export default withRouter(Header)