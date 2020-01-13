export const SAVE_TOURNAMENTS_WIZZARD_STEP = 'SAVE_TOURNAMENTS_WIZZARD_STEP'

export const saveTournamentWizzardStep = ({ data, step, wizzardContext, tournamentType }) => {
  const { dispatch } = wizzardContext
  dispatch({
    type: SAVE_TOURNAMENTS_WIZZARD_STEP,
    payload: data,
    step,
    tournamentType
  })
}
export const CLEAR_TOURNAMENT_WIZZARD = 'CLEAR_TOURNAMENT_WIZZARD'
export const clearWizzard = ({ wizzardContext, tournamentType }) => {
  const { dispatch } = wizzardContext
  dispatch({
    type: CLEAR_TOURNAMENT_WIZZARD,
    tournamentType
  })
}
