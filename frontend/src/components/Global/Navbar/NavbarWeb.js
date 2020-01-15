import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { routes } from '../../../config/Router'
import { WhiteLink } from '../../../styles/typography/typography'
import _ from 'lodash'
import getUserRoutes from '../../../config/UserRoutes'

export function Navbar({ location, filterClearer, role }) {
  return (
    <>
      {
        getUserRoutes(role).map((route, index) => {
          return (
            <Link to={route.path} key={index}>
              <WhiteLink  active={_.startsWith(location.pathname, route.path)}>
                {route.name}
              </WhiteLink>
            </Link>
          )
        })
      }
    </>
  )
}

export default withRouter(Navbar)
