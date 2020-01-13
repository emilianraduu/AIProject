import React, { useContext, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import _ from 'lodash'
import { importValidation } from './TournamentDetailsValidations'
import { importTournamentDetails } from '../ActiveTournamentActions'
import { FormItem } from '../../../../styles/shared/form'
import { InfiniteSelect } from '../../../Global/Select/InfiniteSelect'
import { Label } from '../../../../styles/typography/typography'
import { DEBOUNCE_MS } from '../../../../config/constants'
import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { TournamentsContext } from '../../TournamentsContext'
import { AuthContext } from '../../../Auth/AuthContext'
import { getTournaments, changeTournamentsPage, applyTournamentsFilter } from '../../TournamentsActions'
import { FieldCheckbox } from '../../../Global/Checkboxes/FieldCheckbox'
import { PanelFooter, PanelClear } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton } from '../../../../styles/shared/button'
import { withRouter } from 'react-router-dom'

const URL_TO_TYPE = { '/tournaments/:tournamentId': 'tournament', '/cashgames/:tournamentId': 'cashgame' }

function ImportDetailsForm ({ onClose, match, renderActions, onSubmit: customOnSubmit, initialValues, type }) {
  const activeTournamentContext = useContext(ActiveTournamentContext)
  const tournamentsContext = useContext(TournamentsContext)
  const authContext = useContext(AuthContext)
  const { tournaments: tournamentsList, pagination: { page, pageCount }, filters, sort } = tournamentsContext.state
  const tournaments = _.reduce(tournamentsList, (a, b) => a.concat(b), [])
  useEffect(() => {
    getTournaments({ authContext, tournamentsContext, page, filters, sort, type: URL_TO_TYPE[match.path] || type })
  }, [page, filters])
  const onSubmit = (values) => {
    if (customOnSubmit) {
      customOnSubmit(values)
    } else {
      importTournamentDetails({
        tournamentsContext: activeTournamentContext,
        authContext,
        data: values,
        successFunction: onClose
      })
    }
  }
  const onTournamentsInputChange = (text) => {
    applyTournamentsFilter(
      tournamentsContext, {
        name: 'tournaments.name',
        operator: 'like',
        value: `%${text}%`
      }
    )
  }
  const onScrollToBottom = () => {
    page < pageCount && changeTournamentsPage(tournamentsContext, { selected: page })
  }
  return (
    <Form
      onSubmit={onSubmit}
      validate={importValidation}
      initialValues={
        initialValues || ({
          importAll: false,
          importPrizes: false,
          importBlinds: false,
          importFee: false,
          importGameRules: false,
          importTable: false
        })
      }
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          <FormItem>
            <Label>Import from</Label>
            <Field
              component={InfiniteSelect}
              placeholder='Select tournament'
              pagination={{
                page,
                pageCount
              }}
              handlePagination={() => {
                if (page + 1 <= pageCount) {
                  getTournaments({ authContext, tournamentsContext, page: page + 1, filters, sort, type: URL_TO_TYPE[match.path] || type })
                }
              }}
              onMenuScrollToBottom={onScrollToBottom}
              onInputChange={_.debounce(onTournamentsInputChange, DEBOUNCE_MS)}
              options={tournaments.map(tournament => ({ value: tournament.id, label: tournament.name }))}
              name='tournament'
            />
          </FormItem>
          <FormItem>
            <Label>Select items to be imported</Label>
            <Field
              component={FieldCheckbox} name='importAll' text='All'
              defaultValue={values.importPrizes && values.importBlinds && values.importFee && values.importGameRules && values.importTable}
              type='checkbox'
            />
            {!match.path.includes('cashgames') && (
              <Field
                component={FieldCheckbox} name='importPrizes' text='Prizes'
                defaultValue={values.importAll}
                disabled={values.importAll}
                type='checkbox'
              />
            )}
            <Field
              component={FieldCheckbox} name='importBlinds' text='Blind structure'
              defaultValue={values.importAll}
              disabled={values.importAll}
              type='checkbox'
            />
            <Field
              component={FieldCheckbox} name='importFee' text='Fee'
              defaultValue={values.importAll}
              disabled={values.importAll}
              type='checkbox'
            />
            <Field
              component={FieldCheckbox} name='importGameRules' text='Game Rules'
              defaultValue={values.importAll}
              disabled={values.importAll}
              type='checkbox'
            />
            <Field
              component={FieldCheckbox} name='importTable' text='Table properties'
              defaultValue={values.importAll}
              disabled={values.importAll}
              type='checkbox'
            />
            <Field
              component={FieldCheckbox} name='importFestival' text='Festival'
              defaultValue={values.importAll}
              disabled={values.importAll}
              type='checkbox'
            />
          </FormItem>
          {renderActions ? renderActions({ invalid, pristine }) : (
            <PanelFooter>
              <PanelClear>
                <SecondaryButton type='button' rightMargin onClick={onClose}>
                Close
                </SecondaryButton>
                <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                Apply
                </SecondaryButton>
              </PanelClear>
            </PanelFooter>)}
        </form>)}
    />
  )
}

export default withRouter(ImportDetailsForm)
