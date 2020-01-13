import React from 'react'
import InfiniteScroll from '../../../Global/InfiniteScroll'
import { PageContent } from '../../../../styles/shared/wrapper'
import TournamentReportBox from './TournamentReportBox'
import ReportsBox from './ReportsBox/ReportsBox'
import _ from 'lodash'
import EmptyData from '../../../Global/EmptyData/EmptyData'


export default function TournamentReportsListingMobile({ reports, pagination, handlePagination, tournament }) {
  let boxData = {}
  if (reports && tournament) {
    boxData = [
      {
        name: 'Total Cashed In',
        value: 0
      },
      {
        name: 'Buy in per player',
        value: tournament.buyIn
      },
      {
        name: 'Total Prizes',
        value: 0
      }
    ]
    _.map(reports, (report) => {
      boxData[0].value += parseInt(report.amount)
    })
    _.map(tournament.prizes, (prize) => {
      boxData[2].value += parseInt(prize.amount) * parseInt(prize.value)
    })
    if (boxData[0].value >= 1000 && boxData[0].value < 1000000) {
      boxData[0].value = boxData[0].value / 1000 + 'K'
    } else if (boxData[0].value >= 1000000) {
      boxData[0].value = boxData[0].value / 1000000 + 'M'
    }
    if (boxData[1].value >= 1000 && boxData[1].value < 1000000) {
      boxData[1].value = boxData[1].value / 1000 + 'K'
    } else if (boxData[1].value >= 1000000) {
      boxData[1].value = boxData[1].value / 1000000 + 'M'
    }
    if (boxData[2].value >= 1000 && boxData[2].value < 1000000) {
      boxData[2].value = boxData[2].value / 1000 + 'K'
    } else if (boxData[2].value >= 1000000) {
      boxData[2].value = boxData[2].value / 1000000 + 'M'
    }

  }
  return (
    <InfiniteScroll data={reports} pagination={pagination} handlePagination={handlePagination}>
      <PageContent>
        <ReportsBox
          headers={'Players Stats'}
          datas={reports && {
            'name': 'Total entries',
            'value': reports.length
          }}
        />
        <ReportsBox
          headers={'Cash flow'}
          datas={boxData}
        />
        {
          reports.length !== 0 ?
            <>
              {
                reports.map((report, index) => {
                  return (
                    <TournamentReportBox report={report} key={index}/>
                  )
                })
              }
            </>
            :
            <EmptyData data={'No reports yet!'}/>
        }
      </PageContent>
    </InfiniteScroll>
  )
}
