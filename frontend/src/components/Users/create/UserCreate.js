import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { BrowserView, MobileView } from 'react-device-detect'
import _ from 'lodash'
import { AuthContext } from '../../Auth/AuthContext'
import { createTournamentPlayer, createTournamentUser } from '../../Tournaments/view/ActiveTournamentActions'
import { CountriesContext } from '../../Countries/CountriesContext'
import { applyCountriesFilter, getCountries } from '../../Countries/CountriesActions'
import PlayerCreateMobile from './UserCreateMobile'
import PlayerCreateWeb from './UserCreateWeb'
import { ActiveTournamentContext } from '../../Tournaments/view/ActiveTournamentContext'
import { UsersContext } from '../../Users/UsersContext'
import { getUserByFullname } from '../../Users/UsersActions'

export const USER_GENDERS = ['male', 'female']

function PlayerCreate ({ history, match, type }) {
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const usersContext = useContext(UsersContext)
  const countriesContext = useContext(CountriesContext)
  const { activeTournament: tournament } = tournamentsContext.state
  const { activeUser: user } = usersContext.state
  const { tournamentId } = match.params
  let { countries, pagination, filters } = countriesContext.state
  countries = _.reduce(countries, (a, b) => a.concat(b), [])
  const { page, pageCount } = pagination
  const [value, setValue] = useState({})

  // const [formInformations, setUserInformations] = useState()

  const onSubmit = (values) => {
    const data = new FormData()
    const userData = {
      ...values,
      role: 'player'
    }
    if (values.country) {
      userData.country = values.country.value
    }
    if (values.citizenship) {
      userData.citizenship = values.citizenship.value
    }
    if (values.gender) {
      userData.gender = values.gender.value
    }
    data.set('user', JSON.stringify(userData))
    if (value && value.id) {
      createTournamentPlayer({
        authContext,
        tournamentsContext,
        tournamentId,
        userId: value.id,
        history
      })
    } else {
      createTournamentUser({
        authContext,
        usersContext,
        tournamentsContext,
        tournamentId,
        data,
        history
      })
    }
  }

  useEffect(() => {
    getCountries(authContext, countriesContext, page, filters)
  }, [page, filters, user])

  const onCountriesScrollToBottom = () => {
    // page < pageCount && changeCountriesPage(countriesContext, { selected: page })
  }
  const onCountriesInputChange = (text) => {
    // applyCountriesFilter(countriesContext, {
    //   name: 'name',
    //   operator: 'like',
    //   value: `%${text}%`
    // })
  }
  const onCitizenshipInputChange = (text) => {
    applyCountriesFilter(countriesContext, {
      name: 'code',
      operator: 'like',
      value: `%${text}%`
    })
  }
  const onIdentityNumberInputChange = (value) => {
    value && getUserByFullname({ authContext, usersContext, tournamentID: tournament.id, fullname: value.split(' ').join('') })
  }

  const breadcrumbAction = () => {
    history.push(`/${type}/${tournamentId}/players`)
  }
  if (tournament) {
    return (
      <>
        <BrowserView>
          <PlayerCreateWeb
            tournament={tournament}
            onCitizenshipInputChange={onCitizenshipInputChange}
            countries={countries}
            onSubmit={onSubmit}
            value={value}
            setValue={setValue}
            onCountriesInputChange={onCountriesInputChange}
            onCountriesScrollToBottom={onCountriesScrollToBottom}
            // formInformations={formInformations}
            onIdentityNumberInputChange={onIdentityNumberInputChange}
            user={user}
          />

        </BrowserView>

        <MobileView>
          {/* <TrailMob
            title='Back to players'
            action={breadcrumbAction}
            routes={tournamentRoutes(type).slice().reverse()}
            noRight
          /> */}
          <PlayerCreateMobile
            tournament={tournament}
            onCitizenshipInputChange={onCitizenshipInputChange}
            page={page}
            onSubmit={onSubmit}
            pageCount={pageCount}
            countries={countries}
            onCountriesInputChange={onCountriesInputChange}
            onCountriesScrollToBottom={onCountriesScrollToBottom}
            onIdentityNumberInputChange={onIdentityNumberInputChange}
            user={user}
          />
        </MobileView>
      </>

    )
  } else {
    return (<></>)
  }
}

export default withRouter(PlayerCreate)
