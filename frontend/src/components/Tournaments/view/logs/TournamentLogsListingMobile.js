import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import InfiniteScroll, { Loader } from '../../../Global/InfiniteScroll'
import TournamentLogsBox from './TournamentLogsBox'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function TournamentLogsListingMobile({ logs, pagination, handlePagination, loading }) {
  return (
    <InfiniteScroll data={logs} pagination={pagination} handlePagination={handlePagination}>
      <PageContent>
        {
          logs.length !== 0 &&
          logs.map((log, index) => {
            return (
              <TournamentLogsBox
                log={log} key={index}
              />
            )
          })
        }
        {
          logs.length === 0 && !loading && <EmptyData data={'No logs atm'}/>
        }
        {
          loading && <Loader/>
        }
      </PageContent>
    </InfiniteScroll>
  )
}
