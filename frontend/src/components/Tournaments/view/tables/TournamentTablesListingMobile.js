import React, { createRef, useEffect, useState } from 'react'
import { PageContent, PageWrapperLeft, PageWrapperRight } from '../../../../styles/shared/wrapper'
import TournamentTable from './TournamentTable'
import { TableNumber, TableNumberScrollWrapper } from './style'
import { NormalPBold } from '../../../../styles/typography/typography'
import _ from 'lodash'
import TournamentTablesProprieties from './TournamentTablesProprieties'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function TablesListingMobile({ tournament }) {
  const refs = tournament.tables && tournament.tables.map(() => createRef())

  const handleClick = number => {

    refs[number].current.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }
  const [scrolled, setScrolled] = useState(0)
  const handleScroll = () => {
    if (refs) {
      let heights = refs.map((ref, index) => refs[index].current ? refs[index].current.clientHeight : 0)

      for (let i = 0; i < heights.length; i++) {
        let leftHeight = _.sum(heights.slice(0, i))
        let rightHeight = leftHeight + heights[i]
        if (i !== heights.length)
          if (leftHeight <= window.scrollY + 177 && window.scrollY + 178 < rightHeight) {
            setScrolled(i)
          }
      }
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  const [visible, setVisible] = useState(false)

  if (tournament) {
    return (
      <PageContent flex>
        <PageWrapperLeft tournamentListing>
          {
            tournament.tables &&
            <TournamentTablesProprieties
              tournament={tournament}
              openEditModal={() => setVisible(true)}
              close={() => setVisible(false)}
              visible={visible}
              bottomMargin={true}
            />
          }
          {
            tournament.tables && tournament.tables.length !== 0 ?
              <>
                {
                  tournament.tables &&
                  tournament.tables.sort((table1, table2) => parseFloat(table1.number) - parseFloat(table2.number)).map((table, index) => {
                    return (
                      <div ref={refs[index]} key={index}>
                        <TournamentTable mobile key={table.number} table={table}
                                         tournament={tournament}/>
                      </div>

                    )
                  })
                }
            </>
              :
              <EmptyData data={"No tables yet"} modal={() => setVisible(true)} buttonText={"Add tables"}/>
          }
        </PageWrapperLeft>

          <PageWrapperRight fit>

            <TableNumber>{
              tournament.tables &&
              tournament.tables.map((table, index) => {
                return (<TableNumberScroll checked={scrolled === index} key={index} table={table} index={index}
                                           handleClick={handleClick}/>)
              })
            }</TableNumber>

          </PageWrapperRight>

      </PageContent>
    )
  } else {
    return (<></>)
  }
}


export function TableNumberScroll({ table, index, handleClick, checked }) {

  return (

    <TableNumberScrollWrapper checked={checked} key={table.number}
                              onClick={() => handleClick(index)}>
      <NormalPBold>#{table.number}</NormalPBold>
    </TableNumberScrollWrapper>

  )
}