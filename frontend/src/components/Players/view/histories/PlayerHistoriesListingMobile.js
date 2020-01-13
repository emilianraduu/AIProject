import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import InfiniteScroll from '../../../Global/InfiniteScroll'
import HistoryBox from '../../../Staff/view/histories/HistoryBox'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function TournamentLogsListingMobile({ histories, pagination, handlePagination }) {
  if(histories === [])
  return (
    <>
      {
        histories && <InfiniteScroll data={histories} pagination={pagination} handlePagination={handlePagination}>
          <PageContent>
            {
              histories.map((history, index) => {
                return (
                  <HistoryBox
                    history={history}
                    key={index}
                  />
                )
              })
            }
          </PageContent>
        </InfiniteScroll>
      }
    </>
  )
  else
    return(
            <PageContent>
              <EmptyData table data={"This players has no statistics yet!"}/>
            </PageContent>
    )
}
