import React from 'react'
import Box from '../Global/Box/Box'

import moment from 'moment-timezone'
import { DATE_FORMAT } from '../../config/constants'

export default function PlayerBox({ player }) {
  return (
    <Box
      header={{
        title: [player.firstName, player.lastName],
        subTitle: [],
        flag: player.country && player.country.name,
        flagCode: player.country && player.country.code
      }}
      link={{ url: `/players/${player.id}`, text: 'Go to player' }}
      expand={{
        // email: player.email,
        tournaments: player.playersCount,
        since: moment(player.createdAt).format(DATE_FORMAT),
        wins: player.prizesCount,
        'buy-in': player.totalBuyIn
      }}/>
  )
}