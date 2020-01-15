import React, {
  Component,
  useInterval,
  useState,
  useEffect,
  useContext
} from 'react'
import styled from 'styled-components'
import moment from 'moment'
import pokerfestLogo from '../assets/pokerfest_logo.png'
import ipcLogo from '../assets/ipc_bucharest.png'
import ace from '../assets/ace_card.svg'
import { ActiveCourseContext } from '../components/Courses/ActiveCourseContext'
import { relative } from 'path'
import { getCourse } from '../components/Courses/ActiveCourseActions'
import { AuthContext } from '../components/Auth/AuthContext'
import { TopBar, VerticalSeparator } from './styles'
import { BigP, BigPBold, BigPGreyBold } from '../styles/typography/typography'

const Wrapper = styled.div`
  background-color: #121212;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  color: white;
  font-family: Open Sans;
  ${({ fullScreen }) =>
  fullScreen &&
  `
  position: fixed;
  z-index: 2222;
  top:0;
  width: 100vw;
`}
`


const Blinds = styled.div`
  font-size: 100px;
  @media only screen and (max-width: 1500px) {
    font-size: 80px;
}
  @media only screen and (max-width: 1000px) {
    font-size: 60px;
}
`


const NextLevel = styled.div`
  font-size: 65px;
    @media only screen and (max-width: 1500px) {
    font-size: 50px;
}
  @media only screen and (max-width: 1000px) {
    font-size: 35px;
}
`

const getNextLevelTime = ({ tournament, currTime, successTime }) => {

  const { blinds, relativeStartTime, currentServerTime } = tournament
  const levels = blinds
    .sort(sortBy('order'))
    .map(({ order, pauseMinutes, minutes }) => ({
      order: order,
      pause: pauseMinutes * 60,
      time: tournament.blindMinutesPerLevel * 60
    }))
  const totalElapsedTime = moment(currentServerTime).diff(
    moment(relativeStartTime),
    'seconds'
  )
  let currentLevel = 0
  let requestTime = 0
  let currentPause = 0
  let currentLevelTime = 0
  let nextPause = 0
  for (let i = 0; i < levels.length; i++) {
    currentLevelTime += levels[i].time
    currentLevel++
    if (currentLevelTime > totalElapsedTime) {
      break
    }
    currentLevelTime += levels[i].pause
    currentPause++
    if (currentLevelTime > totalElapsedTime) {
      break
    }
  }
  currentLevelTime = currentLevelTime - totalElapsedTime
  if (tournament.status === 'paused') {
    // console.log(tournament.lastPause)
    //  console.log(moment(tournament.currentServerTime).diff(
    //           moment(tournament.lastPause),
    //           "seconds"
    //         ) + currentLevelTime, "asdds pause")
    currentLevelTime += moment(tournament.currentServerTime).diff(
      moment(tournament.lastPause),
      'seconds'
    ) % (levels[currentLevel] ? levels[currentLevel].time : 1)
  }
  nextPause = currentLevelTime
  const isPause = currentLevel === currentPause

  let nextLevelTime = currentLevelTime
  if (isPause) {
    nextPause = 0
  } else {
    for (let index = currentLevel - 1; index < levels.length; index++) {
      if (levels[index].pause !== 0) {
        break
      }
      nextPause += levels[index].time
    }
  }
  return { currentLevelTime, isPause, level: currentLevel, nextPause }
}
const getDataFromTournament = ({ tournament }) => {
  let levels = []
  let prizes = []
  let nextLevelTime = 0
  if (tournament.blinds) {
    levels = [...tournament.blinds].sort(sortBy('order'))
  }

  if (tournament.prizes) {
    prizes = [...tournament.prizes].sort(sortBy('order'))
  }
  let mainStatus = ''
  if (tournament.status === 'paused') {
    mainStatus = 'PAUSED'
  }
  if (tournament.status === 'live' || tournament.status === 'paused') {
    const { currentLevelTime, level, isPause, nextPause } = getNextLevelTime({
      tournament
    })
    nextLevelTime = currentLevelTime
    return {
      prizes,
      levels,
      mainStatus,
      nextLevelTime,
      isPause,
      level,
      nextPause
    }
    // const { nextLevelTime } = getNextLevelTime({ tournament })
  }
  return {
    prizes,
    levels,
    mainStatus,
    nextLevelTime
  }
}
const sortBy = sortType => {
  return (a, b) => {
    if (a[sortType] > b[sortType]) {
      return 1
    }
    if (a[sortType] < b[sortType]) {
      return -1
    }
    return 0
  }
}

