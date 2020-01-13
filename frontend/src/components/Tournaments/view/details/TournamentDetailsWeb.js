import React from 'react'
import InfoBox from '../../../Global/Box/InfoBox'
import { PageContent } from '../../../../styles/shared/wrapper'
import { tableData } from './TournamentDetails'
import Masonry from 'react-masonry-component'

export default function TournamentViewWeb ({ tournament, openEditModal, type, makeTournamentVisible, enableEdit, manualChange, isManualSitting }) {
  return (
    <PageContent type='web' center details>
      <Masonry>
        {
          tournament && tableData({ tournament, type }).map((data, index) => {
            return (
              !data.hidden &&
                <InfoBox
                  web key={index}
                  enableEdit={enableEdit}
                  manualChange={manualChange}
                  isManualSitting={isManualSitting}
                  header={data.header}
                  type={data.type}
                  openEditModal={openEditModal}
                  infos={data.info}
                  expand=''
                  makeTournamentVisible={makeTournamentVisible}
                />
            )
          })
        }
      </Masonry>
    </PageContent>
  )
}
