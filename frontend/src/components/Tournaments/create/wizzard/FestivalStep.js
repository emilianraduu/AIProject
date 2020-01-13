import React, { useState, useContext, useEffect } from 'react'
import { FormItem, StyledToggle } from '../../../../styles/shared/form'
import { Label, BigPGreyBold } from '../../../../styles/typography/typography'
import { Field, Form } from 'react-final-form'
import { InfiniteSelect } from '../../../Global/Select/InfiniteSelect'
import { BoxContent, BoxWrapper, BoxHeader, HeaderWithIcon } from '../../../Global/Box/styles/box'
import { PageContent } from '../../../../styles/shared/wrapper'
import { isMobile } from 'react-device-detect'
import { FILE_ICON, colorPrimary, colorBlack12 } from '../../../../styles/abstract/variables'
import FestivalCreate from '../../../Festivals/FestivalCreate'
import { Toggle } from 'react-toggle-component'
import { SecondaryButton, PrimaryButton } from '../../../../styles/shared/button'
import { ProgressBar, WizzardHeader } from '../../../../styles/shared/headerWizzard'
import { FestivalContext } from '../../../Festivals/FestivalContext'
import { WizzardContext } from './WizzardContext'
import { saveTournamentWizzardStep } from './WizzardActions'
import { fetchFestivals } from '../../../Festivals/FestivalActions'
import { AuthContext } from '../../../Auth/AuthContext'

export default function FestivalStep ({ history, match }) {
  const authContext = useContext(AuthContext)
  const festivalContext = useContext(FestivalContext)
  const wizzardContext = useContext(WizzardContext)
  const tournamentType = match.url.split('/')[1]
  const { festivals, pagination: { page, pageCount } } = festivalContext.state
  const { festival, festivalCreated, festivalSearchTerm, steps } = wizzardContext.state[tournamentType]

  useEffect(() => {
    fetchFestivals({ festivalContext, authContext, page: 1 })
  }, [])
  const onSubmit = (values) => {
    saveTournamentWizzardStep({ step: 'festival', data: values, wizzardContext, tournamentType })
    history.push(`/${tournamentType}/create/blinds`)
  }
  const validation = ({ name }) => {
    if (!name) {
      return { name: 'Select festival' }
    }
    return {}
  }
  return (
    <PageContent type={isMobile ? undefined : 'web'}>
      <BoxWrapper web={!isMobile} large={!isMobile}>
        <WizzardHeader currentStep={steps.festival} steps={steps.total} icon={FILE_ICON} title='Festival' />
        <FormItem>
          <Label>Create new festival</Label>
          <StyledToggle>
            <Toggle
              name='email-toggle'
              checked={festivalCreated}
              width='40px'
              height='20px'
              borderColor={festivalCreated === true ? `${colorPrimary}` : `${colorBlack12}`}
              onToggle={(e) => { saveTournamentWizzardStep({ step: 'festivalCreated', data: !festivalCreated, wizzardContext, tournamentType }) }}
            />
          </StyledToggle>

        </FormItem>
        {!festivalCreated && (
          <Form
            onSubmit={onSubmit}
            initialValues={festival}
            validate={validation}
            render={({ handleSubmit, pristine, invalid, values }) => (
              <form onSubmit={handleSubmit}>
                <FormItem>
                  <Label>Select festival</Label>
                  <Field
                    component={InfiniteSelect} name='name' placeholder='Type a name'
                    pagination={{
                      page,
                      pageCount
                    }}
                    handlePagination={() => {
                      if (page <= pageCount) {
                        fetchFestivals({ festivalContext, authContext, page })
                      }
                    }}
                    inputValue={festivalSearchTerm}
                    onInputChange={(value) => {
                      fetchFestivals({ festivalContext, authContext, search: value })
                      saveTournamentWizzardStep({ step: 'festivalSearchTerm', data: value, wizzardContext, tournamentType })
                    }}
                    options={
                      festivals.map(item => ({
                        value: item.id,
                        label: item.name
                      }))
                    }
                  />
                </FormItem>
                <div style={{ height: 30, width: 30 }} />
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
                  <SecondaryButton type='submit' full filled>Continue</SecondaryButton>
                  <div style={{ height: 0, width: 30 }} />
                  <SecondaryButton full noHover onClick={() => history.push(`/${tournamentType}/create/import`)}>Previous step</SecondaryButton>
                </div>
                {/* <SecondaryButton full filled type='submit' disabled={pristine || invalid}>Continue</SecondaryButton> */}
              </form>)}
          />)}

        {festivalCreated && (
          <FestivalCreate
            initialValues={festival}
            renderActions={({ invalid, pristine }) => (
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row-reverse' }}>
                <SecondaryButton type='submit' full filled>Continue</SecondaryButton>
                <div style={{ height: 0, width: 30 }} />
                <SecondaryButton full noHover onClick={() => history.push(`/${tournamentType}/create/import`)}>Previous step</SecondaryButton>
              </div>
            )}
            onSubmit={(values) => { onSubmit(values) }}
          />)}

      </BoxWrapper>
    </PageContent>

  )
}
