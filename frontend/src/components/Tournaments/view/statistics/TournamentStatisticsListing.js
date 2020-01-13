import React, { useEffect, useContext } from 'react'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { getTournamentStatistics } from '../ActiveTournamentActions'
import { BrowserView, MobileView } from 'react-device-detect'
import { AuthContext } from '../../../Auth/AuthContext'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import TournamentStatisticsListingWeb from './TournamentStatisticsListingWeb'
import TournamentStatisticsListingMobile from './TournamentStatisticsListingMobile'
import _ from 'lodash'

export function TournamentStatisticsListing({ match, history, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const { activeTournament: tournament, statistics: { list: statistics } } = tournamentsContext.state
  const { tournamentId } = match.params
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  const replacements = {
    ':tournamentId': tournamentId
  }
  useEffect(() => {
    tournament && getTournamentStatistics(authContext, tournamentsContext, tournamentId)
  }, [])
  let ageStatistics = [
    {
      name: '18-25',
      value: 0
    },
    {
      name: '26-35',
      value: 0
    },
    {
      name: '36-40',
      value: 0
    },
    {
      name: '41-50',
      value: 0
    },
    {
      name: '51-60',
      value: 0
    },
    {
      name: '61-100',
      value: 0
    }
  ]
  if (statistics.age) {
    for (const index of statistics.age) {
      if (index.name >= '18' && index.name <= '25') {
        ageStatistics[0].value = ageStatistics[0].value + parseInt(index.value)
      } else if (index.name >= '26' && index.name <= '35') {
        ageStatistics[1].value = ageStatistics[1].value + parseInt(index.value)
      } else if (index.name >= '36' && index.name <= '40') {
        ageStatistics[2].value = ageStatistics[2].value + parseInt(index.value)
      } else if (index.name >= '41' && index.name <= '50') {
        ageStatistics[3].value = ageStatistics[3].value + parseInt(index.value)
      } else if (index.name >= '51' && index.name <= '60') {
        ageStatistics[4].value = ageStatistics[4].value + parseInt(index.value)
      } else if (index.name >= '61' && index.name <= '100') {
        ageStatistics[5].value = ageStatistics[5].value + parseInt(index.value)
      }
    }
  }

  let countryStatistics = []
  if (statistics.country) {
    countryStatistics = _.map(statistics.country, (stat) => {
      return { name: stat.name, value: parseInt(stat.value) }
    })
  }

  let genderStatistics = []

  if (statistics.gender) {
    for (const index of statistics.gender) {
      let stats = { name: '', value: '' }

      stats.name = index.name
      stats.value = parseInt(index.value)

      genderStatistics.push(stats)
    }
  }

  let nationalityStatistics = []

  if (statistics.nationality) {
    for (const index of statistics.nationality) {
      let stats = { name: '', value: '' }

      stats.name = index.name
      stats.value = parseInt(index.value)

      nationalityStatistics.push(stats)
    }
  }

  return (
    <>
      {
        tournament &&
        <>
          <BrowserView>
            <SubmenuWeb routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
            <TournamentStatisticsListingWeb
              ageStatistics={ageStatistics}
              countryStatistics={countryStatistics}
              genderStatistics={genderStatistics}
              nationalityStatistics={nationalityStatistics}
            />
          </BrowserView>
          <MobileView>
            <TrailMob title={tournament && tournament.name} action={breadcrumbAction}
                      routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
            <TournamentStatisticsListingMobile
              ageStatistics={ageStatistics}
              countryStatistics={countryStatistics}
              genderStatistics={genderStatistics}
              nationalityStatistics={nationalityStatistics}
            />
          </MobileView>
        </>
      }
    </>
  )
}

export default withRouter(TournamentStatisticsListing)
