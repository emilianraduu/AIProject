import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  TourTable,
  TourTableContent,
  TourTableStatus,
  TourTableHeader, TourTableHeaderLeft,
  TourTableHeaderRight,
  TourTableWrapper, TableMenu
} from './style'
import _ from 'lodash'
import { BigPBold, SmallP, SmallPLink } from '../../../../styles/typography/typography'
import { AuthContext } from '../../../Auth/AuthContext'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { colorWarn, ELLIPSIS_ICON, USER_ICON_ALT } from '../../../../styles/abstract/variables'
import Modal from '../../../Global/Modals/Modal'
import TournamentTablePlayerModal from './TournamentTablePlayerModal'
import { assignEveryone, getWaitingList } from '../ActiveTournamentActions'
import TournamentTablePlayer from './TournamentTablePlayer'


export default function TournamentWaitingList({ mobile, tables, tournament, sticky }) {
  const authContext = useContext(AuthContext)
  const tournamentContext = useContext(ActiveTournamentContext)
  const { activeTournament } = tournamentContext.state
  const [expand, setExpand] = useState(false)

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

  let playersToInsert = []
  if (tables) {
    tables.map(table => {
      table.players.map(player => {
        if (player.status === 'waiting') {
          playersToInsert.push(player)
        }
      })
    })
  }
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideAlerter({ ref: wrapperRef, expand: expand })
  if (!tables || !tournament)
    return (<></>)
  return (
    <>
      <TourTable mobile={mobile} waiting sticky={sticky}>
        <TourTableStatus color={colorWarn}/>
        <TourTableWrapper>
          <TourTableHeader>
            <TourTableHeaderLeft>
              <BigPBold><i className={USER_ICON_ALT}/> </BigPBold>
              <SmallP>Waiting List</SmallP>
            </TourTableHeaderLeft>
            <TourTableHeaderRight>
              <i className={ELLIPSIS_ICON} onClick={(e) => setExpand(!expand)}/>
              <div ref={wrapperRef}>
                <TableMenu visible={expand}>
                  <SmallPLink
                    onClick={() => {
                      setExpand(!expand)
                      assignEveryone(authContext, tournamentContext, activeTournament.id)
                    }}>Assign everyone</SmallPLink>
                </TableMenu>
              </div>
            </TourTableHeaderRight>
          </TourTableHeader>
          <TourTableContent mobile={mobile}>
            <WaitingList tournament={tournament}/>
          </TourTableContent>
        </TourTableWrapper>
      </TourTable>
      <Modal
        visible={visible}
        title={'title'}
        onClose={() => setVisible(false)}
        icon={USER_ICON_ALT}
      >
        {visible && <TournamentTablePlayerModal expand={expand} setExpand={setExpand}
          // table={table} player={player}
          // availableSeats={availableSeats}
        />
        }
      </Modal>
    </>
  )
}

export function WaitingList() {
  const authContext = useContext(AuthContext)
  const tournamentContext = useContext(ActiveTournamentContext)
  const { activeTournament, waitingList } = tournamentContext.state
  useEffect(() => {
    getWaitingList(authContext, tournamentContext, activeTournament.id)
  }, [activeTournament])
  if (_.isEmpty(waitingList)) {
    return <SmallP>No Waiting list</SmallP>
  }
  return (
    <>
      {
        _.map(waitingList, (player, index) => (
          <TournamentTablePlayer
            waiting
            availableSeats={activeTournament.availableSeats}
            table={{}}
            key={index}
            player={player}
            seatChoices={[]}
          />
        ))
      }
    </>
  )
}