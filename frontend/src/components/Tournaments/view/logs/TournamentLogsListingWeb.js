import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import Table from '../../../Global/Table/Table'
import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../../../config/constants'
import { TOURNAMENT_LOGS_HEADERS } from './TournamentLogsListing'
import Paginator from '../../../Global/Paginator/Paginator'
import FiltersWeb from '../../../Global/Filter/FiltersWeb'
import EmptyData from '../../../Global/EmptyData/EmptyData'
import { Loader } from '../../../Global/InfiniteScroll'

export default function TournamentLogsListingWeb({ logs, pagination, handlePagination, handleSort, orderBy, direction, fields, filters, filterFields, removeFilter, handleFilter, clearFilters, loading }) {
  const data = []
  const widthPercents = ['20', '20', '10', '15', '20', '15']
  logs && logs.forEach((log) => {
    let row = {
      date: moment(log.createdAt).format(DATETIME_FORMAT),
      user: log.user && `${log.user.firstName} ${log.user.lastName}`,
      role: log.user && log.user.role,
      action: log.type && log.type.name,
      description: log.description,
      other: log.other
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
      />
      {
        data.length !== 0 &&
        <><Table
          headers={TOURNAMENT_LOGS_HEADERS}
          data={data}
          orderBy={orderBy}
          direction={direction}
          widthPercents={widthPercents}
          handleSort={handleSort}
          handleFilter={handleFilter}
          clearFilters={clearFilters}/>
        { pagination.pageCount > 1 && <Paginator pagination={pagination} handlePagination={handlePagination}/>}
        </>
      }
      {
        data.length === 0 && !loading && <EmptyData data={'No logs atm'}/>
      }
      {
        loading && <Loader/>
      }
    </PageContent>
  )
}
