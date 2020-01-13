import React, { useContext, useEffect, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import TablesListingMobile from './TournamentTablesListingMobile'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import TablesListingWeb from './TournamentTablesListingWeb'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import {
  applyTournamentTablesFilter,
  clearTournamentTablesFilters, getTournamentTables,
  removeTournamentTablesFilter
} from '../ActiveTournamentActions'
import { AuthContext } from '../../../Auth/AuthContext'

export const TOURNAMENT_TABLES_FILTER_HEADERS = [
  {
    name: 'status',
    dbName: 'status',
    type: 'select',
    operator: '=',
    options: ['open', 'closed']
  },
  {
    name: 'tables',
    dbName: 'number',
    type: 'text',
    operator: '='
  }
]

export function TournamentTablesListing({ match, history, type }) {
  const tournamentsContext = useContext(ActiveTournamentContext)
  const authContext = useContext(AuthContext)
  const { activeTournament: tournament, tablesFilters } = tournamentsContext.state
  const { tournamentId } = match.params
  const handleFilter = filter => applyTournamentTablesFilter(tournamentsContext, tournamentId, filter)
  const clearFilters = () => clearTournamentTablesFilters(tournamentsContext, tournamentId)
  const removeFilter = (filterKey) => removeTournamentTablesFilter(tournamentsContext, filterKey)
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }

  useEffect(() => {
    getTournamentTables({ tournamentsContext, tournamentId, authContext })
  }, [])
  console.log(tournament)
  const replacements = {
    ':tournamentId': tournamentId
  }
  return (
    <>

      <BrowserView>
        <SubmenuWeb routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
        <TablesListingWeb
          tournament={tournament}
          filterFields={TOURNAMENT_TABLES_FILTER_HEADERS}
          filters={tablesFilters}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
          removeFilter={removeFilter}
        />
      </BrowserView>
      <MobileView>
        <TrailMob
          title={tournament && tournament.name}
          action={breadcrumbAction}
          routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}
        />
        <TablesListingMobile
          tournament={tournament}
        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentTablesListing)
