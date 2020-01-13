import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import Masonry from 'react-masonry-component'
import PieChartStatistics from '../../../Global/Statistics/PieChartStatistics'
import EmptyData from '../../../Global/EmptyData/EmptyData'
import {
  WebChartContainer,
  WebChartTitle,
  PlayerStatisticsContainer,
  BuyInValue
} from '../../../Global/Statistics/styles'
import { BigPGreyBold } from '../../../../styles/typography/typography'

export default function PlayerStatisticsListingWeb({ payoutBuyInStatitstics, averageBuyIn, table }) {
  if (averageBuyIn) {
    if (!averageBuyIn.value) {
      return (
        <EmptyData table data={"This players has no statistics yet!"}/>
      )
    } else {
      return (
        <PageContent statistics type={'web'}>
          <Masonry>
            <PlayerStatisticsContainer>
              <WebChartContainer table={table}>
                <WebChartTitle>Payout/Buy-in</WebChartTitle>
                <PieChartStatistics
                  props={payoutBuyInStatitstics}
                />
              </WebChartContainer>
              <BigPGreyBold statistics>
                Average Buy-in:<BuyInValue>{averageBuyIn.value}$</BuyInValue>
              </BigPGreyBold>
            </PlayerStatisticsContainer>
          </Masonry>
        </PageContent>
      )
    }
  } else {
    return (
      <>
      </>
    )
  }
}

