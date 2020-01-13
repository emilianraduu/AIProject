import React from 'react'
import moment from 'moment-timezone'
import { DATETIME_FORMAT } from '../../../../config/constants'
import Box from '../../../Global/Box/Box'

export default function TournamentLogsBox({ log }) {
  return (
    log &&
    <Box
      header={{
        title: log.user && [log.user.firstName, log.user.lastName],
        subTitle: log.user && [log.user.role, moment(log.createdAt).format(DATETIME_FORMAT)]
      }}
      link={{ url: ``, text: log.action }}
      expand={{
        description: log.description,
        other: log.other
      }}/>

  )
}