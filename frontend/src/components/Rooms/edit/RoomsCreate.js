import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import CourseCreateWeb from './RoomsCreateWeb'
import {AuthContext} from "../../Auth/AuthContext";
import {TimetableContext} from "../../Timetable/TimetableContext";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function CourseCreate({ history }) {
  const authContext = useContext(AuthContext)
  const staffsContext = useContext(TimetableContext)
  const onSubmit = (values) => {

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
