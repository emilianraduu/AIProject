import React from 'react'
import {
  PageContent
} from '../../../styles/shared/wrapper'
import _ from 'lodash'
import InfiniteScroll, { Loader } from '../../Global/InfiniteScroll'
import TournamentsFestivalListing from './TournamentsFestivalListing'
import EmptyData from '../../Global/EmptyData/EmptyData'
import CoursesBox from '../CoursesBox'

export default function TournamentsListingMobile({ tournaments, pagination, handlePagination, match, loading, type }) {
  let festivals = {}
  if (tournaments) {
    for (const tournament of tournaments) {
      let festival = { id: '', name: '' }
      if (tournament.festival) {
        festival = tournament.festival
      }
      if (!festivals[festival.id]) {
        festivals[festival.id] = festival
        festivals[festival.id].tournaments = []
      }
      festivals[festival.id].tournaments.push(tournament)
    }
  }
  return (
    <PageContent>
      <InfiniteScroll data={tournaments} pagination={pagination} handlePagination={handlePagination}>
        {
          tournaments.length !== 0 &&
          // _.map(festivals, (festival, index) => {
          //   return (
          //     <TournamentsFestivalListing
          //       match={match}
          //       type={type}
          //       festival={festival}
          //       key={index}
          //     />
          //   )
          // })
            tournaments.map((tournament, index) => {
              return (
                <CoursesBox type={type} match={match} data={tournament} key={index}/>
              )
            })
        }
        {
          loading && <Loader/>
        }
        {
          tournaments.length === 0 && !loading &&
          <EmptyData data={'No tournaments yet'} button={'/tournaments/create'} buttonText={'Add tournament'}/>
        }
      </InfiniteScroll>
    </PageContent>
  )

}