export default function (props) {
  // const [fullScreen, setFullScreen] = useState(false);
  const [nextLevelIn, setNextLevelIn] = useState(0)
  const [nextPauseIn, setNextPauseIn] = useState(0)
  // const { activeTournament: tournament } = useContext(
  //   ActiveCourseContext
  // ).state;
  const authContext = useContext(AuthContext)
  const tournamentsContext = useContext(ActiveCourseContext)
  const { currTime, successTime } = tournamentsContext.state
  const { activeTournament: tournament, loadingTournament } = tournamentsContext.state
  const fetchTournament = tournament => {
    getCourse(authContext, tournamentsContext, tournament.id)
  }
  if (!tournament || !tournament.id) {
    return null
  }
  return (
    <MainScreen
      {...props}
      nextPauseIn={nextPauseIn}
      nextLevelIn={nextLevelIn}
      setNextLevelIn={setNextLevelIn}
      setNextPauseIn={setNextPauseIn}
      tournament={tournament}
      loadingTournament={loadingTournament}
      fetchTournament={fetchTournament}
    />
  )
}

class MainScreen extends Component {
  state = {
    nextLevelIn: 0,
    nextBreakIn: 0,
    pauseId: 0,
    idInterval: -1,
    nextPauseIn: false,
    initTournamentInterval: false,
    tournamentInterval: -1
  }

  setFullScreen = () => {
    document.getElementById('forFullScreenTv').requestFullscreen()
  }
  setNextLevelIn = nextLevelIn => {
    this.setState({ nextLevelIn })
  }

  componentWillUnmount() {
    clearInterval(this.state.idInterval)
    clearInterval(this.state.nextPauseIn)
    clearInterval(this.state.serverInterval)
  }

