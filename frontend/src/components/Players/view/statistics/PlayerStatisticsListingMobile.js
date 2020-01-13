import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import {
  PlayerStatisticsContainer,
  MobileChartContainer,
  MobileChartTitle,
  BuyInValue
} from '../../../Global/Statistics/styles'
import PieChartStatistics from '../../../Global/Statistics/PieChartStatistics'
import {  BigPGreyBold } from '../../../../styles/typography/typography'
import EmptyData from '../../../Global/EmptyData/EmptyData'


export default function PlayerStatisticsListingMobile({ payoutBuyInStatitstics, averageBuyIn, pagination, handlePagination, table, mobile }) {

  return (
    <>
      {
        payoutBuyInStatitstics && averageBuyIn &&
          <PageContent>
            {
            !averageBuyIn.value ?  <EmptyData table data={"This players has no statistics yet!"}/> :
            <>
              <BigPGreyBold statistics mobile={mobile}>
                Average Buy-in:<BuyInValue>{averageBuyIn.value}$</BuyInValue>
              </BigPGreyBold>
              <PlayerStatisticsContainer mobile>
                <MobileChartContainer table={table}>
                  <MobileChartTitle>Payout/Buy-in</MobileChartTitle>
                  <PieChartStatistics
                    props={payoutBuyInStatitstics}
                  />
                </MobileChartContainer>
              </PlayerStatisticsContainer>
            </>
              }
      </PageContent>
      }
    </>
  )
}
