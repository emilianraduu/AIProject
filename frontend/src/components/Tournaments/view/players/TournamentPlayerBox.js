import React from 'react'
import Box from '../../../Global/Box/Box'

export default function TournamentPlayerBox({ player, tournamentId }) {
  return (
    <>
      <Box
        header={{
          title: [player.user.firstName, player.user.lastName],
          subTitle: [],
          flag: player.user && player.user.country && player.user.country.name,
          flagCode: player.user && player.user.country && player.user.country.code
        }}
        link={{ url: `/tournaments/${tournamentId}/players/${player.id}`, text: 'Go to player' }}
        expand={{
          email: player.user.email,
          table: player.table ? player.table.number : '/',
          chips: player.chips,
          gameTime: player.secondsPlayed
        }}
      />
    </>
  )
}
