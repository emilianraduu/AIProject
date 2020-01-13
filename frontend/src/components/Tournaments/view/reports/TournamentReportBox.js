import React from 'react'
import Box from '../../../Global/Box/Box'

export default function TournamentReportBox({ report }) {
  return (
    <>
      <Box
        header={{
          title: [report.firstName, report.lastName],
          subTitle: [report.role]
        }}
        link={{ url: `/players/${report.id}`, text: 'Go to log' }}
        expand={{
          user: `${report.firstName} ${report.lastName}`,
          cashAmount: report.cashAmount,
          cashCount: report.cashCount,
          cardAmount: report.cardAmount,
          cardCount: report.cardCount,
          qualifiedAmount: report.winnerAmount,
          qualifiedCount: report.winnerCount,
          role: report.role,
          amount: report.amount,
          count: report.count
        }}
      />
    </>
  )
}
