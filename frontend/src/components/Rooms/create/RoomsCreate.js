import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {AuthContext} from '../../Auth/AuthContext'
import {BrowserView} from 'react-device-detect'
import {PageContent} from "../../../styles/shared/wrapper";
import RoomsCrateForm from "./RoomsCreateForm";
import {createRoom} from "../RoomsActions";
import {RoomsContext} from "../RoomsContext";


function RoomsCreate({history}) {
    const authContext = useContext(AuthContext)
    const roomsContext = useContext(RoomsContext)
    const onSubmit = ({capacity, features, number, type}) => {
        let data = {}
        data.capacity = Number(capacity)
        data.features = features.value
        data.number = number
        data.type = type.value
        createRoom({authContext,roomsContext, data, history})
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
