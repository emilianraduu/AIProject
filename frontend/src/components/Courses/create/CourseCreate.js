import React, {useContext, useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {StaffsContext} from '../../Timetable/StaffsContext'
import {AuthContext} from '../../Auth/AuthContext'
import {createCourse} from '../../Timetable/StaffsActions'
import {BrowserView} from 'react-device-detect'
import CourseCreateWeb from './CourseCreateWeb'
import {getUsers} from "../../Auth/AuthActions";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function CourseCreate({history}) {
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
    const {users} = authContext.state
    useEffect(() => {
        getUsers({authContext})
    }, [])


    return (
        <>
            <BrowserView>
                <CourseCreateWeb
                    onSubmit={onSubmit}
                    users={users}
                />
            </BrowserView>
        </>

    )
}

export default withRouter(CourseCreate)
