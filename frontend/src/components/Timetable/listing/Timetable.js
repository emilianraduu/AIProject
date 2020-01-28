import React, {useContext, useEffect, useState} from 'react'
import {Interval, TimeTable, WeekNames} from "./styles";
import {Loader} from "../../Global/InfiniteScroll";
import {TimetableContext} from "../TimetableContext";

export default function Timetable({rooms}) {
    const timetableContext = useContext(TimetableContext)
    const {assigned, loading} = timetableContext.state
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const [rm, setRoom] = useState({number: '', index: 0})

    useEffect(() => {
        if (rooms) {
            rm !== rooms[0].number && rooms && rooms[0] &&
            setRoom({number: rooms[0].number, index: 0})
        }
    }, [rooms])
    return (
        rooms ?
            <>
                <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: 20}}>
                    {
                        rooms.map((room, index) =>
                            <>
                                <div
                                    style={{
                                        padding: 5,
                                        marginRight: 15,
                                        userSelect: 'none',
                                        backgroundColor: rm.number === room.number ? 'pink' : '#D3D3D3',
                                        width: 'fit-content',
                                        fontSize: rm.number === room.number ? 18 : 12,
                                        transition: '0.5s ease',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setRoom({number: room.number, index})
                                    }}>
                                    {
                                        room.number
                                    }
                                </div>

                            </>
                        )
                    }
                </div>
                <TimeTable>
                    {days.map((day, index) => {
                            let spot = index * 11
                            return (
                                <div>
                                    <WeekNames>
                                        {
                                            day
                                        }
                                    </WeekNames>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-around'
                                    }}>
                                        {
                                            hours.map((hour, i2) => {
                                                spot += 1
                                                return (
                                                    <Interval
                                                        busy={assigned && assigned[spot].map((sp) => sp !== null)[rm.index] === true}>
                                                        {hour}
                                                    </Interval>
                                                )
                                            })
                                        }
                                    </div>
                                </div>)
                        }
                    )}
                </TimeTable>

            </>
            :
            loading &&
            <Loader/>
    )
}
