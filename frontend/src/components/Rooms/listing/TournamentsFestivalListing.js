import React, { useState } from 'react'
import { FestivalTours, Icon, TitleWithMinimize, WrapperFestival } from '../../../styles/shared/wrapper'
import { P } from '../../../styles/typography/typography'
import CoursesBox from '../CoursesBox'
import { MINUS_SQUARE_ICON, PLUS_SQUARE_ICON } from '../../../styles/abstract/variables'

export default function TournamentsFestivalListing({ index, festival, match, type }) {
  const [show, setShow] = useState(false)
  return (
    <WrapperFestival key={index}>
      <TitleWithMinimize>
        <Icon><i className={show ? PLUS_SQUARE_ICON : MINUS_SQUARE_ICON} onClick={() => setShow(!show)}/></Icon>
        <P>{festival.name}</P>
      </TitleWithMinimize>
      <FestivalTours hide={show}>
        {
          festival.tournaments.map((tournament, index) => {
            return (
              <CoursesBox type={type} match={match} data={tournament} key={index}/>
            )
          })
        }
      </FestivalTours>
    </WrapperFestival>
  )
}