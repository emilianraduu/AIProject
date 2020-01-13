import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import InfoBox from '../../Global/Box/InfoBox'
import TournamentPlayerProfilePhoto from './TournamentPlayerProfilePhoto'
import TournamentPlayerPayment from './TournamentPlayerPayment'

export default function TournamentPlayerViewMobile({ player, playerDetails, user, onSubmit, activeTournament, setProfilePicture }) {
  return (
    <PageContent>
      <InfoBox
        header={playerDetails.header}
        infos={playerDetails.info}
        expand={''}
        noLink
      />
      <TournamentPlayerProfilePhoto
        profilePicture={user && user.profileImage}
        setProfilePicture={setProfilePicture}
        userId={user && user.id}

      />
      <TournamentPlayerPayment onSubmit={() => onSubmit(player)} playerId={user && user.id}
                               activeTournament={activeTournament}/>
    </PageContent>
  )
}