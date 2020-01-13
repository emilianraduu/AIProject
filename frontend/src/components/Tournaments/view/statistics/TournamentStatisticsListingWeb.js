import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import Masonry from 'react-masonry-component'
import PieChartStatistics from '../../../Global/Statistics/PieChartStatistics'
import BarChartStatistics from '../../../Global/Statistics/BarChartStatistics'
import { WebChartContainer, WebChartTitle } from '../../../Global/Statistics/styles'
import EmptyData from '../../../Global/EmptyData/EmptyData'


export default function TournamentStatisticsListingWeb({ ageStatistics, countryStatistics, nationalityStatistics, genderStatistics }) {
  if (countryStatistics.length === 0) {
    return (
      <EmptyData data={"No statistics yet!"}/>
    )
  } else {
    return (
      <PageContent type={'web'} statistics>
        <Masonry>
          <WebChartContainer>
            <WebChartTitle>Gender</WebChartTitle>
            <PieChartStatistics
              props={genderStatistics}
            />
          </WebChartContainer>
          <WebChartContainer>
            <WebChartTitle>Nationality</WebChartTitle>
            <PieChartStatistics
              props={nationalityStatistics}
            />
          </WebChartContainer>

          <WebChartContainer big>
            <WebChartTitle>Age</WebChartTitle>
            <BarChartStatistics
              props={ageStatistics}
            />
          </WebChartContainer>
          <WebChartContainer big>
            <WebChartTitle>Country</WebChartTitle>
            <BarChartStatistics
              props={countryStatistics}
            />
          </WebChartContainer>
        </Masonry>
      </PageContent>
    )
  }

}