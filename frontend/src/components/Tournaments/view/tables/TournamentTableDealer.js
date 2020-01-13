import React from 'react'
import { TablePlayerWrapper } from './style'
import { ProfileBoxLeft, ProfileBoxRight } from '../../../Global/Box/styles/box'
import { Avatar } from '../../../../styles/shared/avatar'
import { NormalP, SmallP } from '../../../../styles/typography/typography'

export default function TournamentTableDealer({seatNo, onClick, ...rest}) {
  return (
      rest.id ?
        <TablePlayerWrapper pointer dealer onClick={onClick}>
          <ProfileBoxLeft small>
            <Avatar url={rest.profileImage && rest.profileImage.url} />
          </ProfileBoxLeft>

          <ProfileBoxRight>
            <NormalP>{rest.firstName} {rest.lastName}</NormalP>
            <SmallP space>
              Dealer
            </SmallP></ProfileBoxRight>
        </TablePlayerWrapper>
        :
        <TablePlayerWrapper pointer dealer onClick={onClick}>
          <ProfileBoxLeft small>
            <Avatar />
          </ProfileBoxLeft>

          <ProfileBoxRight>
            <NormalP>No dealer</NormalP>
            <SmallP space>
              Press to assign dealer
            </SmallP></ProfileBoxRight>
        </TablePlayerWrapper>

  )
}