  componentWillReceiveProps(nextProps) {
    const { tournament: nextTournament } = nextProps
    const { tournament } = this.props
    if (moment(nextTournament.currentServerTime).diff(moment(tournament.currentServerTime), 'seconds') > 0) {
      const {
        nextLevelTime,
        nextPause
      } = getDataFromTournament({ tournament: nextTournament })
      if (tournament.status === 'paused') {
        //   currentLevelTime += moment(tournament.relativeStartTime).diff(
        //     moment(tournament.lastPause),
        //     "seconds"
        //   );
      }
      this.setState({ nextLevelIn: nextLevelTime, nextPauseIn: nextPause })
    }
    if (nextTournament && tournament) {
      if (nextTournament.status === 'live' && tournament.status === 'paused') {
        const { nextLevelTime, isPause, nextPause } = getDataFromTournament({
          tournament: nextTournament
        })
        this.setState({ nextLevelTime, nextPauseIn: nextPause })
        clearInterval(this.state.pauseId)
        const pauseId = setInterval(() => {
          this.setState({ nextPauseIn: this.state.nextPauseIn - 1 })
        }, 1000)
        clearInterval(this.state.idInterval)
        const idInterval = setInterval(() => {
          this.setState({ nextLevelIn: this.state.nextLevelIn - 1 })
        }, 1000)
        this.setState({ pauseId, idInterval })
      }
      if (nextTournament.status === 'paused' && tournament.status === 'live') {
        clearInterval(this.state.pauseId)
        clearInterval(this.state.idInterval)
        this.setState({ idInterval: -1, pauseId: -1 })
      }
      if (nextTournament.currentServerTime !== tournament.currentServerTime) {
        clearInterval(this.state.idInterval)
        const {
          levels,
          nextLevelTime,
          level
        } = getDataFromTournament({ tournament: nextTournament })
        if (levels.length >= level) {
          this.setState({ nextLevelIn: nextLevelTime })
          if (nextProps.tournament.status !== 'paused') {
            clearInterval(this.state.idInterval)
            const idInterval = setInterval(() => {
              this.setState({ nextLevelIn: this.state.nextLevelIn - 1 })
            }, 1000)
            this.setState({ idInterval })
          }
        }
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { nextLevelIn, nextPauseIn } = nextState
    const { loadingTournament } = nextProps
    if (
      (nextLevelIn === 0 || nextPauseIn === 0) &&
      nextProps.tournament &&
      nextProps.tournament.id && !loadingTournament
    ) {
      nextProps.fetchTournament(nextProps.tournament)
    }
  }

  render() {
    const { fullScreen } = this.state
    const { nextLevelIn, nextPauseIn } = this.state
    const {
      prizes,
      levels,
      nextLevelTime,
      level: currentLevelIndex,
      isPause,
      currTime,
      successTime,
      nextPause
    } = getDataFromTournament({ tournament: this.props.tournament })

    const { tournament } = this.props
    let level = currentLevelIndex
    let currentLevel = levels[level - 1] || {}
    let nextLevel = null

    if (tournament.status === 'announced') {
      currentLevel = levels[0]
      nextLevel = levels[1]
      level = 1
    }
    if (!this.state.serverInterval && this.props.tournament) {
      const serverInterval = setInterval(() => {
        this.props.fetchTournament(this.props.tournament)
      }, 60 * 1000)
      this.setState({ serverInterval })
    }
    // IF NEXT LEVELS STARTS IN 1 SEC, GET THE TOURNAMENT AGAIN
    // if (
    //   (nextLevelIn === 1 || nextPauseIn === 1) &&
    //   this.props.tournament &&
    //   this.props.tournament.id
    // ) {
    //   console.log('get tour')
    //
    //   this.props.fetchTournament(this.props.tournament)
    // }
    if (nextPauseIn <= 0 && nextPause > 0) {
      this.setState({ nextPauseIn: nextPause })
      if (tournament.status !== 'paused') {
        clearInterval(this.state.pauseId)
        const pauseId = setInterval(() => {
          this.setState({ nextPauseIn: this.state.nextPauseIn - 1 })
        }, 1000)
        this.setState({ pauseId })
      }

    }
    if (nextLevelIn === 0 && tournament.status !== 'announced') {
      clearInterval(this.state.idInterval)
      if (levels.length >= level) {
        this.setState({ nextLevelIn: nextLevelTime })
        if (tournament.status !== 'paused' && !this.state.pauseId) {
          clearInterval(this.state.idInterval)
          const idInterval = setInterval(() => {
            this.setState({ nextLevelIn: this.state.nextLevelIn - 1 })
          }, 1000)
          this.setState({ idInterval })
        }

      }
    }

    if (levels.length > level && tournament.status !== 'announced') {
      nextLevel = levels[level]
    }

    const hours = Math.floor(nextLevelIn / 3600)
    const minutes = Math.floor((nextLevelIn / 60) % 60)
    const seconds = Math.floor(nextLevelIn % 60)
    const nextPauseHours = Math.floor(nextPauseIn / 3600)
    const nextPauseMinutes = Math.floor((nextPauseIn / 60) % 60)
    const nextPauseSeconds = Math.floor(nextPauseIn % 60)
    if (!tournament || !tournament.id) {
      return null
    }
    return (
      <Wrapper
        fullScreen={fullScreen}
        id="forFullScreenTv"
        style={{ userSelect: 'none' }}
        onDoubleClick={() => {
          this.setFullScreen()
        }}
      >
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(31,31,31,1) 51%, rgba(0,0,0,1) 100%)',
            height: '20%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20
          }}
        >
          <TopBar style={{ display: 'flex', justifyContent: 'space-between', flex: 1, alignContent: 'center' }}>
            <img src={pokerfestLogo} style={{ maxWidth: 400, maxHeight: 150 }}/>
            <BigPGreyBold white
                          onClick={() => {
                            this.setFullScreen(!fullScreen)
                          }}
                          style={{ fontSize: 45, fontWeight: 'bold', textAlign: 'center' }}
            >
              {tournament.name}
            </BigPGreyBold>
            <img src={ipcLogo} style={{ maxWidth: 350, maxHeight: 80 }}/>

          </TopBar>
          {/*<div>*/}
          {/*  <div style={{ fontSize: 30, fontWeight: 600, textAlign: 'right' }}>*/}
          {/*    TOTAL PRIZE POOL:*/}
          {/*  </div>*/}
          {/*  <div style={{ color: '#FCA93C', fontSize: 60, fontWeight: 'bold' }}>*/}
          {/*    {tournament.isGuaranteedPrizePool*/}
          {/*      ? tournament.calculatedPrizePool < tournament.fixedPrizePool*/}
          {/*        ? parseInt(tournament.fixedPrizePool)*/}
          {/*        : parseInt(tournament.calculatedPrizePool) + tournament.offsetPrizePool*/}
          {/*      : parseInt(tournament.calculatedPrizePool) + tournament.offsetPrizePool}{' '}*/}
          {/*    EUR*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              display: 'flex',
              flex: 0.5,
              flexDirection: 'column',
              height: '100%',
              padding: 20,
              paddingLeft: 50,
              justifyContent: 'space-around',
              borderRight: '5px solid #ffc36b'
            }}
          >
            <div>
              <div
                style={{ fontSize: 30, fontWeight: '600', marginBottom: 15 }}
              >
                PLAYERS:
              </div>
              <div style={{ fontSize: 65, fontWeight: 'bold' }}>
                {tournament.numberOfActivePlayers + tournament.offsetNumberOfActivePlayers}/
                {tournament.totalNumberOfPlayers + tournament.offsetTotalNumberOfPlayers}
              </div>
            </div>
            <div>
              <div
                style={{ fontSize: 30, fontWeight: '600', marginBottom: 15 }}
              >
                TOTAL CHIPS:
              </div>
              <div style={{ fontSize: 65, fontWeight: 'bold' }}>
                {tournament.calculatedNumberOfChips + tournament.offsetNumberOfChips}
              </div>
            </div>
            <div>
              <div
                style={{ fontSize: 30, fontWeight: '600', marginBottom: 15 }}
              >
                AVG. STACK:
              </div>
              <div style={{ fontSize: 65, fontWeight: 'bold' }}>
                {(
                  (tournament.calculatedNumberOfChips + tournament.offsetNumberOfChips) /
                  (tournament.numberOfActivePlayers + tournament.offsetNumberOfActivePlayers
                    ? tournament.numberOfActivePlayers + tournament.offsetNumberOfActivePlayers
                    : 1)
                ).toFixed(0)}
              </div>
            </div>
            <div>
              <div
                style={{ fontSize: 30, fontWeight: '600', marginBottom: 15 }}
              >
                NEXT BREAK:
              </div>
              <div style={{ fontSize: 65, fontWeight: 'bold' }}>
                {isPause ? <div>BREAK</div> :
                  tournament.status === 'announced' ? <div>-- : --</div> :
                    <div>
                      {nextPauseHours > 0
                        ? `${hours < 10 ? `0${nextPauseHours}` : nextPauseHours}:`
                        : ''}
                      {nextPauseMinutes < 10
                        ? `0${nextPauseMinutes}`
                        : nextPauseMinutes}
                      :
                      {nextPauseSeconds < 10
                        ? `0${nextPauseSeconds}`
                        : nextPauseSeconds}
                    </div>}
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 40,
              position: 'relative'
            }}
          >
            <div
              style={{
                fontSize: 140,
                padding: 50,
                paddingTop: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                color: isPause || tournament.status === 'paused' ? '#ffc36b' : '#ffffff',
                zIndex: 1
              }}
            >
              {tournament.status === 'announced' ?
                <div style={{ fontSize: 60 }}>{moment(tournament.dateTime).format('MMMM Do, h:mm a')}</div> :
                <div
                  style={{ borderBottom: '5px solid #212121', paddingBottom: 50 }}
                >
                  {/* {tournament.status === 'paused' && <div style={{ fontSize: 100  }}>{isPause || tournament.status === 'paused'? "BREAK" : ""}</div>} */}
                  {(tournament.status === 'live' || tournament.status === 'paused') && <>
                    <div style={{ fontSize: 50 }}>{isPause ? 'BREAK' : ''}</div>
                    {
                      seconds >= 0 ?
                        <div style={{ fontSize: 170 }}>{hours > 0 ? `${hours < 10 ? `0${hours}` : hours}:` : ''}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                        :
                        <div style={{ fontSize: 170 }}>
                          00:00
                        </div>
                    }
                  </>}
                </div>
              }

