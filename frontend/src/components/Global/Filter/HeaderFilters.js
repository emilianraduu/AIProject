import React, { useState } from 'react'
import { HeaderSearch } from '../../../styles/shared/search'
import { FilterInput, Input, InputWithIcon } from '../../../styles/shared/input'
import {
  CALENDAR_ICON_ALT,
  colorBlack12,
  colorWhite,
  radiusX0,
  SEARCH_ICON,
  TIMES_ICON
} from '../../../styles/abstract/variables'
import { Label } from '../../../styles/typography/typography'
import _ from 'lodash'
import { DatePickerCustomStyle, DatePickerWrapper } from '../DatePickers/styles'
import DatePicker from 'react-datepicker'
import { NoKeyboardInput } from '../Input/NoKeyboardInput'
import Select from 'react-select'
import { PanelReset } from './styles/filterMob'
import moment from 'moment-timezone'

export default function HeaderFilters({ button, filters, filterFields, handleFilter, removeFilter }) {
  return (<>
      <HeaderSearch>
        <div style={{ display: 'flex', zIndex: 10, marginLeft: 50 }}>
          {
            filterFields && filterFields.map((field, index) => (
                <div key={index} style={{ width: 350 }}>
                  <ClearableFilterField
                    key={index} filters={filters} field={field} handleFilter={handleFilter}
                    removeFilter={removeFilter} web
                  />
                </div>
              )
            )
          }
        </div>
      </HeaderSearch>
    </>
  )
}


const ClearableFilterField = ({ filters, field, handleFilter, removeFilter, web }) => {
  const [calendar, setCalendar] = useState('')
  return (
    <FilterInput>
      <FilterField
        filters={filters} field={field} handleFilter={handleFilter}
        removeFilter={removeFilter} calendar={calendar} setCalendar={setCalendar} web={web}
      />
    </FilterInput>
  )
}

export const FilterField = ({ removeFilter, filters, field, handleFilter, calendar, setCalendar, web }) => {
  const selectStyleMobile = {
    control: () => ({
      display: 'flex',
      background: colorWhite,
      alignSelf: 'center',
      height: '40px',
      border: `1px ${colorBlack12} solid`,
      borderRadius: radiusX0,
      width: '100%'
    })
  }
  const selectStyleWeb = {
    control: () => ({
      display: 'flex',
      background: colorWhite,
      alignSelf: 'center',
      height: '32px',
      border: `1px ${colorBlack12} solid`,
      borderRadius: radiusX0,
      width: '100%'
    })
  }
  let placeholderText = ''
  if (field.name === 'User') {
    placeholderText = 'Search user...'
  } else if (field.name === 'Country') {
    placeholderText = 'Type a country name'
  } else if (field.name === 'title') {
    placeholderText = 'Type a title'
  } else if (field.name === 'message') {
    placeholderText = 'Type a message'
  } else if (field.name === 'tables') {
    placeholderText = 'e.g. 1-5'
  }
  return (
    <>
      <div style={{ position: 'relative' }}>
        {
          field.type === 'datetime' &&
          <InputWithIcon filter='true' calendar={calendar}>
            <DatePickerWrapper filter='true' web={web}>
              <DatePickerCustomStyle filtersMobile>
                <DatePicker
                  dateFormat='dd-MM-yyyy HH:mm'
                  timeFormat='HH:mm'
                  showTimeSelect
                  selected={filters[field.dbName] ? moment(filters[field.dbName][1]).toDate() : null}
                  onChange={(date) => {
                    handleFilter({
                      name: field.dbName,
                      operator: field.operator,
                      value: moment(date).format('YYYY-MM-DD HH:mm')
                    })
                    setCalendar(true)
                  }}
                  onChangeRaw={(e) => e.preventDefault()}
                  customInput={<NoKeyboardInput
                    placeholderText={field.name === 'dateFrom' ? 'Select date from' : 'Select date to'}
                  />}
                  placeholderText='Select date from'
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={5}
                  showMonthDropdown
                />
              </DatePickerCustomStyle>
            </DatePickerWrapper>
            <i className={CALENDAR_ICON_ALT}/>
          </InputWithIcon>
        }
        {
          field.type === 'text' &&
          <Input
            web={web}
            type='text'
            header={true}
            white={filters[field.dbName]}
            value={filters[field.dbName] && filters[field.dbName][1] ? filters[field.dbName][1] : ''}
            onChange={(e) => {
              handleFilter({
                name: field.dbName,
                operator: field.operator,
                value: e.target.value
              })
            }}
            placeholder={placeholderText}
          />
        }
        {
          field.type === 'select' &&
          <Select
            styles={web ? selectStyleWeb : selectStyleMobile}
            options={field.options.map((option) => {
              return { label: _.startCase(option), value: option }
            })}
            value={filters[field.dbName] ? {
              label: _.startCase(filters[field.dbName]),
              value: filters[field.dbName]
            } : ''}
            onChange={(option => {
              handleFilter({
                name: field.dbName,
                operator: field.operator,
                value: option.value
              })
            })}
            onMenuScrollToBottom={field.bottom && field.bottom}
            onInputChange={field.change && field.change}
          />
        }
          <PanelReset white={!filters[field.dbName]} web={web} rightMargin select={field.type === 'select'} onClick={() => {
            removeFilter(field.dbName)
            setCalendar(false)
            // setCalendar(calendar.push({value:false}))
          }}><i
            className={filters[field.dbName] ? TIMES_ICON : SEARCH_ICON}
          />
          </PanelReset>
      </div>
    </>
  )
}