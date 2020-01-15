import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import CourseCreateWeb from './CourseCreateWeb'
import {createCourse} from "../../../Timetable/StaffsActions";
import {AuthContext} from "../../../Auth/AuthContext";
import {StaffsContext} from "../../../Timetable/StaffsContext";
import {ActiveStaffContext} from "../../../Timetable/view/ActiveStaffContext";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function CourseEdit({ history, match }) {
  const authContext = useContext(AuthContext)
  const courseContext = useContext(ActiveStaffContext)
  const onSubmit = (values) => {
    // updateCourse({
    //   authContext,
    //   staffsContext,
    //   history,
    //   data: values
    // })
  }

  useEffect(()=>{
    // getCourse({authContext, courseContext, id:match.params.id })
  })


  return (
    <>
        <CourseCreateWeb
          onSubmit={onSubmit}
        />
    </>

  )
}

export default withRouter(CourseEdit)
