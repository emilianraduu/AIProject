import React from 'react'
import {
  BoxWrapper,
  ProfileBoxLeft,
  ProfileBoxRight, BoxContent
} from '../../../Global/Box/styles/box'
import { AvatarBig } from '../../../../styles/shared/avatar'

import { BigPGreyBold, SmallP } from '../../../../styles/typography/typography'
import moment from 'moment-timezone'
import { DATE_FORMAT, DATETIME_FORMAT } from '../../../../config/constants'

export default function StaffProfileBox({ staff, web }) {
  return (
    <>
      {
        staff &&
        <BoxWrapper web={web}>
          <BoxContent flex>
            <ProfileBoxLeft>
              <AvatarBig url={staff.url}/>
            </ProfileBoxLeft>
            <ProfileBoxRight>
              <BigPGreyBold>{staff.name}</BigPGreyBold>
              <SmallP>
                {staff.role}
              </SmallP>
              <SmallP>Last Login: {staff.lastLogin ? moment(staff.lastLogin).format(DATE_FORMAT) : 'User never logged'}</SmallP>
            </ProfileBoxRight>
          </BoxContent>
        </BoxWrapper>
      }
    </>
  )
}
