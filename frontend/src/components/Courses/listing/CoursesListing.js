import React from 'react'
import Paginator from '../../Global/Paginator/Paginator'
import _ from 'lodash'
import Table from '../../Global/Table/Table'
import { PageWrapperLeft, PageContent } from '../../../styles/shared/wrapper'
import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../../config/constants'
import { TOURNAMENT_LISTING_HEADERS, URL_TO_TYPE } from './TournamentsListing'
import { withRouter } from 'react-router-dom'
import EmptyData from '../../Global/EmptyData/EmptyData'
import { Loader } from '../../Global/InfiniteScroll'
import { CASHGAME_TITLE } from '../view/details/TournamentDetails'
import FiltersWeb from '../../Global/Filter/FiltersWeb'

function CoursesListing ({ tournaments, pagination, handlePagination, direction, orderBy, handleSort, handleFilter, clearFilters, removeFilter, filters, filterFields, match, loading, type }) {
  const festivals = {}
  const countFestivals = 0

  const widthPercents = ['10', '15', '15', '10', '10', '10', '15', '15']
  const data = []
  return (
    <PageContent type='web' flex>
      <PageWrapperLeft tournamentListing>
        {
          tournaments && tournaments.length !== 0 && (
            <>{
              _.map(tournaments, (tournament) => {
                console.log(tournament)
                const row = {
                  name: tournament.name && tournament.name,
                  date: moment(tournament.dateTime).format(DATETIME_FORMAT),
                  status: tournament.status,
                  players: `${Number(tournament.numberOfActivePlayers)}/${tournament.totalNumberOfPlayers}`,
                  tables: tournament.numberOfTables,
                  'buy-in': `${tournament.buyIn}`,
                  prizes: `${Number(tournament.calculatedPrizePool)}`,
                  link: `${match.path}/${tournament.id}`
                }
                data.push(row)
              })
            }
              <Table
                headers={TOURNAMENT_LISTING_HEADERS(URL_TO_TYPE[match.path])}
                data={data}
                noHeader={countFestivals > 1}
                widthPercents={widthPercents}
                direction={direction}
                orderBy={orderBy}
                handleSort={handleSort}
              />
              {
                pagination.pageCount > 1 && <Paginator pagination={pagination} handlePagination={handlePagination} />
              }
            </>)
        }
        {
          tournaments && tournaments.length === 0 &&
            <EmptyData data={'There aren\'t any results.'} />
        }
        {
          loading && <Loader />
        }
      </PageWrapperLeft>
    </PageContent>
  )
}

export default withRouter(CoursesListing)
