import React, { useState } from 'react'
import { PageContent, PageWrapperLeft, PageWrapperRight } from '../../../../styles/shared/wrapper'
import TournamentTablesProprieties from './TournamentTablesProprieties'
import FiltersWeb from '../../../Global/Filter/FiltersWeb'
import TournamentTable from './TournamentTable'
import Masonry from 'react-masonry-component'
import EmptyData from '../../../Global/EmptyData/EmptyData'
import TournamentWaitingList from './TournamentWaitingList'

export default function TablesListingWeb ({ tournament, filterFields, filters, removeFilter, handleFilter }) {
  const [visible, setVisible] = useState(false)
  return (
    <PageContent type='web' flex details>

      <PageWrapperLeft>
        <TournamentTablesProprieties
          web
          tournament={tournament}
          openEditModal={() => setVisible(true)}
          close={() => setVisible(false)}
          visible={visible}
        />
        <TournamentWaitingList
          tables={tournament.tables}
          tournament={tournament}
        />
      </PageWrapperLeft>
      {
        tournament.tables && tournament.tables.length !== 0
          ? <PageWrapperRight padding>
            <FiltersWeb
              filterFields={filterFields}
              filters={filters}
              removeFilter={removeFilter}
              handleFilter={handleFilter}
            />
            <Masonry>
              {
                tournament.tables &&
                tournament.tables.sort((table1, table2) => parseFloat(table1.number) - parseFloat(table2.number)).map((table, index) => {
                  let display = true
                  for (const key in filters) {
                    if (key === 'status') {
                      if ((table.open && filters[key][1] === 'closed') || (!table.open && filters[key][1] === 'open')) {
                        display = false
                        break
                      }
                    }
                    if (key === 'number') {
                      const filter = filters[key][1].split('-')
                      if ((Number(filter[0]) < Number(filter[filter.length - 1]))
                        ? (table.number < Number(filter[0]) || table.number > Number(filter[filter.length - 1]))
                        : (table.number > Number(filter[0]) || table.number < Number(filter[filter.length - 1]))
                      ) {
                        display = false
                        break
                      }
                    }
                  }
                  return display && (
                    <TournamentTable
                      key={index} table={table}
                      tournament={tournament}
                    />
                  )
                })
              }
            </Masonry>
          </PageWrapperRight>
          :  null
          // <EmptyData
          //   data='No tables yet! Edit properties before!' middle modal={() => setVisible(true)}
          //   buttonText='Add tables'
          //   />
      }
    </PageContent>
  )
}
