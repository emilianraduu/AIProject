import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {ActiveCourseContext} from "../ActiveCourseContext";
import {PageContent} from "../../../styles/shared/wrapper";
import CourseEditForm from "./CourseEditForm";
import {getCourse, updateCourse} from "../ActiveCourseActions";
import {AuthContext} from "../../Auth/AuthContext";

function CourseEdit({history, match}) {
    const authContext = useContext(AuthContext)
    const courseContext = useContext(ActiveCourseContext)
    const onSubmit = (values) => {
        updateCourse({authContext, courseContext, data: values, id:match.params.id, history})
    }
    useEffect(() => {
        getCourse(authContext, courseContext, match.params.id)
    }, [])
    const {activeCourse} = courseContext.state
    return (
        <>
            <PageContent type={'web'} flex>
                <CourseEditForm
                    onSubmit={onSubmit}
                    course={activeCourse}
                    history={history}
                    type={'web'}/>
            </PageContent>
        </>

    )
}

export default withRouter(CourseEdit)
