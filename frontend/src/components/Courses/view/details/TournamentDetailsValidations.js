import { numberValidation } from '../../../../helpers/validationHelpers'
import _ from 'lodash'

export const blindsValidation = ({ blinds, blindLevels, blindMinutesPerLevel }) => {
  const errors = { blinds: [] }
  if (!blindMinutesPerLevel) {
    errors.blindMinutesPerLevel = 'Select interval'
  }
  blinds && blinds.forEach((item, index) => {
    const blindError = {}
    if (!item.smallBlind) {
      blindError.smallBlind = 'Enter SB'
    } else {
      if (!numberValidation.test(item.smallBlind)) {
        blindError.smallBlind = 'Invalid SB'
      } else {
        // if (_.find(blinds, (blind, i) => blind.smallBlind === item.smallBlind && i !== index)) {
        //   blindError.smallBlind = 'Invalid SB'
        // }
      }
    }
    if (item.ante) {
      if (!/^\d+$/.test(item.ante)) {
        blindError.ante = 'Invalid Ante'
      } else {
        if (Number(item.ante) < 0) {
          blindError.ante = 'Invalid Ante'
        }
      }
    }
    if (!item.bigBlind) {
      blindError.bigBlind = 'Enter BB'
    } else {
      if (!numberValidation.test(item.bigBlind)) {
        blindError.bigBlind = 'Invalid BB'
      } else {
        // if (_.find(blinds, (blind, i) => blind.bigBlind === item.bigBlind && i !== index)) {
        //   blindError.bigBlind = 'Invalid BB'
        // }
      }
    }
    if (item.smallBlind && item.bigBlind) {
      if (Number(item.smallBlind) > Number(item.bigBlind)) {
        blindError.smallBlind = 'Invalid SB'
      }
      if (Number(item.bigBlind) < Number(item.smallBlind)) {
        blindError.bigBlind = 'Invalid BB'
      }
    }
    if (Object.keys(blindError).length > 0) {
      errors.blinds[index] = blindError
    }
  })
  return errors
}
export const importValidation = ({ importAll, importTable, importGameRules, importFee, importBlinds, importPrizes, importFestival, tournament }) => {
  const errors = { imports: [] }
  if (!tournament) {
    errors.tournament = 'Please select a tournament.'
  }
  if (!importAll && !importTable && !importGameRules && !importFee && !importBlinds && !importPrizes && !importFestival) {
    errors.importTable = 'You must check at least one option.'
  }
  return errors
}

export const blindsCashValidation = ({ blinds }) => {
  const errors = { blinds: [] }
  const blindErrors = {}
  if (!blinds[0].smallBlind) {
    _.assign(blindErrors, { smallBlind: 'Enter SB' })
  } else {
    if (!numberValidation.test(blinds[0].smallBlind)) {
      _.assign(blindErrors, { smallBlind: 'Invalid SB' })
    }
  }
  if (blinds[0].ante) {
    if (!Number(blinds[0].ante) && Number(blinds[0].ante) !== 0) {
      _.assign(blindErrors, { ante: 'Invalid Ante' })
    } else {
      if (Number(blinds[0].ante < 0)) {
        _.assign(blindErrors, { ante: 'Invalid Ante' })
      } else {
        if (Number(blinds[0].smallBlind && Number(blinds[0].smallBlind) && blinds[0].ante > blinds[0].smallBlind)) {
          _.assign(blindErrors, { ante: 'Invalid Ante' })
        }
      }
    }
  }
  if (!blinds[0].bigBlind) {
    _.assign(blindErrors, { bigBlind: 'Enter BB' })
  } else {
    if (!numberValidation.test(blinds[0].bigBlind)) {
      _.assign(blindErrors, { bigBlind: 'Invalid BB' })
    }
  }
  if (blinds[0].smallBlind && blinds[0].bigBlind) {
    if (Number(blinds[0].smallBlind) > Number(blinds[0].bigBlind)) {
      _.assign(blindErrors, { smallBlind: 'Invalid SB' })
    }
    if (blinds[0].bigBlind < blinds[0].smallBlind) {
      _.assign(blindErrors, { bigBlind: 'Invalid BB' })
    }
  }
  errors.blinds.push(blindErrors)
  return errors
}

