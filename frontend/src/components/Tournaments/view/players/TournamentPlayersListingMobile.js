import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll, { Loader } from '../../../Global/InfiniteScroll'
import TournamentPlayerBox from './TournamentPlayerBox'
import { PageContent } from '../../../../styles/shared/wrapper'
import { SecondaryButton } from '../../../../styles/shared/button'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function TournamentPlayersListingMobile({ players, pagination, handlePagination, tournament, loading, isRegistering }) {
  return (

    <PageContent>
      <InfiniteScroll data={players} pagination={pagination} handlePagination={handlePagination}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
           <Link to={`/tournaments/${tournament.id}/players/create`}>
            <SecondaryButton mobile>Add
              player</SecondaryButton>
          </Link>
        </div>
        {
          players.length !== 0 &&
          players.map((player, index) => {
            return (
              <TournamentPlayerBox player={player} key={index} tournamentId={tournament.id} />
            )
          })
        }
        {
          loading && <Loader />
        }

      </InfiniteScroll>
      {
        players.length === 0 && !loading && <EmptyData data={'No players atm'} />
      }
    </PageContent>
  )
}
