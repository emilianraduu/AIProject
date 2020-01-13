import React, { useState } from 'react'
import {  TablePlayerWrapper } from './style'
import { Avatar } from '../../../../styles/shared/avatar'
import {  NormalP, SmallP } from '../../../../styles/typography/typography'
import Flag from 'react-world-flags'
import { ProfileBoxLeft, ProfileBoxRight } from '../../../Global/Box/styles/box'
import TournamentTablePlayerModal from './TournamentTablePlayerModal'

export default function TournamentTablePlayer({ player, table, availableSeats, waiting }) {
  const [expand, setExpand] = useState(false)
  if (!player) return (<></>)
  return (
    <TablePlayerWrapper pointer active={expand}>
      <div style={{ display: 'flex', width: '100%', marginRight: 5 }} onClick={() => setExpand(!expand)}>
        <div style={{alignSelf: 'center'}}>
          <SmallP>#{player.seatNo}</SmallP>
        </div>
        <ProfileBoxLeft small>
          <Avatar url={player.user.profileImage && player.user.profileImage.url}/>
        </ProfileBoxLeft>

        <ProfileBoxRight>
          <NormalP>{player.user && player.user.firstName} {player.user && player.user.lastName}</NormalP>
          <SmallP space>
            {
              player.user && player.user.country &&
              <><Flag code={player.user.country.code} height={10}
              />{player.user.country.name}</>

            }
        </SmallP>
        </ProfileBoxRight>
      </div>
      <TournamentTablePlayerModal expand={expand} table={table} setExpand={setExpand} player={player} availableSeats={availableSeats} waiting={waiting}/>
    </TablePlayerWrapper>

  )
}

