import React, {
  useState,
  Component,
  useRef,
  useEffect,
  useContext
} from 'react'
import ReactToPrint from 'react-to-print'
import moment from 'moment'
import ReceiptLogo from '../../../assets/receipt_logo.png'
import { Link } from 'react-router-dom'
import {
  BoxContent,
  BoxHeader,
  BoxHeaderLeft,
  BoxWrapper,
  HeaderWithIcon
} from '../../Global/Box/styles/box'
import {
  BigPBold,
  BigPGreyBold,
  Label,
  PriceWrapper
} from '../../../styles/typography/typography'
import { SecondaryButton, SecondaryButtonDiv } from '../../../styles/shared/button'
import {
  RECEIPT_ICON_ALT,
  colorFail
} from '../../../styles/abstract/variables'
import { Form, Field } from 'react-final-form'
import { FormItem } from '../../../styles/shared/form'
import { FieldSelect } from '../../Global/Select/FieldSelect'
import { AlertBox, AlertWrapper, Separator, ReceiptWrapper, ReceiptSecondWrapper } from './style'
import { ActivePlayerContext } from '../../Players/view/ActivePlayerContext'
import { sortByKey } from '../../../helpers/sortHelpers'
import { updateTournamentPlayerDetails } from '../../Players/view/ActivePlayerActions'
import { AuthContext } from '../../Auth/AuthContext'

