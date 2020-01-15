import React from 'react'

import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../config/constants'
import Box from '../Global/Box/Box'
import { CASHGAME_TITLE, CASHGAME_TYPE } from './view/details/TournamentDetails'

export default function CoursesBox({ data, match, type }) {
  return (
    <Box
      header={{ title: [data.name], subTitle: [data.festival && data.festival.name] }}
      status={data.status}
      festival={moment(data.dateTime).format(DATETIME_FORMAT)}
      link={{ url: `${match.path}/${data.id}`, text: 'Go to event!' }}
      expand={type !== CASHGAME_TYPE ? {
        players: `${Number(data.playersCount)}/${data.numberOfTables * data.availableSeats} `,
        table: data.numberOfTables,
        fee: `${data.buyIn}$`,
        prize: `${Number(data.totalPrizes)}$`
      }
        : {
          players: `${Number(data.playersCount)}/${data.maxPlayers} `,
          table: data.numberOfTables,
          'Minimum Buy In': `${data.buyIn}$`,
          blinds: (data && data.blinds && data.blinds[0] && data.blinds[0].smallBlind && data.blinds[0].bigBlind) ? `${Number(data.blinds[0].smallBlind)}/${Number(data.blinds[0].bigBlind)}` : '0/0'
        }}
    />
  )
}
