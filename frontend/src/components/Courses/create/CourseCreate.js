import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {TimetableContext} from '../../Timetable/TimetableContext'
import {AuthContext} from '../../Auth/AuthContext'
import {BrowserView} from 'react-device-detect'
import {getUsers} from "../../Auth/AuthActions";
import {PageContent} from "../../../styles/shared/wrapper";
import CourseCreateForm from "./CourseCreateForm";
import {createCourse} from "../CoursesActions";

export const STAFF_ROLES = ['dealer', 'floorTurnee', 'floorCashGame', 'press', 'register', 'registerManager', 'director']

function CourseCreate({history}) {
    const authContext = useContext(AuthContext)
    const staffsContext = useContext(TimetableContext)
    const onSubmit = (values) => {
        createCourse({
            authContext,
            staffsContext,
            history,
            data: {
                name: values.name,
                user: Number(values.user.value),
                year: values.year.value,
                type: values.type.value,
                noof_students: Number(values.studentsNumber),
            }
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
