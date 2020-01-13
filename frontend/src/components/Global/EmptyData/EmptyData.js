import React from 'react'
import { EmptyDataWrapper, EmptyDataImage, EmptyDataText } from '../Statistics/styles'
import { BigPGrey, H5Grey } from '../../../styles/typography/typography'
import noData from '../../../assets/no-data.svg'
import { SecondaryButton } from '../../../styles/shared/button'
import { Link } from 'react-router-dom'

export default function EmptyData({ table, data, middle, modal, buttonText, button, tournament }) {
  return (
    <EmptyDataWrapper table={table} middle={middle} tournament={tournament}>
      <EmptyDataImage>
        <img src={noData} alt={'noData'}/>
      </EmptyDataImage>
      <EmptyDataText>
        <BigPGrey>
          {data}
        </BigPGrey>
      </EmptyDataText>
      {
        modal ?
        <SecondaryButton onClick={modal} filled>{buttonText} </SecondaryButton>
        :
          null
      }
      {
        button ?
          <Link to={button}>
            <SecondaryButton filled>{buttonText}</SecondaryButton>
          </Link>
          :
          null
      }
      {/*<H5Grey>Thank you for understanding!</H5Grey>*/}
    </EmptyDataWrapper>
  )
}