export default function TournamentPlayerPayment ({
  web,
  bottomMargin,
  activePlayer,
  activeTournament
}) {
  const [confirmAlert, setConfirm] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const authContext = useContext(AuthContext)

  function useOutsideAlerter ({ ref, expand }) {
    function handleClickOutside (event) {
      event.stopPropagation()
      if (
        ref.current &&
        expand === true &&
        !ref.current.contains(event.target)
      ) {
        setConfirm(!confirmAlert)
      }
    }

    useEffect(() => {
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    })
  }

  const activePlayerContext = useContext(ActivePlayerContext)

  useEffect(() => {
    setConfirm(false)
    setDisabled(false)
  }, [])
  const onSubmit = ({ playerId, values }) => {
    playerId && updateTournamentPlayerDetails({
      authContext,
      activePlayerContext,
      playerId,
      data: { player: { paymentConfirmed: true }, ...values },
      payment: true,
      successFunction: () => setConfirm(true)
    })
  }
  const wrapperRef = useRef(null)
  useOutsideAlerter({ ref: wrapperRef, expand: confirmAlert })
  if (!activePlayer) {
    return <></>
  } else {
    return (
      <Form
        onSubmit={(e) => {
          setDisabled(true)
          onSubmit(e)
        }}
        initialValues={{ payment: { value: 'cash', label: 'Cash' } }}
        render={({ handleSubmit, pristine, invalid, values, form, submitting }) => (
          <form onSubmit={handleSubmit}>
            <BoxWrapper web={web} bottomMargin={bottomMargin}>
              <BoxHeader spaceBetween>
                <BoxHeaderLeft>
                  <HeaderWithIcon flex>
                    <i className={RECEIPT_ICON_ALT} />
                    <BigPGreyBold>Ticket</BigPGreyBold>
                  </HeaderWithIcon>
                </BoxHeaderLeft>
                {}
              </BoxHeader>
              <BoxContent>
                {activePlayer.status === 'bust' && (
                  <>
                    <PriceWrapper>
                      <Label>Buy In</Label>
                      <BigPBold>{activeTournament.buyIn}</BigPBold>
                    </PriceWrapper>
                    <FormItem>
                      <Label> Payment Type</Label>
                      <Field
                        component={FieldSelect}
                        options={[
                          { value: 'cash', label: 'Cash' },
                          {
                            value: 'card',
                            label: 'Card'
                          }
                        ]}
                        placeholder='Select payment method'
                        name='payment'
                      />
                    </FormItem>
                    <Label upper>Player id</Label>
                    <BigPGreyBold>{activePlayer.id}</BigPGreyBold>

                    <SecondaryButtonDiv
                      full
                      filled

                      onClick={() => {
                        onSubmit({
                          playerId: activePlayer.id,
                          values: {
                            payment: {
                              amount: activeTournament.buyIn,
                              type: values.payment.value
                            }
                          }
                        })
                        setConfirm(true)
                      }}
                    >
                      Re-entry!
                    </SecondaryButtonDiv>
                  </>
                )}
                {activePlayer.status === 'pendingPayment' && (
                  <>
                    <PriceWrapper>
                      <Label>Buy In</Label>
                      <BigPBold>
                        {values.payment
                          ? values.payment.value === 'winner'
                            ? 0
                            : `${activeTournament.buyIn} + ${activeTournament.rakeFixed}`
                          : `${activeTournament.buyIn} + ${activeTournament.rakeFixed}`}
                      </BigPBold>
                    </PriceWrapper>
                    <FormItem>
                      <Label> Payment Type</Label>
                      <Field
                        component={FieldSelect}
                        options={[
                          { value: 'cash', label: 'Cash' },
                          {
                            value: 'card',
                            label: 'Card'
                          },
                          { value: 'winner', label: 'Qualified' }
                        ]}
                        placeholder='Select payment method'
                        name='payment'
                      />
                    </FormItem>

                    <Label upper>Player id</Label>
                    <BigPGreyBold>{activePlayer.id}</BigPGreyBold>

                    <SecondaryButton
                      full
                      type='submit'
                      filled
                      disabled={disabled}
                      onClick={() => {
                        !submitting && onSubmit({
                          playerId: activePlayer.id,
                          values: {
                            payment: {
                              amount: activeTournament.buyIn,
                              type: values.payment.value
                            }
                          },
                          successFunction: () => setConfirm(true)
                        })
                      }}
                    >
                      Confirm payment!
                    </SecondaryButton>
                  </>
                )}
                {activePlayer.status === 'registered' && (
                  <>
                    <BigPBold>User has already payed.</BigPBold>
                    <SecondaryButtonDiv
                      full
                      filled
                      onClick={() => {
                        setConfirm(true)
                      }}
                    >
                      Reprint ticket
                    </SecondaryButtonDiv>
                  </>
                )}
                {activePlayer.status === 'waiting' && (
                  <>
                    <BigPBold>
                      User has already payed and is waiting for a table.
                    </BigPBold>
                    <SecondaryButtonDiv
                      full
                      filled
                      onClick={() => {
                        setConfirm(true)
                      }}
                    >
                      Reprint ticket
                    </SecondaryButtonDiv>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link
                    style={{ alignSelf: 'center', marginTop: 15 }}
                    to={`/tournaments/${activeTournament.id}/players/create`}
                  > <SecondaryButtonDiv full>Add another
                    player
                  </SecondaryButtonDiv>
                  </Link>
                </div>
              </BoxContent>
            </BoxWrapper>
            {confirmAlert && (
              <ShowAlert
                reference={wrapperRef}
                closeAlert={() => {
                  setConfirm(false)
                }}
                tournament={activeTournament}
                user={activePlayer}
              />
            )}
          </form>
        )}
      />
    )
  }
}

const ShowAlert = ({ reference, tournament, closeAlert, user }) => {
  if (!tournament) {
    return null
  }
  return (
    <AlertWrapper>
      <AlertBox ref={reference}>
        <div
          style={{
            position: 'absolute',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: colorFail,
            right: 30,
            top: 30
          }}
          onClick={closeAlert}
        >
          x
        </div>
        <BigPBold> Print Receipt</BigPBold>
        {/* <ComponentToPrint tournament={tournament} user={user} /> */}
        <div style={{ display: 'flex' }}>
          <PrintButton text='Print ticket' tournament={tournament} user={user} />
        </div>
      </AlertBox>
    </AlertWrapper>
  )
}

function PrintButton ({ tournament, text, user }) {
  const componentRef = useRef()
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>

        <ReactToPrint
          trigger={() => (
            <button
              type='button'
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent'
              }}
            >
              <SecondaryButtonDiv style={{ marginRight: '10px' }}>
                {text}
              </SecondaryButtonDiv>
            </button>
          )}
          content={() => componentRef.current}
        />
        <div>
          <div>
            <ComponentToPrint
              propRef={componentRef}
              tournament={tournament}
              user={user}
            />
          </div>
        </div>

      </div>

    </>
  )
}

