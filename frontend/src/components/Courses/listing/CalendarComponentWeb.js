import React from 'react'
import DatePicker from 'react-datepicker'
import { DatePickerCustomStyle, DatePickerWrapper } from '../../Global/DatePickers/styles'
import moment from 'moment'
import { SmallPLink } from '../../../styles/typography/typography'

export default function CalendarComponentWeb({ handleFilter, clearFilters, filters, filterFields}) {
  const startDateFilter = filterFields.find((filter) => filter.name === 'dateFrom')
  const endDateFilter = filterFields.find((filter) => filter.name === 'dateTo')
  const end = true
  return (
    <>
      <DatePickerWrapper end={end ? 1 : 0}>
        <DatePickerCustomStyle>
          <DatePicker
            inline
            selected={filters[startDateFilter.dbName] ? moment(filters[startDateFilter.dbName][1]).toDate() : ''}
            // dateFormat='dd-MM-yyyy'
            onChange={(date) => {
              if (!filters[startDateFilter.dbName]) {
                handleFilter({
                  name: startDateFilter.dbName,
                  operator: startDateFilter.operator,
                  value: moment(date).format('YYYY-MM-DD HH:mm:ss')
                })
              } else {
                if (moment(date) < moment(filters[startDateFilter.dbName][1])) {
                  handleFilter({
                    name: startDateFilter.dbName,
                    operator: startDateFilter.operator,
                    value: moment(date).format('YYYY-MM-DD HH:mm:ss')
                  })
                  handleFilter({
                    name: endDateFilter.dbName,
                    operator: endDateFilter.operator,
                    value: moment(filters[startDateFilter.dbName][1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                  })
                } else {
                  handleFilter({
                    name: endDateFilter.dbName,
                    operator: endDateFilter.operator,
                    value: moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss')
                  })
                }
              }
            }}
            selectsStart
            selectsEnd
            startDate={filters[startDateFilter.dbName] && moment(filters[startDateFilter.dbName][1]).toDate()}
            endDate={filters[endDateFilter.dbName] && moment(filters[endDateFilter.dbName][1]).toDate()}
            isClearable={true}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={5}
            showMonthDropdown
          />
        </DatePickerCustomStyle>
        {
          filters.dateFrom && <SmallPLink
            tournaments
            onClick = {
              () => {
                clearFilters(filters)
              }
            }
          >Clear Filters</SmallPLink>
        }
      </DatePickerWrapper>

    </>
  )
}

