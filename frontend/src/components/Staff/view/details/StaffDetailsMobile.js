import React from 'react'
import ProfileBox from '../../../Global/Box/ProfileBox'
import InfoBox from '../../../Global/Box/InfoBox'
import { PageContent } from '../../../../styles/shared/wrapper'
import { BigP } from '../../../../styles/typography/typography'
import StaffDetailsEdit from './StaffDetailsEdit'
import Modal from '../../../Global/Modals/Modal'
import StaffAccountEdit from './StaffAccountEdit'

export default function StaffDetailsMobile({ staffAccount, staffProfile, staffDetails, staff, openModalAccount, onSubmitAccount, onCloseAccount, onPressAccount, openModalDetails, onSubmitDetails, onCloseDetails, onPressDetails }) {
  if (staffProfile) {
    return (
      <>
        {
          staffProfile &&
          <PageContent>
            <ProfileBox
              props={staffProfile}
            />
            <InfoBox
              header={staffAccount.header}
              infos={staffAccount.info}
              expand={''}
              enableEdit
              openEditModal={onPressAccount}
            />
            <InfoBox
              header={staffDetails.header}
              infos={staffDetails.info}
              expand={''}
              enableEdit
              openEditModal={onPressDetails}
            />

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
        }
      </>
    )
  } else {
    return (
      <PageContent type={'web'} flex details>
        <BigP>ERROR</BigP>
      </PageContent>
    )
  }
}
