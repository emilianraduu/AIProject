import React, { useState, useContext, useEffect, useRef } from 'react'
import {
  HeaderTopWrapper,
  HeaderTopLeft,
  HeaderTopRight
} from './styles/headerWeb'
import { ButtonMain } from '../../../styles/shared/button'
import { Avatar } from '../../../styles/shared/avatar'
import { Link, withRouter } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown'
import { Logo } from '../../../styles/shared/logo'
import NavbarWeb from '../Navbar/NavbarWeb'
import AddDropdown from '../Dropdown/AddDropdown'
import { AuthContext } from '../../Auth/AuthContext'
import {
  clearTournamentsFilters,
  clearTournamentsSort
} from '../../Tournaments/TournamentsActions'
import { TournamentsContext } from '../../Tournaments/TournamentsContext'
import { StaffsContext } from '../../Staff/StaffsContext'
import { PlayersContext } from '../../Players/PlayersContext'
import { clearStaffsFilters, clearStaffsSort } from '../../Staff/StaffsActions'
import {
  clearPlayersFilters,
  clearPlayersSort
} from '../../Players/PlayersActions'
import {BigPGrey, BigPGreyBold, WhiteLink, WhitePLink} from "../../../styles/typography/typography";
import _ from "lodash";

export const PageTitle = 'Pokerfest'

function HeaderTop({ history, role, ...props }) {
  const authContext = useContext(AuthContext)

  function useOutsideAlerter({ ref, expand, setExpand }) {
    function handleClickOutside(event) {
      event.stopPropagation()
      if (
        ref.current &&
        expand === true &&
        !ref.current.contains(event.target)
      ) {
        setExpand(!expand)
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    },)
  }

  const tournamentsContext = useContext(TournamentsContext)
  const staffsContext = useContext(StaffsContext)
  const playersContext = useContext(PlayersContext)



  const wrapperRefLogout = useRef(null)
  const wrapperRefAdd = useRef(null)
  const [dropdown, setDropdown] = useState('')
  const { user } = authContext.state
  const [addDropdown, setAddDropdown] = useState('')
  useOutsideAlerter({
    ref: wrapperRefLogout,
    expand: dropdown,
    setExpand: setDropdown
  })
  useOutsideAlerter({
    ref: wrapperRefAdd,
    expand: addDropdown,
    setExpand: setAddDropdown
  })
  let dropDownAction = () => {
    setAddDropdown(!addDropdown)
  }
  // if (user.role === 'register') {
  //   dropDownAction = () => {
  //     history.push('/users/create')
  //   }
  // }
  return (
    <HeaderTopWrapper>
      <Logo web>
        <Link to='/'>AIProject</Link>
      </Logo>
      <HeaderTopLeft>
        <NavbarWeb/>
      </HeaderTopLeft>
      <HeaderTopRight>
        <div
          style={{ position: 'relative', display: 'flex', flexFlow: 'column' }}
          ref={wrapperRefAdd}
        >
          <ButtonMain
            onClick={dropDownAction}
          >
            Add new
          </ButtonMain>
          <AddDropdown show={addDropdown} showFunction={setAddDropdown}/>
        </div>
        <div
          style={{ position: 'relative', display: 'flex', flexFlow: 'row' }}
          ref={wrapperRefLogout}
        >
          <div style={{marginRight: 10}}>
          <WhitePLink>
            {user.firstName} {user.lastName}
          </WhitePLink>
          </div>
          <Avatar
            pointer
            onClick={() => {
              setDropdown(!dropdown)
            }}
          />
          <Dropdown show={dropdown} setShow={setDropdown}/>
        </div>
      </HeaderTopRight>
    </HeaderTopWrapper>
  )
}

export default withRouter(HeaderTop)
