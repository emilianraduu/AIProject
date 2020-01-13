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

function TournamentsListingWeb ({ tournaments, pagination, handlePagination, direction, orderBy, handleSort, handleFilter, clearFilters, removeFilter, filters, filterFields, match, loading, type }) {
  const festivals = {}
  const countFestivals = 0
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
  const widthPercents = ['10', '15', '15', '10', '10', '10', '15', '15']
  const data = []
  return (
    <PageContent type='web' flex>
      <PageWrapperLeft tournamentListing>
        <FiltersWeb
          filterFields={filterFields}
          filters={filters}
          removeFilter={removeFilter}
          handleFilter={handleFilter}
          button={{ url: `/${type}/create`, text: `Add ${type}` }}
        />
        {}
        {
          tournaments && tournaments.length !== 0 && (
            <>{
              _.map(tournaments, (tournament) => {
                const row = {
                  festival: tournament.festival && tournament.festival.name,
                  date: moment(tournament.dateTime).format(DATETIME_FORMAT),
                  name: tournament.name,
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
      {/* <PageWrapperRight tournamentListing>
        <Link to={`/${type}/create`} style={{ alignSelf: 'flex-end' }}>
          <SecondaryButton filled spaceBottom tournaments>Add {type}</SecondaryButton>
        </Link>
        <CalendarComponentWeb
          handleFilter={handleFilter}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
          filterFields={filterFields}
          filters={filters}
        />
      </PageWrapperRight> */}
    </PageContent>
  )
}

export default withRouter(TournamentsListingWeb)
