import React, { useState } from 'react'
import InfoBox from '../../../Global/Box/InfoBox'
import Modal from '../../../Global/Modals/Modal'
import TournamentTablesProprietiesForm from './TournamentTablesProprietiesForm'
import { BigP } from '../../../../styles/typography/typography'
import { PageContent } from '../../../../styles/shared/wrapper'
import { EDIT_ICON, spacingX4 } from '../../../../styles/abstract/variables'
import { SecondaryButtonDiv } from '../../../../styles/shared/button'
import TournamentAddTableForm from './TournamentAddTableForm'

export default function TournamentTablesProprieties({ web, tournament, openEditModal, visible, close, bottomMargin, sticky }) {
  let proprietiesData = {}
  const [isAddTable, setAddTable] = useState(false)
  if (tournament) {
    proprietiesData = {
      type: 'proprieties',
      header: {
        title: 'Proprieties',
        icon: EDIT_ICON,
        id: 'proprieties'
      },
      info: [
        {
          title: 'Number of tables',
          text: tournament.numberOfTables
        },
        {
          title: 'Available seats per table',
          text: tournament.availableSeats
        }

      ]
    }
  }
  if (tournament) {
    return (
      <>
        <InfoBox
          web={web}
          sticky={sticky}
          header={proprietiesData.header}
          type={proprietiesData.type}
          infos={proprietiesData.info}
          expand=''
          openEditModal={() => {
            setAddTable(false)
            openEditModal()
          }}
          bottomMargin={bottomMargin}
        >
          <SecondaryButtonDiv style={{ marginTop: spacingX4 }} onClick={() => {
            setAddTable(true)
            openEditModal()
          }}>Add a specific table</SecondaryButtonDiv>
        </InfoBox>
        <Modal
          visible={visible}
          title={proprietiesData.header.title}
          onClose={() => {
            close()
            setAddTable(false)
          }}
          icon={proprietiesData.header.icon}
        >
          {
            isAddTable ?
              <TournamentAddTableForm
                onClose={close}
                tournament={tournament}
              />
              :
              <TournamentTablesProprietiesForm
                onClose={close}
                tournament={tournament}
              />
          }
        </Modal>
      </>
    )
  } else {
    return (
      <PageContent type='web' flex details>
        <BigP>ERROR</BigP>
      </PageContent>
    )
  }
}
