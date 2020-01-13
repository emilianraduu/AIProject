import React, { useContext } from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import Masonry from 'react-masonry-component'
import InfoBox from '../../Global/Box/InfoBox'
import PlayerProfilePhoto from './UsersProfilePhoto'
import PlayerPayment from './PlayerPayment'
import PlayerIdCard from './PlayerIDCard'
import { updateUserDetails } from '../../Auth/AuthActions'
import { AuthContext } from '../../Auth/AuthContext'
import { getUserById } from '../UsersActions'
import { UsersContext } from '../UsersContext'

export default function TournamentPlayerViewWeb ({
  onSubmit,
  userDetails,
  activeUser
}) {
  const authContext = useContext(AuthContext)
  const usersContext = useContext(UsersContext)
  const onPhotoSubmit = ({ userId, data }) => {
    const newData = new FormData()
    newData.set('profilePicture', data)
    updateUserDetails({ userId, data: newData, authContext })
  }

  const onIDSubmit = ({ userId, data }) => {
    const newData = new FormData()
    newData.set('identityImage', data)
    updateUserDetails({
      userId,
      data: newData,
      authContext,
      onSuccess: () =>
        getUserById({
          authContext,
          usersContext,
          userId: activeUser.id
        })
    })
  }
  return (
    <PageContent type='web'>
      {/* <GreyH5
        onClick={() =>
          history.push(`/tournaments/${activeTournament.id}/players`)}
      >
        <i className={ARROW_LEFT_ICON} /> Back to players list
      </GreyH5> */}
      <Masonry>
        {activeUser && (
          <>
            <InfoBox
              web
              header={userDetails.header}
              infos={userDetails.info}
              expand=''
              noLink
              noEdit
            />

            <PlayerProfilePhoto
              web
              onPhotoSubmit={onPhotoSubmit}
              userId={activeUser && activeUser.id}
              profileImage={
                activeUser &&
                activeUser.profileImage
              }
            />

            <PlayerIdCard
              web
              onPhotoSubmit={onIDSubmit}
              userId={activeUser && activeUser.id}
              identityImage={
                activeUser &&
                activeUser.identityImage
              }
            />
            <PlayerPayment
              web
              activeTournament={{ name: 'da' }}
              onSubmit={onSubmit}
              activeUser={activeUser}
            />
          </>
        )}
      </Masonry>
    </PageContent>
  )
}
