import { ActiveTournamentContext } from '../ActiveTournamentContext'
import { CustomSwapWrapper, TableMenu, TablePlayerWrapper, TableStatusWrapper } from './style'
import { ProfileBoxLeft, ProfileBoxRight } from '../../../Global/Box/styles/box'
import { Avatar } from '../../../../styles/shared/avatar'
import { BigP, Label, NormalP, SmallP, SmallPLink } from '../../../../styles/typography/typography'
import Flag from 'react-world-flags'
import _ from 'lodash'
import { AuthContext } from '../../../Auth/AuthContext'
import { kickPlayer, playerSwap } from '../ActiveTournamentActions'
import Modal from '../../../Global/Modals/Modal'
import { Field, Form } from 'react-final-form'
import { FormItem } from '../../../../styles/shared/form'
import { FieldSelect } from '../../../Global/Select/FieldSelect'
import { PanelClear, PanelFooter } from '../../../Global/Filter/styles/filterMob'
import { SecondaryButton, SecondaryButtonDiv } from '../../../../styles/shared/button'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { colorFail, colorWarn, SYNC_ICON, USER_ICON } from '../../../../styles/abstract/variables'

const customOption = ({ firstName, lastName, country, countryCode, value, type, seatNo, url }) => (
  type !== 'freePlace'
    ? <TablePlayerWrapper pointer>
      <ProfileBoxLeft small>
        <CustomSwapWrapper>
          <SmallP>#{seatNo}</SmallP>
          <i className={SYNC_ICON} />
        </CustomSwapWrapper>
        <Avatar url={url} />
      </ProfileBoxLeft>
      <ProfileBoxRight>
        <NormalP>{firstName} {lastName}</NormalP>
        <SmallP space>
          <> {
            countryCode && <Flag code={countryCode} height={10} />
          } {country}
          </>
        </SmallP>
      </ProfileBoxRight>
    </TablePlayerWrapper>
    : <TablePlayerWrapper>
      <ProfileBoxLeft small>
        <CustomSwapWrapper>
          <SmallP>#{seatNo}</SmallP>
          <i className={SYNC_ICON} />
        </CustomSwapWrapper>
        <Avatar none />
      </ProfileBoxLeft>
      <ProfileBoxRight>
        <NormalP>Free place</NormalP>
        <SmallP space>
          Country
        </SmallP>
      </ProfileBoxRight>
    </TablePlayerWrapper>
)

const customTableOption = ({ label, status }) => (

  <TableStatusWrapper status={status}>
    <BigP>{label}</BigP>
  </TableStatusWrapper>
)

