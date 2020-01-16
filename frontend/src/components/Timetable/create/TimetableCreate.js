import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {AuthContext} from '../../Auth/AuthContext'
import {BrowserView} from 'react-device-detect'
import {PageContent} from "../../../styles/shared/wrapper";
import TimetableCreateForm from "./TimetableCreateForm";
import {TimetableContext} from "../TimetableContext";
import {createTimetable} from "../TimetableActions";


function TimetableCreate({history}) {
    const authContext = useContext(AuthContext)
    const timetableContext = useContext(TimetableContext)
    const onSubmit = (data) => {
        createTimetable({authContext, timetableContext, data, history})
    }

    return (
        <>
            <BrowserView>
                <PageContent type={'web'} flex>
                    <TimetableCreateForm
                        onSubmit={onSubmit}
                        type={'web'}/>
                </PageContent>
            </BrowserView>
        </>

    )
}

export default withRouter(TimetableCreate)
