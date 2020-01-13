import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import InfiniteScroll from '../../../Global/InfiniteScroll'
import _ from 'lodash'
import HistoryBox from './HistoryBox'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function StaffHistoriesListingMobile({ histories, pagination, handlePagination }) {
  return (
    <>
      {
        histories && <InfiniteScroll data={histories} pagination={pagination} handlePagination={handlePagination}>
          <PageContent>
            {histories.length !== 0 ?
              <>
                {
                  _.map(histories, (history, index) => {
                    return (
                      <HistoryBox
                        history={history}
                        key={index}
                      />
                    )
                  })
                }
              </>
              :
              <EmptyData data={'This player has no history yet!'}/>
            }
          </PageContent>

        </InfiniteScroll>
      }
    </>
  )
}
