import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import CourseCreateWeb from './CourseCreateWeb'
import {createCourse} from "../../../Timetable/StaffsActions";
import {AuthContext} from "../../../Auth/AuthContext";
import {StaffsContext} from "../../../Timetable/StaffsContext";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function CourseCreate({ history }) {
  const authContext = useContext(AuthContext)
  const staffsContext = useContext(StaffsContext)
  const onSubmit = (values) => {
    createCourse({
      authContext,
      staffsContext,
      history,
      data: values
    })
  }

  useEffect(()=>{

  })

  useEffect(() => {
  }, [])

  return (
    <>
        <CourseCreateWeb
          onSubmit={onSubmit}
        />
    </>

  )
}

export default withRouter(CourseCreate)
