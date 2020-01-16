import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {AuthContext} from "../../Auth/AuthContext";
import {PageContent} from "../../../styles/shared/wrapper";
import CourseCrateForm from "./RoomsEditForm";
import {getRoom, updateRoom} from "../ActiveRoomActions";
import {ActiveRoomContext} from "../ActiveRoomContext";


function RoomEdit({history, match}) {
    const authContext = useContext(AuthContext)
    const roomsContext = useContext(ActiveRoomContext)
    const {room} = roomsContext.state
    const onSubmit = (values) => {
        updateRoom({data: values, authContext, history, roomsContext, id: match.params.id})
    }

    useEffect(() => {
      getRoom({roomsContext, authContext})
    }, [])

    return (
        <>

            <PageContent type={'web'} flex>
                <CourseCrateForm
                    onSubmit={onSubmit} room={room}/>
            </PageContent>
        </>

    )
}

export default withRouter(RoomEdit)
