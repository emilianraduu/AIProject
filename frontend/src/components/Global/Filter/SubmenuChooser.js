import React from 'react'
import { PanelElement, PanelWrapper } from './styles/filterMob'
import { Link, withRouter } from 'react-router-dom'

function SubmenuChooser({ match, expanded, routes = [], replacements = {}, left }) {
  let re = new RegExp(Object.keys(replacements).join('|'), 'gi')
  return (
    <>
      <PanelWrapper expanded={expanded} left={left} submenu>
        {
          routes.map((route, index) => {
            const to = route.path.replace(re, function (matched) {
              return replacements[matched]
            })
            return (
              <PanelElement key={index} active={match.path === route.path}>
                <Link to={to}>
                  <>{route.name}</>
                </Link>
              </PanelElement>

            )
          })
        }
      </PanelWrapper>
    </>
  )
}

export default withRouter(SubmenuChooser)