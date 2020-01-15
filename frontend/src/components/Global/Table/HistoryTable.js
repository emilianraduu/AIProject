import React from 'react'
import { BoxHeader, BoxWrapper, BoxContent, HeaderWithIcon } from '../Box/styles/box'
import { BigPGreyBold } from '../../../styles/typography/typography'
import Table from './Table'
import EmptyData from '../EmptyData/EmptyData'
import { HISTORY_ICON } from '../../../styles/abstract/variables'

export default function HistoryTable({ headers, data, widthPercents }) {
  if (data === [])
    return (
      <BoxWrapper web full>
        <BoxHeader>
          <HeaderWithIcon flex>
            <i className={HISTORY_ICON}/>
            <BigPGreyBold>History</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeader>
        <BoxContent>
          <Table
            headers={headers}
            data={data}
            widthPercents={widthPercents}
          />
        </BoxContent>
      </BoxWrapper>
    )
  else
    return(
      <BoxWrapper web full>
        <BoxHeader>
          <HeaderWithIcon flex>
            <i className={HISTORY_ICON}/>
            <BigPGreyBold>History</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeader>
        <BoxContent>
          <EmptyData data={'This player has no history yet'}/>
        </BoxContent>
      </BoxWrapper>
    )
}