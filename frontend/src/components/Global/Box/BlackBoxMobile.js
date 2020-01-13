import React from 'react'
import {
  BlackBoxAvatar, BlackBoxAvatarImage,
  BlackBoxContent, BlackBoxContentDetails,
  BlackBoxContentItem,
  BlackBoxHeader,
  BoxContent,
  BoxWrapper
} from './styles/box'
import { BigP, BigPBold, NormalP } from '../../../styles/typography/typography'

export default function BlackBoxMobile({ info }) {
  var minutes = Math.floor(parseInt(info.secondsPlayed) / 60)
  var seconds = parseInt(info.secondsPlayed) - minutes * 60
  var time = minutes + ':' + seconds
  return (
    <BoxWrapper blackBoxMobile>
      <BoxContent blackBox>
        <BlackBoxHeader mobile>
          <BigPBold>In game</BigPBold>
          <BigP>{info.tournament.name}</BigP>
          {/*<BlackBoxHeaderItem>*/}
          {/*<Link to={`/tournaments/${info.tournament.id}`} >*/}
          {/*<WhitePLink>Go to tournament</WhitePLink>*/}
          {/*</Link>*/}
          {/*</BlackBoxHeaderItem>*/}
        </BlackBoxHeader>
        <BlackBoxContent mobile>
          <BlackBoxContentItem mobile>
            <BlackBoxAvatar mobile>
              <BlackBoxAvatarImage mobile chip/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails mobile>
              <BigPBold blackBoxMobile>{info.tournament.numberOfChips - info.chips}</BigPBold>
              <NormalP>(Chips left)</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
          <BlackBoxContentItem mobile>
            <BlackBoxAvatar mobile>
              <BlackBoxAvatarImage mobile seat/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails mobile>
              <BigPBold blackBoxMobile>Table {info.table.number}</BigPBold>
              <NormalP>(Seat no {info.seatNo})</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
          <BlackBoxContentItem mobile>
            <BlackBoxAvatar mobile>
              <BlackBoxAvatarImage mobile hands/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails mobile>
              <BigPBold blackBoxMobile>0</BigPBold>
              <NormalP>(Played hands)</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
          <BlackBoxContentItem mobile>
            <BlackBoxAvatar mobile>
              <BlackBoxAvatarImage mobile gameTime/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails mobile>
              <BigPBold blackBoxMobile>{time}</BigPBold>
              <NormalP>(In game time)</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
        </BlackBoxContent>
      </BoxContent>
    </BoxWrapper>
  )
}
