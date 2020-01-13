import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AddDropdownWrapper, DropdownItemsWrapper } from './styles/dropdown'
import { NormalP } from '../../../styles/typography/typography'
import { BAG_ICON, MONEY_BILL_ICON, TROPHY_ICON } from '../../../styles/abstract/variables'

export const TOURNAMENT_CREATE_LINK = '/tournaments/create'
export const CASHGAME_CREATE_LINK = '/cashgames/create'
export const STAFF_CREATE_LINK = '/staff/create'

export const addDropdownOptions = [
  {
    link: TOURNAMENT_CREATE_LINK,
    icon: TROPHY_ICON,
    title: 'Tournament'
  },
  {
    link: CASHGAME_CREATE_LINK,
    icon: MONEY_BILL_ICON,
    title: 'Cash Game'
  },
  {
    link: STAFF_CREATE_LINK,
    icon: BAG_ICON,
    title: 'Staff'
  }
]

function AddDropdown({ show, mob, showFunction, location }) {
  return (
    show &&
    <AddDropdownWrapper mob={mob}>
      {
        addDropdownOptions.map((option, index) =>
          <Link to={option.link} key={index}>
            <DropdownItemsWrapper
              active={location.pathname === option.link}
              onClick={() => {
                showFunction(false)
              }}>
              <i className={option.icon}/>
              <NormalP>
                {option.title}
              </NormalP>
            </DropdownItemsWrapper>
          </Link>
        )
      }
    </AddDropdownWrapper>
  )
}

export default withRouter(AddDropdown)