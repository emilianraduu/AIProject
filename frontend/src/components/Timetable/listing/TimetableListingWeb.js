import React, {useContext, useEffect} from 'react'
import {PageContent} from '../../../styles/shared/wrapper'
import FiltersWeb from '../../Global/Filter/FiltersWeb'
import {Loader} from '../../Global/InfiniteScroll'
import EmptyData from "../../Global/EmptyData/EmptyData";
import moment from 'moment-timezone'
import {withRouter} from 'react-router-dom'
import {FormItem, StaffFormFooter} from "../../../styles/shared/form";
import {SecondaryButton} from "../../../styles/shared/button";
import {assignTimetable} from "../TimetableActions";
import {AuthContext} from "../../Auth/AuthContext";
import {TimetableContext} from "../TimetableContext";
import {CoursesContext} from "../../Courses/CoursesContext";
import {getCourses} from "../../Courses/CoursesActions";
import {getUsers} from "../../Auth/AuthActions";
import {RoomsContext} from "../../Rooms/RoomsContext";
import {getRooms} from "../../Rooms/RoomsActions";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import Timetable from "./Timetable";

function TimetableListingWeb({timetable, filters, filterFields, removeFilter, handleFilter, loading, history, scheduler}) {
    const authContext = useContext(AuthContext)
    const timetableContext = useContext(TimetableContext)
    const coursesContext = useContext(CoursesContext)
    const {courses} = coursesContext.state

    const events = []
    let ev = []
    const {users} = authContext.state
    const roomsContext = useContext(RoomsContext)
    const {rooms} = roomsContext.state
    useEffect(() => {
        getCourses({authContext, coursesContext})
        getUsers({authContext})
        getRooms({authContext, roomsContext})
    }, [])
    let times = []
    let depts = {"Year 1": [], "Year 2": [], "Year 3": []}
    if (timetable) {
        times = [
            {
                id: "monday",
                time: `${timetable.monday_availability_from} ${timetable.monday_availability_to}`
            },
            {
                id: "tuesday",
                time: `${timetable.tuesday_availability_from} ${timetable.tuesday_availability_to}`
            },
            {
                id: "wednesday",
                time: `${timetable.wednesday_availability_from} ${timetable.wednesday_availability_to}`
            },
            {
                id: "thursday",
                time: `${timetable.thursday_availability_from} ${timetable.thursday_availability_to}`
            },
            {
                id: "friday",
                time: `${timetable.friday_availability_from} ${timetable.friday_availability_to}`
            }
        ]
        ev = {
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
            wednesday: [
                {
                    id: 3,
                    name: '',
                    type: '',
                    startTime: moment().weekday(-7).set({hour: timetable.wednesday_availability_from, minutes: 0}),
                    endTime: moment().weekday(-7).set({hour: timetable.wednesday_availability_to, minutes: 0})
                },
            ],
            thursday: [
                {
                    id: 4,
                    name: '',
                    type: '',
                    startTime: moment().weekday(-7).set({hour: timetable.thursday_availability_from, minutes: 0}),
                    endTime: moment().weekday(-7).set({hour: timetable.thursday_availability_to, minutes: 0})
                },
            ],
            friday: [
                {
                    id: 5,
                    name: '',
                    type: '',
                    startTime: moment().weekday(-7).set({hour: timetable.friday_availability_from, minutes: 0}),
                    endTime: moment().weekday(-7).set({hour: timetable.friday_availability_to, minutes: 0})
                },
            ]
        }
    }
    if (courses) {
        courses.forEach((course, index) => {
            if (index < (courses.length - 1) / 3) {
                depts['Year 1'].push(course)
            }
            if (index > (courses.length - 1) / 3 && index < (courses.length - 1) * 2 / 3) {
                depts['Year 2'].push(course)

            }
            if (index > (courses.length - 1) * 2 / 3) {
                depts['Year 3'].push(course)

            }
        })
    }
    const localizer = momentLocalizer(moment)
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
                        <Timetable rooms={rooms}/>
                    // <Calendar
                    //     localizer={localizer}
                    //     events={events}
                    //     startAccessor="start"
                    //     endAccessor="end"
                    //     style={{height: 500}}
                    // />
                }

                {
                    loading && <Loader web/>
                }
                {
                    timetable &&
                    <StaffFormFooter>
                        <FormItem style={{width: 'fit-content'}}>
                            <SecondaryButton filled onClick={() => {
                                assignTimetable({
                                    authContext, timetableContext, history, courses, users, events: ev, times, depts, rooms
                                })
                            }}
                            >Create timetable</SecondaryButton>
                        </FormItem>
                    </StaffFormFooter>
                }
            </PageContent>
        </>
    )
}


export default withRouter(TimetableListingWeb)
