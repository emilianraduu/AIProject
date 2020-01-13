import React, { useEffect, useContext } from 'react'
import { changePlayerHistoriesPage, getPlayerHistories } from '../ActivePlayerActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import PlayerHistoriesListingMobile from './PlayerHistoriesListingMobile'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { playerRoutes } from '../PlayerRouter'
import { ActivePlayerContext } from '../ActivePlayerContext'
import PlayerHistoriesListingWeb from './PlayerHistoriesListingWeb'
import { DEBOUNCE_MS } from '../../../../config/constants'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'

export const PLAYER_HISTORY_HEADERS = [
  {
    name: 'date',
    dbName: 'player.date',
    sortable: true
  },
  {
    name: 'name',
    dbName: 'player.name',
    sortable: true
  },
  {
    name: 'place',
    dbName: 'player.place',
    sortable: true
  },
  {
    name: 'buy-in',
    dbName: 'player.buyIn',
    sortable: true
  },
  {
    name: 'payout',
    dbName: 'player.payout',
    sortable: true
  }
]

function PlayerHistoriesListing({ match, history,secondaryPage }) {
  const authContext = useContext(AuthContext)
  const playersContext = useContext(ActivePlayerContext)
  const { histories: { pagination, list: histories }, activePlayer: player } = playersContext.state
  const { playerId } = match.params
  const handlePagination = page => changePlayerHistoriesPage(playersContext, page)
  const breadcrumbAction = () => {
    history.push('/players')
  }
  const replacements = {
    ':playerId': playerId
  }
  useEffect(() => {
    const timer = setTimeout(() => getPlayerHistories(authContext, playersContext, playerId, pagination.page), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [pagination.page, player])
  return (
    <>
      <BrowserView style={{ width: '100%' }}>
        {!secondaryPage && <SubmenuWeb routes={playerRoutes.slice().reverse()} replacements={replacements} />}
        <PlayerHistoriesListingWeb
          secondaryPage={secondaryPage}
          histories={histories[pagination.page]}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      </BrowserView>
      <MobileView>
        <TrailMob title={player && `${player.firstName} ${player.lastName}`} action={breadcrumbAction}
                  routes={playerRoutes.slice().reverse()} replacements={replacements}/>
        <PlayerHistoriesListingMobile
          histories={_.reduce(histories, (a, b) => a.concat(b), [])}
          pagination={pagination}
          handlePagination={handlePagination}
        />
      </MobileView>
    </>
  )
}

export default withRouter(PlayerHistoriesListing)
