import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  TourTable,
  TourTableContent,
  TourTableStatus,
  TourTableHeader, TourTableHeaderLeft,
  TourTableHeaderRight,
  TourTableWrapper, TableMenu
} from './style'
import { BigPBold, SmallP, SmallPLink } from '../../../../styles/typography/typography'
import TournamentTablePlayer from './TournamentTablePlayer'
import TournamentTableNoPlayer from './TournamentTableNoPlayer'
import { deleteTable, updateTableProps } from '../ActiveTournamentActions'
import { AuthContext } from '../../../Auth/AuthContext'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { ELLIPSIS_ICON, FACE_ICON, USER_ICON_ALT } from '../../../../styles/abstract/variables'
import Modal from '../../../Global/Modals/Modal'
import TournamentTablesProprietiesForm from './TournamentTablesProprietiesForm'
import TournamentTableDealerForm from './TournamentTableDealerForm'
import TournamentTableDealer from './TournamentTableDealer'


export default function TournamentTable({ mobile, table, tournament }) {
  const [expand, setExpand] = useState(false)
  const authContext = useContext(AuthContext)
  const tournamentContext = useContext(ActiveTournamentContext)

  function useOutsideAlerter({ ref, expand }) {
    function handleClickOutside(event) {
      event.stopPropagation()
      if (ref.current && expand === true && !ref.current.contains(event.target)) {
        setExpand(!expand)
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    })
  }

  function getPlayerSeats({ players, availableSeats }) {
    let playersToInsert = []
    for (let i = 1; i <= availableSeats; i++) {
      if (players && players.find((player) => player.seatNo === i))
        playersToInsert.push(players.find((player) => player.seatNo === i))
      else
        playersToInsert.push({ seatNo: i, type: 'freePlace' })
    }
    return playersToInsert
  }

  const [visible, setVisible] = useState(false)

  let playersToInsert = table.players && getPlayerSeats({
    players: table.players,
    availableSeats: tournament.availableSeats
  })
  const wrapperRef = useRef(null)
  useOutsideAlerter({ ref: wrapperRef, expand: expand })
  if (!table || !tournament)
    return (<></>)
  return (
    <div>
      <TourTable mobile={mobile}>
        <TourTableStatus open={table.open}/>
        <TourTableWrapper>
          <TourTableHeader>
            <TourTableHeaderLeft>
              <BigPBold>#{table.number}</BigPBold>
              <SmallP>seats {table.players && table.players.length}/{tournament.availableSeats}</SmallP>
            </TourTableHeaderLeft>
            <TourTableHeaderRight>
              <i className={ELLIPSIS_ICON} onClick={(e) => setExpand(!expand)}/>
              <div ref={wrapperRef}>
                <TableMenu visible={expand}>
                  <SmallPLink
                    onClick={() => {
                      setExpand(!expand)
                      updateTableProps({
                        tableId: table.id,
                        data: { open: !table.open },
                        authContext,
                        tournamentContext
                      })
                    }}>{table.open === true ? 'Close Table' : 'Open table'}</SmallPLink>
                  {
                    table.open === false &&
                  <SmallPLink red
                              marginTop
                              onClick={() => {
                                setExpand(!expand)
                                deleteTable({
                                  tableId: table.id,
                                  authContext,
                                  tournamentContext
                                })
                              }}>Remove table</SmallPLink>
                  }
                </TableMenu>
              </div>
            </TourTableHeaderRight>
          </TourTableHeader>
          <TourTableContent mobile={mobile}>
            {
              table.open &&
              table.dealer ?
                <TournamentTableDealer dealer onClick={() => setVisible(true)} {...table.dealer}/>
                :
                table.open &&
                <TournamentTableDealer dealer onClick={() => setVisible(true)}/>

            }

            {
              table.players &&
              playersToInsert.map((player, index) => {
                  return (
                    player.type === 'freePlace' ?
                      <TournamentTableNoPlayer seatNo={player.seatNo} key={index}/>
                      :
                      <TournamentTablePlayer
                        availableSeats={tournament.availableSeats}
                        table={table}
                        key={index}
                        player={player}
                        seatChoices={playersToInsert}
                      />
                  )
                }
              )
            }


          </TourTableContent>
        </TourTableWrapper>
      </TourTable>
      <Modal
        visible={visible}
        title={`Table ${table.number} dealer`}
        onClose={() => setVisible(false)}
        icon={USER_ICON_ALT}
      >
        {visible && <TournamentTableDealerForm
          onClose={() => setVisible(false)}
          tournament={tournament}
          table={table}
        />}
      </Modal>
    </div>
  )
}