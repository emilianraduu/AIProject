import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import InfiniteScroll, { Loader } from '../../Global/InfiniteScroll'
import PlayerBox from '../PlayerBox'
import _ from 'lodash'
import EmptyData from '../../Global/EmptyData/EmptyData'

export default function StaffsListingMobile ({ players, pagination, handlePagination, loading }) {
  return (
    <PageContent>
      <InfiniteScroll data={players} pagination={pagination} handlePagination={handlePagination}>
        {
          !_.size(players) !== 0 &&
          players.map((player, index) => {
            return (
              <PlayerBox player={player} key={index} />
            )
          })
        }
        {
          _.size(players) === 0 && !loading && <EmptyData data='No players atm' />
        }
        {
          loading && <Loader />
        }
      </InfiniteScroll>
    </PageContent>
  )
}
