import React, { useState } from 'react'
import { FilterMenuWrapper, SortToggle, FilterToggle } from './styles/filterMob'
import { Overlay } from '../Trail/styles/trailMob'
import SortPanel from '../Filter/OrderPanel'
import FilterPanel from './FilterPanel'
import { FILTER_ICON, SORT_AMOUNT_DOWN_ICON } from '../../../styles/abstract/variables'

export function FilterMenuMob({ under, direction, orderBy, fields, filterFields, filters, handleFilter, clearFilters, removeFilter, handleSort, expandSort, setExpandedSort, expandFilter, setExpandedFilter }) {
  const [expSort, setExpSort] = useState(false)
  const [expFil, setExpFil] = useState(false)
  return (
    <FilterMenuWrapper under={under && true}>
      <Sort
        direction={direction}
        orderBy={orderBy}
        fields={fields}
        handleSort={handleSort}
        expand={expandSort || expSort}
        setExpanded={setExpandedSort || setExpSort}
      />
      <Filter
        filters={filters}
        filterFields={filterFields}
        handleFilter={handleFilter}
        clearFilters={clearFilters}
        removeFilter={removeFilter}
        handleSort={handleSort}
        expand={expandFilter || expFil}
        setExpanded={setExpandedFilter || setExpFil}
      />
    </FilterMenuWrapper>
  )
}

export function Sort({ direction, orderBy, fields, handleSort, expand, setExpanded }) {

  return (
    <>
      <SortToggle expanded={expand} onClick={() => setExpanded(!expand)}>
        <i className={SORT_AMOUNT_DOWN_ICON}/>
        <span> Sort</span>
      </SortToggle>
      <Overlay expanded={expand} onClick={() => setExpanded(!expand)}/>
      <SortPanel
        expanded={expand}
        onClose={() => setExpanded(false)}
        left
        direction={direction}
        orderBy={orderBy}
        fields={fields}
        handleSort={handleSort}
      />
    </>
  )
}

export function Filter({ filters, filterFields, handleFilter, clearFilters, removeFilter, expand, setExpanded }) {
  return (
    <>
      <FilterToggle expanded={expand} onClick={() => setExpanded(!expand)}>
        <i className={FILTER_ICON}/>
        <span>Filter</span>
      </FilterToggle>
      <Overlay expanded={expand} onClick={() => setExpanded(!expand)}/>
      <FilterPanel
        setExpanded={setExpanded}
        expanded={expand}
        onClose={() => setExpanded(false)}
        filters={filters}
        filterFields={filterFields}
        handleFilter={handleFilter}
        removeFilter={removeFilter}
        clearFilters={clearFilters}
      />
    </>
  )
}
