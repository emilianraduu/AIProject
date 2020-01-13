import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import Table from '../../../Global/Table/Table'
import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../../../config/constants'
import { TOURNAMENT_NOTIFICATIONS_HEADERS } from './TournamentNotificationsListing'
import FiltersWeb from '../../../Global/Filter/FiltersWeb'
import EmptyData from '../../../Global/EmptyData/EmptyData'
import Paginator from '../../../Global/Paginator/Paginator'
import { Loader } from '../../../Global/InfiniteScroll'


export default function TournamentNotificationsListingWeb({ notifications, pagination, handlePagination, handleSort, orderBy, direction, fields, filters, filterFields, removeFilter, handleFilter, clearFilters, tournament, loading }) {
  const data = []
  const widthPercents = ['25', '25', '25', '25']
  notifications && notifications.forEach((notification) => {
    let row = {
      date: moment(notification.createdAt).format(DATETIME_FORMAT),
      'target users': notification.type,
      title: notification.title,
      message: notification.message
    }
    data.push(row)
  })
  return (
    <PageContent type={'web'}>
      <FiltersWeb
        filterFields={filterFields}
        filters={filters}
        removeFilter={removeFilter}
        handleFilter={handleFilter}
        button={{ url: `/tournaments/${tournament.id}/notifications/create`, text: 'Add notification' }}
      />
      {
        data.length !== 0 &&
        <>
          <Table
            headers={TOURNAMENT_NOTIFICATIONS_HEADERS}
            data={data}
            orderBy={orderBy}
            direction={direction}
            widthPercents={widthPercents}
            handleSort={handleSort}
            handleFilter={handleFilter}
            clearFilters={clearFilters}
          />
          {pagination.pageCount > 1 && <Paginator pagination={pagination} handlePagination={handlePagination}/> }
          </>
      }
      {
        data.length === 0 && !loading && <EmptyData data={'No notifications yet! Edit properties before!'}
                                       
                                        />
      }
      {
        loading && <Loader/>
      }
    </PageContent>
  )
}
