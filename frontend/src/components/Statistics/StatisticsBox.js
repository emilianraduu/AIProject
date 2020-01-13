import React from 'react'
import Box from '../Global/Box/Box'
import moment from 'moment-timezone'
import { DATE_FORMAT } from '../../config/constants'
import _ from 'lodash'

export default function StaffsBox(props) {
  return (
    <Box
      header={{ title: [props.staff.firstName, props.staff.lastName], subTitle: [_.startCase(props.staff.role)] }}
      expand={{ email: props.staff.email, since: moment(props.staff.createdAt).format(DATE_FORMAT) }}/>
  )
}