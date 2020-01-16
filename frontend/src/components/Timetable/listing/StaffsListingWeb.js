import React from 'react'
import { PageContent } from '../../../styles/shared/wrapper'
import FiltersWeb from '../../Global/Filter/FiltersWeb'
import { Loader } from '../../Global/InfiniteScroll'
import { TimeTable } from './styles'
import { WeekNames } from './styles'
import { TimeInvterval } from './styles'
import { Interval, IntervalRow, Box, OverlapBox } from './styles'

export default function StaffsListingWeb({ staffAccount, staffs, pagination, handlePagination, direction, orderBy, handleSort, fields, filters, filterFields, removeFilter, handleFilter, clearFilters, loading }) {

  return (
    <>
      <PageContent type={'web'}>
        <FiltersWeb
          filterFields={filterFields}
          filters={filters}
          removeFilter={removeFilter}
          handleFilter={handleFilter}
          button={{ url: '/timetable/edit', text: 'Edit timetable' }}
        />
        <TimeTable>
          <WeekNames>
            <Box></Box>
            <Box>Monday</Box>
            <Box>Tuesday </Box>
            <Box>Wednesday </Box>
            <Box>Thursday </Box>
            <Box>Friday </Box>
          </WeekNames>
          <TimeInvterval>
            <IntervalRow>
              <Interval>08:00 - 10:00</Interval>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
            </IntervalRow>
            <IntervalRow>
              <Interval>10:00 - 12:00</Interval>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
            </IntervalRow>
            <IntervalRow>
              <Interval>12:00 - 14:00</Interval>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
            </IntervalRow>
            <IntervalRow>
              <Interval>14:00 - 16:00</Interval>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
            </IntervalRow>
            <IntervalRow>
              <Interval>16:00 - 18:00</Interval>
                <Box color={'#FE6F5E '}>Materie, Sala
            <OverlapBox>Materie, Sala</OverlapBox>
                </Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
            </IntervalRow>
            <IntervalRow>
              <Interval>18:00 - 20:00</Interval>
                <Box color={'#FE6F5E '}>Materie, Sala
                </Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
                <Box color={'#FE6F5E '}>Materie, Sala</Box>
            </IntervalRow>
          </TimeInvterval>
        </TimeTable>
        {
          loading && <Loader web />
        }
      </PageContent>
    </>
  )
}
