import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'

import InfoBox from '../../../Global/Box/InfoBox'
import ProfileBox from '../../../Global/Box/ProfileBox'
import Modal from '../../../Global/Modals/Modal'
import PlayerEditForm from './PlayerEditForm'
import BlackBoxMobile from '../../../Global/Box/BlackBoxMobile'

export default function PlayerViewMobile({ player, profile, onPress, openModal, onSubmit, onClose, playerDetails }) {

  return (
    <>
      <PageContent>
        <ProfileBox
          props={profile}
        />
        {
          player.players && player.players.map((item,index) => {
            return (
              item.tournament.status === 'live' ?
                <BlackBoxMobile info={item}/>
                :
                null
            )
          })
        }
        <InfoBox
          header={playerDetails.header}
          infos={playerDetails.info}
          expand={''}
          enableEdit
          openEditModal={onPress}
        />
        <Modal visible={openModal}
               title={playerDetails.header.title}
               icon={playerDetails.header.icon}
               onClose={onClose}>
          <PlayerEditForm
            player={player}
            onClose={onClose}
            onSubmit={onSubmit}/>
        </Modal>
      </PageContent>
    </>
  )
}
