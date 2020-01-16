import React, { useContext } from 'react'
import { TrailWrapper, TrailILink, TrailIcon, TrailItem } from './styles/trailWeb'
import { withRouter, Link } from 'react-router-dom'
import { getBreadcrumbs } from '../../../helpers/breadcrumbsGenerator'
import { ActiveCourseContext } from '../../Courses/ActiveCourseContext'
import { ANGLE_RIGHT_ICON_B } from '../../../styles/abstract/variables'

function TrailWeb({ location }) {
  const courseContext = useContext(ActiveCourseContext)
  const uuidToName = {
    course: {
      source: courseContext.state,
      sourceProperty: 'activeCourse',
      properties: ['name']
    },

  }
  const { pathname } = location
  const breadcrumbs = getBreadcrumbs(pathname, uuidToName)
  return (
    <TrailWrapper>
      {
        breadcrumbs.map((breadcrumb, index) => {
          return <TrailItem key={index}>
            <TrailILink>
              <Link to={breadcrumb.path}>
                {breadcrumb.name}
              </Link>
            </TrailILink>
            <TrailIcon>
              <i className={ANGLE_RIGHT_ICON_B}/>
            </TrailIcon>
          </TrailItem>
        })
      }
    </TrailWrapper>
  )
}

export default withRouter(TrailWeb)
