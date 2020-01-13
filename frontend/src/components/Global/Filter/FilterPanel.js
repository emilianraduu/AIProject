import React, { useState } from 'react'
import {
  PanelClose,
  PanelHead,
  PanelHeader,
  PanelWrapper,
  PanelClear, PanelFooter, PanelContent, PanelReset
} from './styles/filterMob'
import Select from 'react-select'
import { SecondaryButton } from '../../../styles/shared/button'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Label } from '../../../styles/typography/typography'
import { DatePickerWrapper, DatePickerCustomStyle } from '../DatePickers/styles'
import { FilterInput, Input, InputWithIcon } from '../../../styles/shared/input'
import {
  CALENDAR_ICON_ALT,
  colorBlack12,
  colorWhite,
  FILTER_ICON,
  radiusX0,
  TIMES_ICON
} from '../../../styles/abstract/variables'
import { NoKeyboardInput } from '../Input/NoKeyboardInput'
import { Field } from 'react-final-form'

export function FilterPanel ({ expanded, left, filters = {}, filterFields = [], clearFilters, removeFilter, onClose, handleFilter, setExpanded }) {
  return (
    <>
      <PanelWrapper expanded={expanded} left={left}>
        <PanelHeader>
          <PanelHead>
            <i className={FILTER_ICON} />
            <span>Filter</span>
          </PanelHead>
          <PanelClose onClick={onClose}>
            <i className={TIMES_ICON} />
          </PanelClose>
        </PanelHeader>
        <PanelContent>
          {
            filterFields.map((field, index) => (
              <ClearableFilterField
                key={index} filters={filters} field={field} handleFilter={handleFilter}
                removeFilter={removeFilter}
              />
            )
            )
          }
          <PanelFooter>
            <PanelClear>
              <SecondaryButton rightMargin onClick={() => clearFilters()}>
                Reset
              </SecondaryButton>
              <SecondaryButton filled onClick={() => setExpanded(!expanded)}>
                Apply
              </SecondaryButton>
            </PanelClear>
          </PanelFooter>
        </PanelContent>
      </PanelWrapper>
    </>
  )
}

export const ClearableFilterField = ({ filters, field, handleFilter, removeFilter, web }) => {
  const [calendar, setCalendar] = useState('')
  return (
    <FilterInput web={web}>
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
  if (field.name === 'User') { placeholderText = 'Type a name' } else if (field.name === 'Country') { placeholderText = 'Type a country name' } else if (field.name === 'title') { placeholderText = 'Type a title' } else if (field.name === 'message') { placeholderText = 'Type a message' } else if (field.name === 'tables') { placeholderText = 'e.g. 1-5' }
  return (
    <>
      <Label upper>
        {
          _.startCase(field.name)
        }
      </Label>
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
              <i className={CALENDAR_ICON_ALT} />
            </InputWithIcon>
        }
        {
          field.type === 'text' &&
            <Input
              web={web}
              type='text'
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
        {
          filters[field.dbName] &&
            <PanelReset web={web} select={field.type === 'select'} onClick={() => {
              removeFilter(field.dbName)
              setCalendar(false)
              // setCalendar(calendar.push({value:false}))
            }} ><i
              className={TIMES_ICON}
            />
            </PanelReset>
        }
      </div>
    </>
  )
}
export default withRouter(FilterPanel)
