import React, { useContext, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import PlayerViewWeb from './PlayerDetailsWeb'
import PlayerViewMobile from './PlayerDetailsMobile'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { playerRoutes } from '../PlayerRouter'
import { ActivePlayerContext } from '../ActivePlayerContext'
import { updatePlayerDetails } from '../ActivePlayerActions'
import { AuthContext } from '../../../Auth/AuthContext'
import { FILE_ICON } from '../../../../styles/abstract/variables'

function PlayerDetails({ match, history }) {
  const playersContext = useContext(ActivePlayerContext)
  const { activePlayer } = playersContext.state
  const {player} = activePlayer
  const { playerId } = match.params
  const authContext = useContext(AuthContext)
  const breadcrumbAction = () => {
    history.push('/players')
  }
  const replacements = {
    ':playerId': playerId
  }
  const [openModal, setOpenModal] = useState(false)

  const onSubmit = (values) => {
    let data = new FormData()
    data.set('user', JSON.stringify({
      ...values,
      country: values.country.value,
      citizenship: values.citizenship.value,
      gender: values.gender.value
    }))
    updatePlayerDetails({ authContext, playersContext, playerId, data })
    setOpenModal(false)
  }
  const onClose = () => setOpenModal(false)
  const onPress = () => setOpenModal(true)

  let playerDetails = []
  let profileDetails = {}
  if (player) {
    profileDetails = {
      header: 'player',
      name: player.firstName + ' ' + player.lastName,
      country: player.country && player.country.name,
      picture: player.profileImage && player.profileImage.url,
      flag: player.country && player.country.name,
      flagCode: player.country && player.country.code
    }
    playerDetails = {
      header: {
        title: 'Player details',
        icon: FILE_ICON,
        id: 'info'
      },
      info: [
        {
          title: 'NAME',
          text: player.firstName + ' ' + player.lastName
        },
        {
          title: 'SERIES/NO',
          text: player.identitySeries
        },
        {
          title: 'COUNTRY',
          text: player.country && player.country.name
        },
        {
          title: 'identity number',
          text: player.identityNumber
        },
        {
          title: 'CITIZENSHIP',
          text: player.citizenship && player.citizenship.name
        },
        {
          title: 'ADDRESS',
          text: player.address
        }
      ]
    }
  }
  return (
    <>
      {
        player &&
        <BrowserView>
          <PlayerViewWeb
            playerDetails={playerDetails}
            player={player}
            profile={profileDetails}
            onSubmit={onSubmit}
            onClose={onClose}
            onPress={onPress}
            openModal={openModal}
          />
        </BrowserView>
      }
      {
        player &&
        <MobileView>
          <TrailMob
            title={player && `${player.firstName} ${player.lastName}`}
            action={breadcrumbAction}
            routes={playerRoutes.slice().reverse()}
            replacements={replacements}
          />
          <PlayerViewMobile
            playerDetails={playerDetails}
            player={player}
            profile={profileDetails}
            onSubmit={onSubmit}
            onClose={onClose}
            onPress={onPress}
            openModal={openModal}
          />

        </MobileView>
      }

    </>
  )
}

export default withRouter(PlayerDetails)
