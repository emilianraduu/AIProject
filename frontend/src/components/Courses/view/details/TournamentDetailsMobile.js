import React from 'react'
import { PageContent } from '../../../../styles/shared/wrapper'
import InfoBox from '../../../Global/Box/InfoBox'
import { tableData } from './TournamentDetails'

export default function TournamentViewMobile({ tournament = {}, openEditModal, type, makeTournamentVisible, enableEdit }) {
  return (
    <PageContent>{
      tournament && tableData({ tournament, type }).map((data, index) => {
        return (
          !data.hidden &&
          <InfoBox key={index}
                   header={data.header}
                   infos={data.info}
                   enableEdit={enableEdit}
                   expand={''}
                   type={data.type}
                   openEditModal={openEditModal}
                   mobile
                   makeTournamentVisible={makeTournamentVisible}

          />

        )
      })
    }

    </PageContent>
  )
}
