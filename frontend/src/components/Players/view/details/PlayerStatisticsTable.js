import React from 'react'
import { BoxHeader, BoxWrapper, BoxContent, HeaderWithIcon } from '../../../Global/Box/styles/box'
import { BigPGreyBold } from '../../../../styles/typography/typography'
import PlayerStatisticsListing from '../../view/statistics/PlayerStatisticsListing'
import { CHART_BAR_ICON } from '../../../../styles/abstract/variables'

export default function PlayerStatisticsTable ({secondaryPage}) {

  return(
      <BoxWrapper web full>
        <BoxHeader>
          <HeaderWithIcon flex>
            <i className={CHART_BAR_ICON}/>
            <BigPGreyBold>Statistics</BigPGreyBold>
          </HeaderWithIcon>
        </BoxHeader>
        <BoxContent>
          <PlayerStatisticsListing table secondaryPage={secondaryPage}/>
        </BoxContent>
      </BoxWrapper>
  )
}