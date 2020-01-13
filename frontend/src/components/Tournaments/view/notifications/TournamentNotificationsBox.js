import React from 'react'
import Box from '../../../Global/Box/Box'

export default function TournamentNotificationsBox({ notification }) {

  return (
    notification &&
    <Box
      status={notification.type}
      header={{
        title: [notification.title],
        subTitle: [notification.message]
      }}/>
  )
}