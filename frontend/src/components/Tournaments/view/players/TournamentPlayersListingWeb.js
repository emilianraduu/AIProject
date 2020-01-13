import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import Table from '../../../Global/Table/Table'
import { TOURNAMENT_PLAYERS_HEADERS } from './TournamentPlayersListing'
import FiltersWeb from '../../../Global/Filter/FiltersWeb'
import Paginator from '../../../Global/Paginator/Paginator'
import _ from 'lodash'
import EmptyData from '../../../Global/EmptyData/EmptyData'
import { Loader } from '../../../Global/InfiniteScroll'
import { sortByKey } from '../../../../helpers/sortHelpers'

export default function TournamentPlayersListingWeb ({
  players,
  pagination,
  handlePagination,
  direction,
  orderBy,
  handleSort,
  fields,
  filters,
  filterFields,
  removeFilter,
  handleFilter,
  clearFilters,
  tournament,
  loading,
  isRegistering
}) {
  const data = []
  const widthPercents = ['5', '15', '15', '15', '15', '15', '10', '10']
  _.map(players, player => {
    const ticketID = player.payments.sort((b, a) =>
      sortByKey(a, b, 'createdAt')
    )
    const row = {
      place: player.seatNo,
      name: {
        text: player.user && `${player.user.firstName} ${player.user.lastName}`,
        url:
          player.user &&
          player.user.profileImage &&
          player.user.profileImage.url
      },
      email: player.user && player.user.email,
      country: {
        flag: player.user.country && player.user.country.name,
        flagCode: player.user.country && player.user.country.code
      },
      table: player.table && player.table.number,
      status: player.status,
      chips: player.chips,
      ticketID: ticketID && ticketID[0] && ticketID[0].id,
      'game time': player.secondsPlayed,
      link: `/players/${player.user && player.user.id}`
    }
    data.push(row)
  })
  return (
    <PageContent type='web'>
      <FiltersWeb
        filterFields={filterFields}
        filters={filters}
        removeFilter={removeFilter}
        handleFilter={handleFilter}
        button={
          tournament.status !== 'hidden' &&
          tournament.status !== 'closed' && {
            url: `/tournaments/${tournament.id}/players/create`,
            text: 'Add player'
          }
        }
      />
      {data.length !== 0 && (
        <>
          (
          <Table
            headers={TOURNAMENT_PLAYERS_HEADERS}
            data={data}
            orderBy={orderBy}
            direction={direction}
            widthPercents={widthPercents}
            handleSort={handleSort}
            handleFilter={handleFilter}
            clearFilters={clearFilters}
          >
            {/* <div style={{position: 'absolute', right: 0, top: '30px'}}> */}
            {/*  sssss */}
            {/*  { */}
            {/*    console.log(data) */}
            {/*  } */}
            {/* </div> */}
          </Table>
          )
          {pagination.pageCount > 1 && (
            <Paginator
              pagination={pagination}
              handlePagination={handlePagination}
            />
          )}
        </>
      )}
      {data.length === 0 && !loading && (
        <EmptyData data='No players yet! Add some players!' />
      )}
      {loading && <Loader />}
    </PageContent>
  )
}
