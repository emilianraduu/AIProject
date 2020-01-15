import React from 'react'
import Box from '../Global/Box/Box'
import _ from 'lodash'

export default function StaffsBox({staff}) {
  return (
    <Box
      header={{
        title: [staff.firstName, staff.lastName],
        subTitle: [_.startCase(staff.role)]
      }}
      avatarUrl={staff && staff.profileImage && staff.profileImage.url}

      link={{ url: `/staff/${staff.id}`, text: 'Go to staff' }}
    />
  )
}