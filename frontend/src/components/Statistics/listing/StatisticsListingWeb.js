import React from 'react'
import { PageContent, WrapperContent } from '../../../styles/shared/wrapper'
import Masonry from 'react-masonry-component'
import PieChartStatistics from '../../Global/Statistics/PieChartStatistics'
import BarChartStatistics from '../../Global/Statistics/BarChartStatistics'
import { WebChartContainer, WebChartTitle} from '../../Global/Statistics/styles'
export default function StatisticsListingWeb ({ ageStatistics, countryStatistics, nationalityStatistics, genderStatistics }) {
  return (
    <>

      <WrapperContent>
        {
          ageStatistics &&
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
        }
      </WrapperContent>

    </>
  )
}
