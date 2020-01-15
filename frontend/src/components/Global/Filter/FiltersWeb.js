import React from 'react'
import { SecondaryButton } from '../../../styles/shared/button'
import { Link } from 'react-router-dom'
import { FiltersWebWrapper } from '../../../styles/shared/search'
import { ClearableFilterField } from './FilterPanel'

export default function FiltersWeb ({ button, filters, filterFields, handleFilter, removeFilter }) {
  return (
    <FiltersWebWrapper>

      <div style={{ display: 'flex' }}>
        {
          filterFields && filterFields.map((field, index) => (
            <div key={index}>
              <ClearableFilterField
                key={index} filters={filters} field={field} handleFilter={handleFilter}
                removeFilter={removeFilter} web
              />
            </div>
          )
          )
        }
      </div>
      {
        button &&
          <Link to={button.url}>
            <SecondaryButton filled>{button.text}</SecondaryButton>
          </Link>
      }
    </FiltersWebWrapper>
  )
}
