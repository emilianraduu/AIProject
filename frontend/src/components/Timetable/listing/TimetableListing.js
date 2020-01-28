import React, {useContext, useEffect} from 'react'
import {TimetableContext} from '../TimetableContext'
import {getTimetable} from '../TimetableActions'
import {BrowserView} from 'react-device-detect'
import TimetableListingWeb from './TimetableListingWeb'
import {AuthContext} from '../../Auth/AuthContext'

export default function StaffsListing() {
    const authContext = useContext(AuthContext)
    const timetableContext = useContext(TimetableContext)
    useEffect(() => {
        getTimetable({authContext, timetableContext})
    }, [])
    const {timetable, loading, scheduler} = timetableContext.state
    return (
        <>
            <BrowserView>
                <TimetableListingWeb
                    timetable={timetable}
                    loading={loading}
                    scheduler={scheduler}
                />
            </BrowserView>
        </>
    )
}