function TournamentTablePlayerModal ({ expand, setExpand, player, table, availableSeats, history, waiting }) {
  function useOutsideAlerter ({ ref, expand, setExpand }) {
    function handleClickOutside (event) {
      event.stopPropagation()
      if (ref.current && expand === true && !ref.current.contains(event.target)) {
        setExpand(false)
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    })
  }

  const { tables } = useContext(ActiveTournamentContext).state.activeTournament

  let tableChoices = []
  if (tables) {
    // tableChoices = _.filter(tables, (table) => !table.players.find(tPlayer => tPlayer.id === player.id) && table.open === true)
    tableChoices = _.filter(tables, (table) => table.open === true)
  }

  const tableNumbers = []
  for (let i = 0; i < tableChoices.length; i++) {
    tableNumbers.push({
      label: tableChoices[i].number,
      value: tableChoices[i].number,
      swapTable: tableChoices[i].id,
      currentTable: table.id,
      status: tableChoices[i].open
    })
  }
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveTournamentContext)
  const onSubmit = (values) => {
    playerSwap({
      authContext,
      tournamentsContext,
      tableId: values.tableNumber.swapTable,
      playerId: values.tablePlayers.currentPlayerId,
      seatNo: values.tablePlayers.seatNo,
      swapPlayerId: values.tablePlayers.swapPlayerId

    })
    setVisible(false)
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter({ ref: wrapperRef, expand: expand, setExpand })
  const [visible, setVisible] = useState(false)

  const getSeatChoices = ({ selectedTable, tables }) => {
    const seatPlaceholder = []
    const chosenTablePlayers = tables.find((table) => table.number === selectedTable).players

    for (let i = 1; i <= availableSeats; i++) {
      if (chosenTablePlayers.find((player) => player.seatNo === i)) { seatPlaceholder.push(chosenTablePlayers.find((player) => player.seatNo === i)) } else { seatPlaceholder.push({ seatNo: i, type: 'freePlace' }) }
    }
    return seatPlaceholder
  }

  const getPlayerChooserOptions = ({ selectedTable, tables, player: selectedPlayer }) => {
    const playerOptions = []
    const seatChoices = getSeatChoices({ selectedTable, tables })
    if (seatChoices) {
      for (let i = 0; i < seatChoices.length; i++) {
        if (seatChoices[i] && seatChoices[i].type && seatChoices[i].type === 'freePlace') {
          playerOptions.push({
            firstName: 'Free',
            value: seatChoices[i].seatNo,
            lastName: 'Place',
            label: 'Free place',
            swapPlayerId: 'newPlayer',
            currentPlayerId: player.id,
            seatNo: seatChoices[i].seatNo,
            type: 'freePlace'
          })
        } else if (seatChoices[i].id !== player.id) {
          playerOptions.push({
            firstName: seatChoices[i].user && seatChoices[i].user.firstName,
            value: seatChoices[i].id,
            swapPlayerId: seatChoices[i].id,
            currentPlayerId: player.id,
            url: seatChoices[i].user && seatChoices[i].user.profileImage && seatChoices[i].user.profileImage.url,
            lastName: seatChoices[i].user && seatChoices[i].user.lastName,
            country: seatChoices[i].user && seatChoices[i].user.country && seatChoices[i].user.country.name,
            countryCode: seatChoices[i].user && seatChoices[i].user.country && seatChoices[i].user.country.code,
            label: `${seatChoices[i].user.firstName} ${seatChoices[i].user.lastName}`,
            seatNo: seatChoices[i].seatNo
          })
        }
      }
    }
    return playerOptions
  }
  const validate = ({ tableNumber, tablePlayers }) => {
    const errors = {}
    if (!tableNumber) {
      errors.tableNumber = 'Mandatory'
    }
    if (!tablePlayers) {
      errors.tablePlayers = 'Mandatory'
    }
    return errors
  }
  return (
    <>
      <div ref={wrapperRef}>
        <TableMenu visible={expand} top>
          <SmallPLink
            onClick={() => {
              setExpand(!expand)
              setVisible(!visible)
            }}
          >Move Player
          </SmallPLink>
          <SmallPLink
            marginTop
            onClick={() => history.push(`/players/${player.user.id}`)}
          >View Player
          </SmallPLink>

          {
            !waiting && <><SmallPLink
              marginTop color={colorWarn}
              onClick={() => {
                kickPlayer({
                  authContext,
                  tournamentsContext,
                  playerId: player.id,
                  tableId: table.id
                })
                setExpand(false)
              }}
                          >Unseat Player
                          </SmallPLink>
              <SmallPLink
                marginTop color={colorFail}
                onClick={() => {
                  kickPlayer({
                    authContext,
                    tournamentsContext,
                    playerId: player.id,
                    tableId: table.id,
                    kicked: true
                  })
                  setExpand(false)
                }}
              >Bust Player
              </SmallPLink>
                        </>
          }

        </TableMenu>
      </div>
      <Modal
        visible={visible}
        title={player.user && `${player.user.firstName} ${player.user.lastName}`}
        onClose={() => setVisible(!visible)}
        icon={USER_ICON}
      >
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, pristine, invalid, values }) => (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
              <Label upper>Select table</Label>
              <FormItem>
                <Field
                  component={FieldSelect}
                  formatOptionLabel={customTableOption}
                  options={tableNumbers}
                  name='tableNumber'
                  placeholder='Select table'
                />
              </FormItem>
              <Label upper>Select place</Label>
              <FormItem>
                <Field
                  component={FieldSelect}
                  isDisabled={!values.tableNumber}
                  formatOptionLabel={customOption}
                  options={values.tableNumber && getPlayerChooserOptions({
                    player: player,
                    selectedTable: values.tableNumber.value,
                    tables
                  })}
                  name='tablePlayers'
                  placeholder='Select place'
                />
              </FormItem>
              <PanelFooter>
                <PanelClear>
                  <SecondaryButtonDiv rightMargin onClick={() => setVisible(false)}>
                    Close
                  </SecondaryButtonDiv>
                  <SecondaryButton filled onClick={handleSubmit} disabled={pristine || invalid}>
                    Apply
                  </SecondaryButton>
                </PanelClear>
              </PanelFooter>
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default withRouter(TournamentTablePlayerModal)
