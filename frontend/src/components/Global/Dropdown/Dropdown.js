import React, { useContext } from 'react'
import { logout } from '../../Auth/AuthActions'
import { AuthContext } from '../../Auth/AuthContext'
import { DropdownItemsWrapper, DropdownWrapper } from './styles/dropdown'
import { Link } from 'react-router-dom'
import { NormalP } from '../../../styles/typography/typography'
import { KEY_SKELETON_ICON_ALT, SIGN_OUT_ICON_ALT } from '../../../styles/abstract/variables'
import { WizzardContext } from '../../Tournaments/create/wizzard/WizzardContext'

export default function Dropdown ({ show, mob, setShow }) {
  const authContext = useContext(AuthContext)
  const wizzardContext = useContext(WizzardContext)
  return (
    show &&
      <DropdownWrapper mob={mob}>
        <DropdownItemsWrapper onClick={() => setShow(false)}>
          <Link to='/account'><NormalP><i className={KEY_SKELETON_ICON_ALT} /> My account</NormalP></Link>
        </DropdownItemsWrapper>
        <DropdownItemsWrapper onClick={() => setShow(false)}>
          <NormalP
            pointer onClick={() => {
              logout({ authContext, wizzardContext })
            }}
          ><i className={SIGN_OUT_ICON_ALT} /> Logout
          </NormalP>
        </DropdownItemsWrapper>
      </DropdownWrapper>
  )
}
