import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {StaffsContext} from '../../Timetable/StaffsContext'
import {AuthContext} from '../../Auth/AuthContext'
import {createCourse} from '../../Timetable/StaffsActions'
import {BrowserView} from 'react-device-detect'
import {getUsers} from "../../Auth/AuthActions";
import {PageContent} from "../../../styles/shared/wrapper";
import CourseCreateForm from "./CourseCreateForm";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function CourseCreate({history}) {
    const authContext = useContext(AuthContext)
    const staffsContext = useContext(StaffsContext)
    const onSubmit = (values) => {
        createCourse({
            authContext,
            staffsContext,
            history,
            data: {name: values.name, user: Number(values.user.value)}
        })
    }
    const {users} = authContext.state
    useEffect(() => {
        getUsers({authContext})
    }, [])


    return (
        <>
            <BrowserView>
                <PageContent type={'web'} flex>
                    <CourseCreateForm
                        onSubmit={onSubmit}
                        teachers={users}
                        type={'web'}/>
                </PageContent>
            </BrowserView>
        </>

    )
}

export default withRouter(CourseCreate)
