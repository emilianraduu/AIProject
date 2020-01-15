import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import { MobileChartContainer, MobileChartTitle } from '../../../Global/Statistics/styles'
import Masonry from 'react-masonry-component'
import PieChartStatistics from '../../../Global/Statistics/PieChartStatistics'
import BarChartStatistics from '../../../Global/Statistics/BarChartStatistics'
import EmptyData from '../../../Global/EmptyData/EmptyData'

export default function TournamentStatisticsListingMobile({ ageStatistics, countryStatistics, nationalityStatistics, genderStatistics }) {
  return (
    <Masonry>
      {
        <PageContent>
          {
            countryStatistics && countryStatistics.length === 0 ?
              <EmptyData data={"No statistics yet!"}/>
              :
              <>
                <MobileChartContainer>
                  <MobileChartTitle>Gender</MobileChartTitle>
                  <PieChartStatistics
                    props={genderStatistics}
                  />
                </MobileChartContainer>
                < MobileChartContainer>
                  <MobileChartTitle> Country </MobileChartTitle>
                  <BarChartStatistics
                    props={countryStatistics}
                  />
                </MobileChartContainer>
                <MobileChartContainer>
                  <MobileChartTitle>Age</MobileChartTitle>
                  <BarChartStatistics
                    props={ageStatistics}
                  />
                </MobileChartContainer>
                <MobileChartContainer>
                  <MobileChartTitle>Nationality</MobileChartTitle>
                  <PieChartStatistics
                    props={nationalityStatistics}
                  />
                </MobileChartContainer>
              </>
          }
        </PageContent>
      }
    </Masonry>
  )
}