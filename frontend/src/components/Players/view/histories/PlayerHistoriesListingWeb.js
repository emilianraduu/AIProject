import React from 'react'
import HistoryTable from '../../../Global/Table/HistoryTable'

import _ from 'lodash'
import { PLAYER_HISTORY_HEADERS } from './PlayerHistoriesListing'
import { PageContent } from '../../../../styles/shared/wrapper'

export default function PlayerHistoriesListingWeb({ logs, pagination, handlePagination, histories, secondaryPage }) {
  const widthPercents = ['20', '20', '20', '20', '20']

  const data = []
  _.map(histories, (history) => {
    let row = {
      date: history.date,
      name: history.name,
      place: history.place,
      'buy-in': history.buyIn,
      payout: history.payout,
      link: `/tournaments/${history.logId}`
    }
    data.push(row)
  })
  return (
    <>
      {
        !secondaryPage &&
        <PageContent type={'web'} details>
          <HistoryTable
            headers={PLAYER_HISTORY_HEADERS}
            data={data}
            widthPercents={widthPercents}
          />
        </PageContent>
      }
      {
        secondaryPage &&
        <HistoryTable
          headers={PLAYER_HISTORY_HEADERS}
          data={data}
          widthPercents={widthPercents}
        />
      }

    </>
  )
}
