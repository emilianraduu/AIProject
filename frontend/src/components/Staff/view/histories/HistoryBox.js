import React from 'react'
import Box from '../../../Global/Box/Box'

export default function HistoryBox({ history }) {
  return (
    <Box
      header={{
        title: [history.name],
        subTitle: [history.date]

      }}
      status={`${history.amount}$`}
      link={{url:'', text:'Check log'}}
      expand={
        {
          count: history.count
        }
      }
    />
  )
}