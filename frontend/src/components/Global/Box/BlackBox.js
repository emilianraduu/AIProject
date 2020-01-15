import React, { useContext } from 'react'
import {
  BlackBoxAvatar, BlackBoxAvatarImage,
  BlackBoxContent, BlackBoxContentDetails,
  BlackBoxContentItem,
  BlackBoxHeader,
  BlackBoxHeaderItem,
  BoxContent,
  BoxWrapper
} from './styles/box'
import { BigP, BigPBold, NormalP, WhitePLink } from '../../../styles/typography/typography'
import { Link } from 'react-router-dom'
import { PLAY_ICON } from '../../../styles/abstract/variables'
import { SecondaryButton } from '../../../styles/shared/button'
import { AuthContext } from '../../Auth/AuthContext'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { sortByKey } from '../../../helpers/sortHelpers' //
export default function BlackBox({ info }) {
  const authContext = useContext(AuthContext)
  var minutes = Math.floor(parseInt(info.secondsPlayed) / 60)
  var seconds = parseInt(info.secondsPlayed) - minutes * 60
  var time = minutes + ':' + seconds
  return (
    <BoxWrapper blackBox>
      <BoxContent blackBox>
        <BlackBoxHeader>
          <BlackBoxHeaderItem>
            <i className={PLAY_ICON}/>
          </BlackBoxHeaderItem>
          <BlackBoxHeaderItem>
            <BigPBold>{info.tournament.status.toUpperCase()}:</BigPBold>
            <BigP>{info.tournament.name}</BigP>
          </BlackBoxHeaderItem>
          <BlackBoxHeaderItem>
            <Link to={`/tournaments/${info.tournament.id}`}>
              <WhitePLink>Go to tournament</WhitePLink>
            </Link>
          </BlackBoxHeaderItem>
        </BlackBoxHeader>
        <BlackBoxContent>
          <BlackBoxContentItem>
            <BlackBoxAvatar>
              <BlackBoxAvatarImage chip/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails>
              <BigPBold>{info.tournament.numberOfChips - info.chips}</BigPBold>
              <NormalP>Chips left</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
          <BlackBoxContentItem>
            <BlackBoxAvatar>
              <BlackBoxAvatarImage seat/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails>
              <BigPBold>Table {info.table ? info.table.number : ''}</BigPBold>
              <NormalP>Seat no {info.seatNo ? info.seatNo : 'Kicked'}</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
          <BlackBoxContentItem>
            <BlackBoxAvatar>
              <BlackBoxAvatarImage hands/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails>
              <BigPBold>0</BigPBold>
              <NormalP>Played hands</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
          <BlackBoxContentItem>
            <BlackBoxAvatar>
              <BlackBoxAvatarImage gameTime/>
            </BlackBoxAvatar>
            <BlackBoxContentDetails>
              <BigPBold>{time}</BigPBold>
              <NormalP>In game time</NormalP>
            </BlackBoxContentDetails>
          </BlackBoxContentItem>
        </BlackBoxContent>
        {
          info.payments &&
          <div style={{ paddingTop: 15, paddingBottom: 15 }}>
            <BlackBoxHeader>
              <div>Payments:</div>
            </BlackBoxHeader>
            {
              info.payments.sort((a, b) => sortByKey(b, a, 'createdAt')).map((payment, index) => (
                <BlackBoxContent key={index} style={{ color: '#fff' }}>
                  <div>#{info.payments.length - index}</div>
                  <div>type: {payment.type}</div>
                  <div>amount: {payment.amount}</div>
                  <div>is reentry: {payment.isReentry.toString()}</div>
                </BlackBoxContent>
              ))
            }
          </div>
        }
        <BlackBoxHeader>
          <Link to={`/tournaments/${info.tournament.id}/players/create/${info.id}`}>
            <SecondaryButton type={'button'} rightMargin
            >
              PAYMENT PAGE
            </SecondaryButton>
          </Link>
          {
            info.status === 'bust' &&
            <SecondaryButton type={'button'} rightMargin>
              UNBUST
            </SecondaryButton>
          }
          {
            info.tournament.status !== 'closed' &&
            <SecondaryButton red type={'button'} rightMargin
                             onClick={() => confirmAlert({
                               title: 'Warning',
                               message: 'Are you sure you want to delete player?',
                               closeOnEscape: true,
                               closeOnClickOutside: true,
                               buttons: [
                                 {
                                   label: 'Ok',
                                 },
                                 {
                                   label: 'Cancel',
                                   onClick: () => {
                                   }
                                 }
                               ]
                             })}>
              DELETE PLAYER
            </SecondaryButton>
          }
        </BlackBoxHeader>
      </BoxContent>
    </BoxWrapper>
  )
}