            </div>
            <Blinds
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                fontWeight: '600',
                zIndex: 1
              }}
            >
              <div>
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 10
                  }}
                >
                  LEVEL:
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {level}
                </div>
              </div>
              <div>
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 10
                  }}
                >
                  BLIND:
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {currentLevel && currentLevel.smallBlind}/
                  {currentLevel && currentLevel.bigBlind}
                </div>
              </div>
              <div>
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 10
                  }}
                >
                  ANTE:
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {currentLevel && currentLevel.ante}
                </div>
              </div>
            </Blinds>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1 }}>
                <NextLevel style={{ display: 'flex' }}>
                  <VerticalSeparator/>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      marginBottom: 10
                    }}
                  >
                    NEXT LEVEL: <strong>{level + 1}</strong>

                  </div>
                  <VerticalSeparator/>
                </NextLevel>
                {nextLevel ? (
                  <div
                    style={{
                      display: 'flex',
                      marginTop: 30,
                      justifyContent: 'center',
                      zIndex: 1
                    }}
                  >

                    <div style={{ display: 'flex', marginRight: 15 }}>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 35,
                          marginBottom: 10

                        }}
                      >
                        BLIND
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 35,
                          fontWeight: 'bold'
                        }}
                      > &nbsp;
                        {
                          `${nextLevel && nextLevel.smallBlind} / ${nextLevel && nextLevel.bigBlind}`
                        }
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 35,
                          marginBottom: 10
                        }}
                      >
                        ANTE:
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: 35,
                          fontWeight: 'bold'
                        }}
                      >&nbsp;
                        {nextLevel && nextLevel.ante}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: 60, textAlign: 'center' }}>END</div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 0.4, borderLeft: '5px solid #ffc36b' }}>

            {tournament.prizes && tournament.prizes.length && (
              <div style={{ padding: 20, flex: 1, borderBottom: '5px solid #ffc36b' }}>
                {prizes.map((prize, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      minWidth: 350,
                      marginBottom: 10,
                      color: 'white',
                      fontWeight: 'bold',
                      paddingBottom: 20,
                      borderBottom: '1px solid rgba(255,255,255, 0.12)'
                    }}
                  >
                    <div
                      style={{
                        fontSize: 30,
                        minWidth: 120
                      }}
                    >
                      {prize.name}

                    </div>
                    <div style={{
                      fontSize: 30, marginRight: 20, alignSelf: 'flex-end'
                    }}>
                      {prize.hasDescription
                        ? prize.description
                        : `€${prize.value}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ padding: 40, paddingBottom: 50 }}>
              <div style={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>
                TOTAL PRIZE POOL:
              </div>
              <div style={{ color: 'white', fontSize: 60, fontWeight: 'bold', textAlign: 'center' }}>
                {tournament.isGuaranteedPrizePool
                  ? tournament.calculatedPrizePool < tournament.fixedPrizePool
                    ? parseInt(tournament.fixedPrizePool)
                    : parseInt(tournament.calculatedPrizePool) + tournament.offsetPrizePool
                  : parseInt(tournament.calculatedPrizePool) + tournament.offsetPrizePool}{' '}
                EUR
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
