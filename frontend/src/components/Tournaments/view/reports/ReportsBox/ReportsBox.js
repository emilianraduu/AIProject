import React from 'react'
import {
  BoxWrapper,
  BoxContent,
  ReportsBoxHeader,
  ReportsBoxHeaderLeft,
  ReportsBoxHeaderRight,
  ReportsBoxContentWrapper, ReportsBoxContent
} from '../../../../Global/Box/styles/box'
import { AvatarBig } from '../../../../../styles/shared/avatar'
import { BigPGreyBold, BigP, BigPBold } from '../../../../../styles/typography/typography'
import _ from 'lodash'
import { MONEY_WITHDRAWAL_ICON, USER_ICON_ALT } from '../../../../../styles/abstract/variables'

export default function ReportsBox({ headers, datas, web }) {
  return (
    <BoxWrapper web={web}>
      <BoxContent reports>
        <ReportsBoxHeader>
          <ReportsBoxHeaderLeft>
            <AvatarBig cashFlow={headers !== 'Players Stats'} playerStats={headers === 'Players Stats'}>
              <i className={headers === 'Players Stats' ? USER_ICON_ALT : MONEY_WITHDRAWAL_ICON}/>
            </AvatarBig>
          </ReportsBoxHeaderLeft>
          <ReportsBoxHeaderRight>
            <BigPGreyBold>{headers}</BigPGreyBold>
          </ReportsBoxHeaderRight>
        </ReportsBoxHeader>
        <ReportsBoxContentWrapper>
          {
            headers !== 'Players Stats' ?
              _.map(datas, (data, index) => {
                return (
                  <ReportsBoxContent cashFlow key={index}>
                    <BigP uppercase>{data.name}</BigP>
                    <BigPBold>{data.value} USD</BigPBold>
                  </ReportsBoxContent>
                )
              })
              :
              <>
                <ReportsBoxContent playerStats>
                  <BigP uppercase>{datas.name}</BigP>
                  <BigPBold>{datas.value} USD</BigPBold>
                </ReportsBoxContent>
              </>

          }
        </ReportsBoxContentWrapper>
      </BoxContent>
    </BoxWrapper>
  )
}