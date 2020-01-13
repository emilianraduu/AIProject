import React from 'react'
import { TablePlayerWrapper } from './style'
import { ProfileBoxLeft, ProfileBoxRight } from '../../../Global/Box/styles/box'
import { Avatar } from '../../../../styles/shared/avatar'
import { NormalP, SmallP } from '../../../../styles/typography/typography'

export default function TournamentTableNoPlayer({seatNo}) {
  return (
    <TablePlayerWrapper>
      <ProfileBoxLeft small>
        <Avatar none/>
      </ProfileBoxLeft>

      <ProfileBoxRight>
        <NormalP>Free place</NormalP>
        <SmallP space>
          # {seatNo}
        </SmallP></ProfileBoxRight>
    </TablePlayerWrapper>
  )
}