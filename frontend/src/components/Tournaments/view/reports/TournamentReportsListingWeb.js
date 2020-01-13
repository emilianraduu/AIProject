import React from 'react'

import { PageWrapperLeft, PageWrapperRight, PageContent } from '../../../../styles/shared/wrapper'

import Table from '../../../Global/Table/Table'
import { TOURNAMENT_REPORTS_HEADERS } from './TournamentReportsListing'
import FiltersWeb from '../../../Global/Filter/FiltersWeb'
import Paginator from '../../../Global/Paginator/Paginator'
import _ from 'lodash'
import ReportsBox from './ReportsBox/ReportsBox'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function TournamentReportsWeb({ reports, pagination, handlePagination, direction, orderBy, handleSort, fields, filters, filterFields, removeFilter, handleFilter, clearFilters, tournament }) {
  const data = []
  const widthPercents = ['10', '10', '10', '10', '10', '10', '10', '10', '10', '10']
  reports && _.map(reports, (report) => {
    let row = {
      user: `${report.firstName} ${report.lastName}`,
      cashAmount: report.cashAmount,
      cashCount: report.cashCount,
      cardAmount: report.cardAmount,
      cardCount: report.cardCount,
      qualifiedAmount: report.winnerAmount,
      qualifiedCount: report.winnerCount,
      role: report.role,
      amount: report.amount,
      count: report.count
    }
    data.push(row)
  })
  let boxData = []
  if (reports && tournament) {
    boxData = [
      {
        name: 'Total Cashed In',
        value: tournament.calculatedPrizePool
      },
      {
        name: 'Buy in per player',
        value: tournament.buyIn
      },
      {
        name: 'Total Prizes',
        value: tournament.calculatedPrizePool
      }
    ]

  }
  return (
    <PageContent type={'web'} flex details>
      <PageWrapperLeft reports>
        <ReportsBox
          headers={'Players Stats'}
          datas={reports ? {
            'name': 'Total entries',
            'value': reports.length
          } : {}}
          web
        />
        <ReportsBox
          headers={'Cash flow'}
          datas={boxData}
          web
        />
      </PageWrapperLeft>
      <PageWrapperRight reports>
        <FiltersWeb
          filterFields={filterFields}
          filters={filters}
          removeFilter={removeFilter}
          handleFilter={handleFilter}
        />
        {
          data.length !== 0 ?
            <>
              <Table
                headers={TOURNAMENT_REPORTS_HEADERS}
                data={data}
                widthPercents={widthPercents}
                direction={direction}
                orderBy={orderBy}
                filters={filters}
                handleFilter={handleFilter}
                clearFilters={clearFilters}
                handleSort={handleSort}
              />
              <Paginator pagination={pagination} handlePagination={handlePagination}/>
            </>
            :
            <EmptyData data={'No reports yet!'}/>
        }
      </PageWrapperRight>
    </PageContent>
  )
}
