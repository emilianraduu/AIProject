import React from 'react'
import { PageContent, PageWrapperLeft, PageWrapperRight } from '../../../../styles/shared/wrapper'
import InfoBox from '../../../Global/Box/InfoBox'
import StaffHistoriesListing from '../histories/StaffHistoriesListing'
import { BigP } from '../../../../styles/typography/typography'
import Modal from '../../../Global/Modals/Modal'
import StaffDetailsEdit from './StaffDetailsEdit'
import StaffAccountEdit from './StaffAccountEdit'
import StaffProfileBox from './StaffProfileBox'


export default function StaffDetailsWeb({ staffAccount, staffProfile, staffDetails, staff, openModalAccount, onSubmitAccount, onCloseAccount, onPressAccount, openModalDetails, onSubmitDetails, onCloseDetails, onPressDetails }) {

  if (staffDetails) {
    return (
      <PageContent type={'web'} flex details>

        <PageWrapperLeft rightBorder>
          <StaffProfileBox
            web
            staff={staffProfile}
          />
          <InfoBox
            web
            header={staffAccount.header}
            infos={staffAccount.info}
            expand={''}
            enableEdit
            openEditModal={onPressAccount}
          />
          <InfoBox
            web
            header={staffDetails.header}
            infos={staffDetails.info}
            expand={''}
            enableEdit
            openEditModal={onPressDetails}
          />
        </PageWrapperLeft>

        <PageWrapperRight>
          <StaffHistoriesListing secondaryPage/>
        </PageWrapperRight>

        <Modal visible={openModalAccount}
               title={staffAccount.header.title}
               icon={staffAccount.header.icon}
               onClose={onCloseAccount}>
          <StaffAccountEdit
            onSubmit={onSubmitAccount}
            onClose={onCloseAccount}
            staff={staff}
          />
        </Modal>

        <Modal visible={openModalDetails}
               title={staffDetails.header.title}
               icon={staffDetails.header.icon}
               onClose={onCloseDetails}>
          <StaffDetailsEdit
            staff={staff}
            onSubmit={onSubmitDetails}
            onClose={onCloseDetails}
          />
        </Modal>


      </PageContent>
    )
  } else {
    return (
      <PageContent type={'web'} flex details>
        <BigP>ERROR</BigP>
      </PageContent>
    )
  }
}
