import React, { useEffect, useContext } from 'react'
import { getPlayerStatistics } from '../ActivePlayerActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { playerRoutes } from '../PlayerRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import PlayerStatisticsListingMobile from './PlayerStatisticsListingMobile'
import PlayerStatisticsListingWeb from './PlayerStatisticsListingWeb'
import { ActivePlayerContext } from '../ActivePlayerContext'

function PlayerStatisticsListing({ match, history, secondaryPage }) {
  const authContext = useContext(AuthContext)
  const playersContext = useContext(ActivePlayerContext)
  const { activePlayer: player, statistics } = playersContext.state
  const { playerId } = match.params
  const breadcrumbAction = () => {
    history.push('/players')
  }
  const replacements = {
    ':playerId': playerId
  }
  const dep = statistics && Object.keys(statistics).length
  useEffect(() => {
    player && getPlayerStatistics(authContext, playersContext, playerId)
  }, [dep])
  if (!statistics) {
    return <div/>
  }
  let payoutBuyInStatitstics = []

  if (statistics.payout) {
    for (const index of statistics.payout) {
      let stats = { name: '', value: '' }

      stats.name = index.name
      stats.value = parseInt(index.value)

      payoutBuyInStatitstics.push(stats)
    }
  }
  return (
    <>
      {
        player &&
        <>
          <BrowserView>
            {!secondaryPage && <SubmenuWeb routes={playerRoutes.slice().reverse()} replacements={replacements}/>}
            <PlayerStatisticsListingWeb
              payoutBuyInStatitstics={payoutBuyInStatitstics}
              averageBuyIn={statistics.averageBuyIn}
              table
            />
          </BrowserView>
          <MobileView>
            <TrailMob title={player && `${player.firstName} ${player.lastName}`} action={breadcrumbAction}
                      routes={playerRoutes.slice().reverse()} replacements={replacements}/>
            <PlayerStatisticsListingMobile
              payoutBuyInStatitstics={payoutBuyInStatitstics}
              averageBuyIn={statistics.averageBuyIn}
              table
              mobile
            />
          </MobileView>
        </>
      }
    </>
  )
}

export default withRouter(PlayerStatisticsListing)
