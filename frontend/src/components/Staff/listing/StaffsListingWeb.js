import React from 'react'
import Paginator from '../../Global/Paginator/Paginator'
import { PageContent } from '../../../styles/shared/wrapper'
import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../../config/constants'
import Table from '../../Global/Table/Table'
import { STAFFS_LISTING_HEADERS } from './StaffsListing'
import FiltersWeb from '../../Global/Filter/FiltersWeb'
import _ from 'lodash'
import EmptyData from '../../Global/EmptyData/EmptyData'
import { Loader } from '../../Global/InfiniteScroll'

export default function StaffsListingWeb({ staffAccount, staffs, pagination, handlePagination, direction, orderBy, handleSort, fields, filters, filterFields, removeFilter, handleFilter, clearFilters, loading }) {
  const widthPercents = ['15', '20', '10', '15']
  const data = []
  _.map(staffs, (item) => {
    let row = {
      name: { text: `${item.firstName} ${item.lastName}`, url: item.profileImage && item.profileImage.url },
      email: item.email,
      role: _.startCase(item.role),
      date: moment(item.createdAt).format(DATETIME_FORMAT),
      link: `/staff/${item.id}`
    }
    data.push(row)
  })

  return (
    <>
      <PageContent type={'web'}>
        <FiltersWeb
          filterFields={filterFields}
          filters={filters}
          removeFilter={removeFilter}
          handleFilter={handleFilter}
          button={{ url: '/staff/create', text: 'Add staff' }}
        />
        {
          data.length !== 0 &&
          <>
            <Table
              headers={STAFFS_LISTING_HEADERS}
              data={data}
              widthPercents={widthPercents}
              direction={direction}
              orderBy={orderBy}
              handleSort={handleSort}/>
            {pagination.pageCount > 1 && <Paginator pagination={pagination} handlePagination={handlePagination}/>}
          </>
        }
        {
          data.length === 0 && !loading && <EmptyData data={'No staff yet'}/>
        }
        {
          loading && <Loader web/>
        }
      </PageContent>
    </>
  )
}
