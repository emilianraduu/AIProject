import React from 'react'
import _ from 'lodash'
import { STAFF_HISTORY_HEADERS } from './StaffHistoriesListing'
import HistoryTable from '../../../Global/Table/HistoryTable'
import { PageContent } from '../../../../styles/shared/wrapper'


export default function StaffHistoriesListingWeb({ histories, secondaryPage }) {
  const widthPercents = ['33', '33', '33']
  const data = []
  _.map(histories, (history) => {
    let row = {
      name: history.name,
      actions: history.count,
      'cashed-in': history.amount,
      link: `/tournaments/${history.logId}`
    }
    data.push(row)
  })
  return (
    <>
      {!secondaryPage &&
      <PageContent type={'web'} details>
        <HistoryTable
          headers={STAFF_HISTORY_HEADERS}
          data={data}
          widthPercents={widthPercents}
          secondaryPage={secondaryPage}
        />
      </PageContent>
      }
      {
        secondaryPage &&
        <HistoryTable
          headers={STAFF_HISTORY_HEADERS}
          data={data}
          widthPercents={widthPercents}
          secondaryPage={secondaryPage}
        />
      }
    </>

  )
}