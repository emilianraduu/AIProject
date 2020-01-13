import React from 'react'
import InfoBox from '../../../Global/Box/InfoBox'
import { PageContent, PageWrapperLeft, PageWrapperRight } from '../../../../styles/shared/wrapper'
import ProfileBox from '../../../Global/Box/ProfileBox'
import PlayerHistoriesListing from '../histories/PlayerHistoriesListing'
import PlayerStatisticsTable from './PlayerStatisticsTable'
import Modal from '../../../Global/Modals/Modal'
import PlayerEditForm from './PlayerEditForm'
import BlackBox from '../../../Global/Box/BlackBox'

export default function PlayerViewWeb ({ player, profile, onPress, openModal, onSubmit, onClose, playerDetails }) {
  return (
    <>
      <PageContent type='web' flex details>
        <PageWrapperLeft rightBorder>
          <ProfileBox
            web
            props={profile}
          />
          <InfoBox
            web
            header={playerDetails.header}
            infos={playerDetails.info}
            expand=''
            enableEdit
            openEditModal={onPress}
          />
        </PageWrapperLeft>
        <PageWrapperRight secondaryPage playerDetails>
          {
            player.players && player.players.map((item, index) => {
              return (
                <BlackBox info={{ ...item, userId: player.id }} key={index} />
              )
            })
          }
          <PlayerHistoriesListing secondaryPage />
          <PlayerStatisticsTable secondaryPage />
        </PageWrapperRight>
        <Modal
          visible={openModal}
          title={playerDetails.header.title}
          icon={playerDetails.header.icon}
          onClose={onClose}
        >
          <PlayerEditForm
            player={player}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        </Modal>
      </PageContent>
    </>
  )
}
