import React, { useEffect, useContext } from 'react'
import { StatisticsContext } from '../StatisticsContext'
import { getStatistics } from '../StatisticsActions'
import { BrowserView, MobileView } from 'react-device-detect'
import StatisticsListingMobile from './StatisticsListingMobile'
import StatisticsListingWeb from './StatisticsListingWeb'
import { AuthContext } from '../../Auth/AuthContext'

export default function StatisticsListing() {
  const authContext = useContext(AuthContext)
  const statisticsContext = useContext(StatisticsContext)
  const { statistics } = statisticsContext.state
  const dep = Object.keys(statisticsContext.state).length
  useEffect(() => {
    getStatistics(authContext, statisticsContext)
  }, [dep])
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
      if (Number(index.name) >= 18 && Number(index.name) <= 25) {
        ageStatistics[0].value = ageStatistics[0].value + parseInt(index.value)
      } else if (Number(index.name) >= 26 && Number(index.name) <= 35) {
        ageStatistics[1].value = ageStatistics[1].value + parseInt(index.value)
      } else if (Number(index.name) >= 36 && Number(index.name) <= 40) {
        ageStatistics[2].value = ageStatistics[2].value + parseInt(index.value)
      } else if (Number(index.name) >= 41 && Number(index.name) <= 50) {
        ageStatistics[3].value = ageStatistics[3].value + parseInt(index.value)
      } else if (Number(index.name) >= 51 && Number(index.name) <= 60) {
        ageStatistics[4].value = ageStatistics[4].value + parseInt(index.value)
      } else if (Number(index.name) >= 61 && Number(index.name) <= 100) {
        ageStatistics[5].value = ageStatistics[5].value + parseInt(index.value)
      }
    }
  }
  let countryStatistics = []

  if (statistics.country) {
    for (const index of statistics.country) {
      let stats = { name: '', value: '' }

      stats.name = index.name
      stats.value = parseInt(index.value)

      countryStatistics.push(stats)
    }
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

  if(statistics.nationality) {
    for (const index of statistics.nationality) {
      let stats = { name: '', value: '' }

      stats.name = index.name
      stats.value = parseInt(index.value)

      nationalityStatistics.push(stats)
    }
  }

  return (
    <>
      <BrowserView>
        <StatisticsListingWeb
          ageStatistics = {ageStatistics}
          countryStatistics = {countryStatistics}
          genderStatistics = {genderStatistics}
          nationalityStatistics = {nationalityStatistics}
        />
      </BrowserView>
      <MobileView>
        <StatisticsListingMobile
          ageStatistics = {ageStatistics}
          countryStatistics = {countryStatistics}
          genderStatistics = {genderStatistics}
          nationalityStatistics = {nationalityStatistics}
        />
      </MobileView>
    </>
  )
}