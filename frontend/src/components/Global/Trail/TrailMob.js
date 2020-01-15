/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect } from 'react'
import { TrailLeft, TrailRight, TrailWrapper, TrailSelect, TrailBack } from './styles/trailMob'
import SubmenuChooser from '../Filter/SubmenuChooser'
import { withRouter } from 'react-router-dom'
import { ARROW_LEFT_ICON, ELLIPSIS_ICON } from '../../../styles/abstract/variables'

function TrailMob ({ match, action, title, routes, replacements, noRight = false, active }) {
  const [expand, setExpand] = useState(false)
  const activeRoute = routes.find((route) => match.path === route.path)
  const ref = useRef()
  onClickOutside(ref, () => setExpand(false))
  return (
    <>
      <TrailWrapper active={active}>
        <TrailLeft>
          <TrailBack onClick={action}>
            <i className={ARROW_LEFT_ICON} />
            <span>{title}</span>
          </TrailBack>
        </TrailLeft>
        {
          !noRight &&
            <TrailRight ref={ref}>
              <TrailSelect onClick={() => {
                setExpand(!expand)
              }}
              >
                <span>{activeRoute && activeRoute.name}</span>
                <i className={ELLIPSIS_ICON} />
              </TrailSelect>
              <SubmenuChooser
                expanded={expand}
                routes={routes}
                replacements={replacements}
                onClose={() => setExpand(!expand)}
              />
            </TrailRight>
        }
      </TrailWrapper>
    </>
  )
}
function onClickOutside (ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler(event)
      }
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }, [ref, handler]
  )
}

export default withRouter(TrailMob)
