import React, { useContext, useState } from 'react'
import _ from 'lodash'
import moment from 'moment-timezone'
import { BrowserView, MobileView } from 'react-device-detect'
import TournamentViewWeb from './TournamentDetailsWeb'
import TournamentViewMobile from './TournamentDetailsMobile'
import { withRouter } from 'react-router-dom'
import TrailMob from '../../../Global/Trail/TrailMob'
import { tournamentRoutes } from '../TournamentRouter'
import SubmenuWeb from '../../../Global/Navbar/SubmenuWeb'
import { DATETIME_FORMAT } from '../../../../config/constants'
import TournamentEditModal from './TournamentEditModal'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { makeTournamentVisible } from '../../TournamentsActions'
import { sortByKey } from '../../../../helpers/sortHelpers'
import {
  DIAMOND_ICON,
  FILE_ICON,
  GOLD_ICON,
  IMPORT_ICON,
  MONEY_BILL_ICON,
  SPADE_ICON,
  TV_ICON
} from '../../../../styles/abstract/variables'
import { AuthContext } from '../../../Auth/AuthContext'
import { updateTournament } from '../ActiveTournamentActions'

export const CASHGAME_TYPE = 'cashgames'
export const CASHGAME_TITLE = 'cashGame'

export const tableData = ({ tournament, type }) => {
  let sortedBlinds = []
  if (tournament.blinds) {
    sortedBlinds = [...tournament.blinds]

    sortedBlinds.sort((a, b) => (a.order > b.order) ? 1 : -1)
  }
  const firstBlind = sortedBlinds.length !== 0 && (sortedBlinds.sort((a, b) => (a.order > b.order) ? 1 : -1))[0]
  let blinds = ''
  if (firstBlind) {
    blinds = `${firstBlind.smallBlind + '/' + firstBlind.bigBlind}${firstBlind.ante ? ` (${firstBlind.ante})` : ''}`
  }
  return [
    // {
    //   type: 'import',
    //   header: {
    //     title: 'Import Details',
    //     icon: IMPORT_ICON,
    //     id: 'tournamentDetails'
    //   },
    //   info: [
    //     {
    //       title: 'From',
    //       text: 'None'
    //     }
    //   ]
    // },
    {
      type: 'info',
      header: {
        title: 'Information',
        icon: FILE_ICON,
        id: 'info'
      },
      info: [
        {
          title: 'Festival',
          text: tournament.festival && tournament.festival.name
        },
        {
          title: 'Tournament Name',
          text: tournament.name
        },
        {
          title: 'Date and time',
          text: moment(tournament.dateTime).format(DATETIME_FORMAT)
        },
        {
          title: 'Description',
          text: tournament.description
        },
        {
          title: 'Receipt Description',
          text: tournament.receiptDescription
        },
        {
          title: 'Status',
          text: tournament.status,
          prop: 'status'
        }
      ]
    },
    {
      type: 'fee',
      header: {
        title: 'Registration',
        icon: MONEY_BILL_ICON,
        id: 'fee'
      },

      info: [
        {
          title: type === CASHGAME_TYPE ? 'Minumum Buy In' : 'Buy In',
          text: tournament.buyIn
        },
        {
          title: 'Fixed Rake',
          hidden: type === CASHGAME_TYPE,
          text: tournament.rakeFixed
        },
        {
          title: 'Rake percent',
          hidden: type === CASHGAME_TYPE,
          text: tournament.rakePercent + '%'
        },
        {
          title: 'Number of chips',
          hidden: type === CASHGAME_TYPE,
          text: tournament.numberOfChips
        },
        {
          title: 'Number of re-entries',
          hidden: type === CASHGAME_TYPE,
          text: tournament.numberOfReentries || 0
        },
        {
          title: 'Re-entry chips',
          hidden: type === CASHGAME_TYPE,
          text: tournament.reentryChips || 0
        }
      ]
    },
    {
      type: 'prizes',
      hidden: type === CASHGAME_TYPE,
      header: {
        title: 'Prizes',
        icon: GOLD_ICON,
        id: 'prize'
      },

      info: [
        {
          title: 'Total prize pool',
          text: parseInt(tournament.calculatedPrizePool)
        },
        {
          title: 'Payouts',
          text: tournament.prizes && _.map(tournament.prizes, (prize) => prize.amount).reduce((a, b) => a + b, 0)
        },
        {
          title: 'Place',
          text: tournament.prizes && tournament.prizes.sort((a, b) => sortByKey(a, b, 'order')).map(item => (
            <div
              key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}
            >
              <div style={{ flex: 1 }}>#{item.name}</div>
              <div style={{ flex: 1, textAlign: 'right' }}>{item.hasDescription ? item.description : item.value}</div>
            </div>))
        }
      ]
    },
    {
      type: 'gameRules',
      header: {
        title: 'Game Rules',
        icon: SPADE_ICON,
        id: 'rules'
      },

      info: [
        {
          title: 'Shotclock',
          text: tournament.shotClock + ' s'
        }
      ]
    },
    {
      type: 'tv',
      header: {
        title: 'TV data',
        icon: TV_ICON,
        id: 'tv'
      },

      info: [
        {
          title: 'Total chips count',
          text: tournament.calculatedNumberOfChips
        },
        {
          title: 'Total players count',
          text: tournament.totalNumberOfPlayers
        },
        {
          title: 'Active players',
          text: tournament.numberOfActivePlayers
        }
      ]
    },
    {
      type: 'blinds',
      header: {
        title: 'Levels structure',
        icon: DIAMOND_ICON,
        id: 'blind'
      },

      info: [
        {
          title: 'First level',
          text: blinds
        },
        {
          title: 'Levels',
          hidden: type === CASHGAME_TYPE,
          text: tournament.blinds && tournament.blinds.length
        },
        {
          title: 'Time per level',
          hidden: type === CASHGAME_TYPE,
          text: (tournament.blindMinutesPerLevel) + ' min'
        }

      ]
    },
    {
      type: 'adjust',
      header: {
        title: 'Extra info',
        icon: MONEY_BILL_ICON,
        id: 'adjust'
      },
      info: [
        {
          title: 'Extra number of chips',
          text: tournament.offsetNumberOfChips
        },
        {
          title: 'Extra active players',
          text: tournament.offsetNumberOfActivePlayers
        },
        {
          title: 'Extra total number of players',
          text: tournament.offsetTotalNumberOfPlayers
        },
        {
          title: 'Extra prize pool',
          text: tournament.offsetPrizePool
        }
      ]
    }
  ]
}

