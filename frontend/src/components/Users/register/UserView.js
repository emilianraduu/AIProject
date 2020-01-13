import React, { useContext, useEffect } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import PlayerViewWeb from './PlayerViewWeb'
import { withRouter } from 'react-router-dom'
import { FILE_ICON } from '../../../styles/abstract/variables'
import { AuthContext } from '../../Auth/AuthContext'
import { getUserById } from '../UsersActions'
import { UsersContext } from '../UsersContext'

function TournamentPlayerView ({ match, history }) {
  const authContext = useContext(AuthContext)
  const usersContext = useContext(UsersContext)
  const { activeUser } = usersContext.state

  useEffect(() => {
    getUserById({ authContext, usersContext, userId: match.params.userId })
  }, [])
  const userDetails = {
    header: {
      title: 'User details',
      icon: FILE_ICON,
      id: 'info'
    }
  }

  if (activeUser) {
    userDetails.info = [
      {
        title: 'NAME',
        text: `${activeUser.firstName} ${activeUser.lastName}`
      },
      {
        title: 'Identity Number',
        text: activeUser.identityNumber || '-'
      },
      {
        title: 'SERIES/NO',
        text: activeUser.identitySeries || '-'
      },
      {
        title: 'COUNTRY',
        text: (activeUser.country && activeUser.country.name) || '-'
      },

      {
        title: 'CITIZENSHIP',
        text: (activeUser.citizenship && activeUser.citizenship.name) || '-'
      },
      {
        title: 'ADDRESS',
        text: activeUser.address || '-'
      }
    ]
  }
  return (
    <>
      <BrowserView>
        <PlayerViewWeb
          userDetails={userDetails}
          activeUser={activeUser}
          history={history}
        />
      </BrowserView>
      <MobileView>
        {/* <TournamentPlayerViewMobile */}
        {/*  onSubmit={onSubmit} */}
        {/* /> */}
      </MobileView>

    </>
  )
}

export default withRouter(TournamentPlayerView)
