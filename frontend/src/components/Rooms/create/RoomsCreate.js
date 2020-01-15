import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {StaffsContext} from '../../Timetable/StaffsContext'
import {AuthContext} from '../../Auth/AuthContext'
import {createCourse} from '../../Timetable/StaffsActions'
import {BrowserView} from 'react-device-detect'
import {PageContent} from "../../../styles/shared/wrapper";
import RoomsCrateForm from "./RoomsCrateForm";

function RoomsCreate({history}) {
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

    return (
        <>
            <BrowserView>
                <PageContent type={'web'} flex>
                    <RoomsCrateForm
                        onSubmit={onSubmit}
                        type={'web'}/>
                </PageContent>
            </BrowserView>
        </>

    )
}

export default withRouter(RoomsCreate)