function TournamentDetails({ match, history, type }) {
  const [modalType, setModalType] = useState({ value: null, icon: '', title: '' })
  const tournamentsContext = useContext(ActiveTournamentContext)
  const authContext = useContext(AuthContext)
  const { activeTournament: tournament } = tournamentsContext.state
  const { tournamentId } = match.params
  const openEditModal = (type) => {
    setModalType(type)
  }
  const breadcrumbAction = () => {
    history.push(`/${type}`)
  }
  const replacements = {
    ':tournamentId': tournamentId
  }
  const announceTournament = (status) => {
    makeTournamentVisible({ authContext, tournamentsContext, tournamentId: tournament.id, status })
  }
  const manualChange = () => {
    updateTournament({ tournamentId, authContext, data: { isManualSitting: !tournament.isManualSitting } })
  }
  let enableEdit = false
  if (tournament && tournament.registerStart) {
    enableEdit = moment().diff(tournament.registerStart) < 0
  }
  return (
    <>
      <BrowserView>
        <TournamentEditModal type={modalType} closeModal={() => openEditModal({ value: null, icon: '', title: '' })}/>
        <SubmenuWeb routes={tournamentRoutes(type).slice().reverse()} replacements={replacements}/>
        <TournamentViewWeb
          openEditModal={openEditModal}
          tournament={tournament}
          manualChange={manualChange}
          isManualSitting={tournament.isManualSitting}
          type={type}
          enableEdit={enableEdit}
          makeTournamentVisible={announceTournament}
        />
      </BrowserView>
      <MobileView>
        <TournamentEditModal
          type={modalType} closeModal={() => openEditModal({ value: null, icon: '', title: '' })}
          mobile
        />
        <TrailMob
          title={tournament && tournament.name}
          action={breadcrumbAction}
          routes={tournamentRoutes(type).slice().reverse()}
          replacements={replacements}
        />
        <TournamentViewMobile
          openEditModal={openEditModal}
          tournament={tournament}
          enableEdit={enableEdit}
          makeTournamentVisible={announceTournament}
          type={type}

        />
      </MobileView>
    </>
  )
}

export default withRouter(TournamentDetails)
