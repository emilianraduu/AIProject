import React, { useContext } from 'react'
import { HeaderWrapper, HeaderBottomWrapper } from './styles/headerMob'
import { PageImage } from '../../../styles/shared/background'
import HeaderTopMob from './HeaderTopMob'
import NavbarMob from '../Navbar/NavbarMob'
import { CoursesContext } from '../../Courses/CoursesContext'
import { StaffsContext } from '../../Staff/StaffsContext'
import { clearTournamentsFilters, clearTournamentsSort } from '../../Courses/CoursesActions'
import { clearStaffsFilters, clearStaffsSort } from '../../Staff/StaffsActions'

export default function HeaderMob () {
  const tournamentsContext = useContext(CoursesContext)
  const staffsContext = useContext(StaffsContext)

  return (
    <HeaderWrapper>
      <PageImage/>
      <HeaderTopMob />
      <HeaderBottomWrapper>
        <NavbarMob />
      </HeaderBottomWrapper>
    </HeaderWrapper>
  )
}