class ComponentToPrint extends Component {
  render () {
    const { tournament, user, propRef } = this.props
    const activePlayer = user && user.activePlayer
    let payment = {}
    if (activePlayer && activePlayer.payment) {
      payment = activePlayer.payment
    } else if (user.payments && user.payments.length) {
      payment = user.payments.sort((a, b) => sortByKey(a, b, 'createdAt'))[0]
    }
    if (!tournament) {
      return null
    }
    return (
      <ReceiptWrapper

        style={{
          width: 350,
          // border: '1px solid #000',
          maxHeight: 500,
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <ReceiptSecondWrapper style={{ width: 300 }} ref={propRef}>

          <div style={{ height: '90vh', marginBottom: '50px', padding: '15px' }}>
            <img src={ReceiptLogo} style={{ maxheight: 100, width: 300 }} />
            <div>{tournament.festival.name} powered by PokerFest</div>
            <Separator />
            <div style={{ marginTop: 20 }}>{tournament.name}</div>
            <div>
              {moment(tournament.startDate).format('dddd, Do MMMM YYYY, h:mm')}
            </div>
            <div>
              Buy In: {tournament.buyIn + tournament.rakeFixed} EUR
            </div>
            <div>Chips: {tournament.numberOfChips}</div>
            <div>Payment type: {payment.type}</div>
            <div style={{ fontSize: 30, fontWeight: 'bold' }}>
              {user.user.firstName} {user.user.lastName}
            </div>
            <div style={{ display: 'flex' }}>
              {user.status !== 'waiting' ? (
                <>
                  <div className='backgroundIcon'>
                    Table{' '}
                    {user.tableNo ? user.tableNo : user.table && user.table.number}
                  </div>
                  <div className='backgroundIcon'>Seat {user.seatNo}</div>
                </>
              ) : (
                <>
                  <div className='backgroundIcon'>Manual Seating</div>
                </>
              )}
            </div>
            <div style={{ marginBottom: 20 }}>Player ID: {user.customId}</div>
            <Separator />
            <div style={{ fontSize: 13 }}>
              <div style={{ marginBottom: 20, display: 'flex', width: '100%', wordBreak: 'break-all' }}>
                {tournament.receiptDescription}
              </div>
              <div style={{ fontSize: 12 }}>Receipt Unique
                ID: {payment.id}
              </div>
            </div>

          </div>

          {/* SECOND RECEIPT */}

          <div style={{ height: '90vh', marginBottom: '50px', padding: '15px' }}>

            <img src={ReceiptLogo} style={{ maxheight: 100, width: 300 }} />
            <div>{tournament.festival.name} powered by PokerFest</div>
            <Separator />
            <div style={{ marginTop: 20 }}>{tournament.name}</div>
            <div>
              {moment(tournament.startDate).format('dddd, Do MMMM YYYY, h:mm')}
            </div>
            <div>
              Buy In: {tournament.buyIn + tournament.rakeFixed} EUR
            </div>
            <div>Chips: {tournament.numberOfChips}</div>
            <div>Payment type: {payment.type}</div>
            <div style={{ fontSize: 30, fontWeight: 'bold' }}>
              {user.user.firstName} {user.user.lastName}
            </div>
            <div style={{ display: 'flex', marginBottom: 15 }}>
              {user.status !== 'waiting' ? (
                <>
                  <div className='backgroundIcon'>
                    Table{' '}
                    {user.tableNo ? user.tableNo : user.table && user.table.number}
                  </div>
                  <div className='backgroundIcon'>Seat {user.seatNo}</div>
                </>
              ) : (
                <>
                  <div className='backgroundIcon'>Manual Seating</div>
                </>
              )}
            </div>
            <div style={{ marginBottom: 20 }}>Player ID: {user.customId}</div>
            <Separator />
            <div style={{ fontSize: 13 }}>
              <div style={{ fontSize: 12 }}>Taxa participare</div>
              <div style={{ fontSize: 12, marginBottom: '15px' }}>Buy-In Cost</div>
              <Separator />

              <div style={{ fontSize: 12, textAlign: 'center' }}>{payment.id}</div>
            </div>

          </div>
        </ReceiptSecondWrapper>
      </ReceiptWrapper>
    )
  }
}
