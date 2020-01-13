import React, { useContext } from 'react'
import TournamentCreate from '../TournamentCreate'
import { saveTournamentWizzardStep, clearWizzard } from './WizzardActions'
import { WizzardContext } from './WizzardContext'
import { SecondaryButton } from '../../../../styles/shared/button'
import { isMobile } from 'react-device-detect'

export default (props) => {
  const wizzardContext = useContext(WizzardContext)
  const tournamentType = props.match.url.split('/')[1]
  const { details, steps } = wizzardContext.state[tournamentType]
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'details', data: values, wizzardContext, tournamentType })
    props.history.push(`/${tournamentType}/create/import`)
  }
  return (
    <TournamentCreate
      steps={steps}
      {...props} onSubmit={onSubmit} initialValues={details} renderActions={({ invalid, pristine, reset }) => (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse', width: '100%' }}>
          <SecondaryButton type='submit' full filled>Continue</SecondaryButton>
          <div style={{ height: 0, width: 30 }} />
          <SecondaryButton full noHover onClick={(e) => { e.preventDefault(); reset(); clearWizzard({ wizzardContext, tournamentType }) }}>Clear</SecondaryButton>
        </div>
      )}
    />
  )
}
