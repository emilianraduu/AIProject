import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import RoomsCreateWeb from './RoomsCreateWeb'
import {createCourse} from "../../../Timetable/StaffsActions";
import {AuthContext} from "../../../Auth/AuthContext";
import {StaffsContext} from "../../../Timetable/StaffsContext";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function RoomsCreate({ history }) {
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
        <RoomsCreateWeb
          onSubmit={onSubmit}
        />
    </>

  )
}

export default withRouter(RoomsCreate)