export const gameRulesValidation = ({ shotClock }) => {
  const errors = {}
  if (shotClock !== 0 && !shotClock) {
    errors.shotClock = 'Insert Shot Clock'
  } else {
    if (shotClock !== 0 && !Number(shotClock)) {
      errors.shotClock = 'Invalid Shot Clock'
    } else {
      if (Number(shotClock < 0)) {
        errors.shotClock = 'Invalid Shot Clock'
      }
    }
  }
  return errors
}
export const prizesValidation = ({ prizes }) => {
  const errors = { prizes: [] }
  // prizes && prizes.forEach((item, index) => {
  //   const prizeError = {}
  //   if (!item.name) {
  //     prizeError.name = 'Enter prize place'
  //   } else {
  //     if (index === 0 && item.name !== '1') {
  //       prizeError.name = 'First must be 1'
  //     }
  //     if (!/^[0-9]+(-[0-9]+)?$/.test(item.name)) {
  //       prizeError.name = 'Invalid entry'
  //     } else {
  //       if (!item.name.includes('-')) {
  //         if (index > 1 && prizes[index - 1] && prizes[index - 1].name && !prizes[index - 1].name.split('-')[1] && Number(item.name) !== Number(prizes[index - 1].name) + 1) {
  //           prizeError.name = 'Invalid entry'
  //         }
  //         if (index > 1 && prizes[index - 1] && prizes[index - 1].name && prizes[index - 1].name.split('-')[1] && Number(item.name) <= Number(prizes[index - 1].name.split('-')[1])) {
  //           prizeError.name = 'Invalid entry'
  //         }
  //       } else {
  //         if ((Number(item.name.split('-')[1]) <= Number(item.name.split('-')[0]))) {
  //           prizeError.name = 'Invalid entry'
  //         }
  //         if (index > 1 && prizes[index - 1] && prizes[index - 1].name && !prizes[index - 1].name.split('-')[1] && Number(item.name.split('-')[0]) <= Number(prizes[index - 1].name)) {
  //           prizeError.name = 'Invalid entry'
  //         }
  //         if (index > 1 && prizes[index - 1] && prizes[index - 1].name && prizes[index - 1].name.split('-')[1] && Number(item.name.split('-')[0]) <= Number(prizes[index - 1].name.split('-')[1])) {
  //           prizeError.name = 'Invalid entry'
  //         }
  //       }
  //     }
  //   }

  //   if (!item.value) {
  //     prizeError.value = 'Enter prize value'
  //   } else {
  //     if (!numberValidation.test(item.value)) {
  //       prizeError.value = 'Invalid number'
  //     } else {
  //       if (prizes[index - 1] && item.value > Number(prizes[item.order - 2].value)) {
  //         prizeError.value = 'Value too high'
  //       }
  //     }
  //   }
  //   if (Object.keys(prizeError).length > 0) {
  //     errors.prizes[index] = prizeError
  //   }
  // })
  return errors
}

export const feeCashValidation = ({ buyIn, numberOfChips }) => {
  const errors = {}
  if (!buyIn) {
    errors.buyIn = 'Enter minimum buy in value'
  } else {
    if (!numberValidation.test(buyIn)) {
      errors.buyIn = 'Invalid number'
    } else {
      if (Number(buyIn) < 0) {
        errors.buyIn = 'Invalid number'
      }
    }
  }
  return errors
}

export const feeTournamentValidation = ({ buyIn, numberOfChips }) => {
  const errors = {}
  if (!buyIn) {
    errors.buyIn = 'Enter buy in value'
  } else {
    if (!numberValidation.test(buyIn)) {
      errors.buyIn = 'Invalid number'
    } else {
      if (Number(buyIn) < 0) {
        errors.buyIn = 'Invalid number'
      }
    }
  }
  if (!numberOfChips) {
    errors.numberOfChips = 'Enter number of chips'
  } else {
    if (!numberValidation.test(numberOfChips)) {
      errors.numberOfChips = 'Invalid number'
    } else {
      if (Number(numberOfChips < 0)) {
        errors.numberOfChips = 'Invalid number'
      }
    }
  }
  return errors
}
