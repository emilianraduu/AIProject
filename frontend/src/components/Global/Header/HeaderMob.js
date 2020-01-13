import React, { useContext } from 'react'
import { HeaderWrapper, HeaderBottomWrapper } from './styles/headerMob'
import { PageImage } from '../../../styles/shared/background'
import HeaderTopMob from './HeaderTopMob'
import NavbarMob from '../Navbar/NavbarMob'
import { TournamentsContext } from '../../Tournaments/TournamentsContext'
import { StaffsContext } from '../../Staff/StaffsContext'
import { PlayersContext } from '../../Players/PlayersContext'
import { clearTournamentsFilters, clearTournamentsSort } from '../../Tournaments/TournamentsActions'
import { clearStaffsFilters, clearStaffsSort } from '../../Staff/StaffsActions'
import { clearPlayersFilters, clearPlayersSort } from '../../Players/PlayersActions'

export default function HeaderMob () {
  const tournamentsContext = useContext(TournamentsContext)
  const staffsContext = useContext(StaffsContext)
  const playersContext = useContext(PlayersContext)

  const filterClearer = ({ path }) => {
    switch (path) {
      case '/tournaments':
        clearTournamentsFilters(tournamentsContext)
        clearTournamentsSort(tournamentsContext)
      case '/cashgames':
        clearTournamentsFilters(tournamentsContext)
        clearTournamentsSort(tournamentsContext)
      case '/staff':
        clearStaffsFilters(staffsContext)
        clearStaffsSort(staffsContext)
      case '/players':
        clearPlayersFilters(playersContext)
        clearPlayersSort(playersContext)
      default:
        clearTournamentsFilters(tournamentsContext)
        clearTournamentsSort(tournamentsContext)
    }
  }
  return (
    <HeaderWrapper>
      <PageImage/>
      <HeaderTopMob filterClearer={filterClearer}/>
      <HeaderBottomWrapper>
        <NavbarMob filterClearer={filterClearer}/>
      </HeaderBottomWrapper>
    </HeaderWrapper>
  )
}