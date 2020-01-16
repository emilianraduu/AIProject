import React from 'react'
import {PageContent} from '../../../styles/shared/wrapper'
import FiltersWeb from '../../Global/Filter/FiltersWeb'
import {Loader} from '../../Global/InfiniteScroll'
import EmptyData from "../../Global/EmptyData/EmptyData";
import Timetable from 'react-timetable-events'
import moment from 'moment-timezone'

export default function TimetableListingWeb({timetable, filters, filterFields, removeFilter, handleFilter, loading}) {
    let events = {}
    if (timetable) {
        events = {
            monday: [
                {
                    id: 1,
                    name: '',
                    type: '',
                    startTime: moment().weekday(-7).set({hour: timetable.monday_availability_from, minutes: 0}),
                    endTime: moment().weekday(-7).set({hour: timetable.monday_availability_to, minutes: 0})
                }
            ],
            tuesday: [
                {
                    id: 2,
                    name: '',
                    type: '',
                    startTime: moment().weekday(-7).set({hour: timetable.tuesday_availability_from, minutes: 0}),
                    endTime: moment().weekday(-7).set({hour: timetable.tuesday_availability_to, minutes: 0})
                },
            ],
            wednesday: [{
                id: 3,
                name: '',
                type: '',
                startTime: moment().weekday(-7).set({hour: timetable.wednesday_availability_from, minutes: 0}),
                endTime: moment().weekday(-7).set({hour: timetable.wednesday_availability_to, minutes: 0})
            },],
            thursday: [ {
                id: 4,
                name: '',
                type: '',
                startTime: moment().weekday(-7).set({hour: timetable.thursday_availability_from, minutes: 0}),
                endTime: moment().weekday(-7).set({hour: timetable.thursday_availability_to, minutes: 0})
            },],
            friday: [{
                id: 5,
                name: '',
                type: '',
                startTime: moment().weekday(-7).set({hour: timetable.friday_availability_from, minutes: 0}),
                endTime: moment().weekday(-7).set({hour: timetable.friday_availability_to, minutes: 0})
            },]
        }
    }
    return (
        <>
            <PageContent type={'web'}>
                {
                    !timetable && !loading &&
                    <FiltersWeb
                        filterFields={filterFields}
                        filters={filters}
                        removeFilter={removeFilter}
                        handleFilter={handleFilter}
                        button={{url: '/timetable/create', text: 'Create timetable'}}
                    />
                }
                {
                    !timetable &&
                    <EmptyData data={'No timetable defined'}/>
                }
                {
                    timetable &&
                    <Timetable events={events} hoursInterval={[8,20]}/>
                }

                {
                    loading && <Loader web/>
                }
            </PageContent>
        </>
    )
}
