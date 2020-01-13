import React from 'react'
import Blinds from './BlindsForm'
import GameRules from './GameRulesForm'
import Prizes from './PrizesForm'
import ImportDetails from './ImportDetailsForm'
import Fee from './FeeForm'
import Info from './InfoForm'
import Modal from '../../../Global/Modals/Modal'
import Adjust from './AdjustForm'

export default ({ type, closeModal }) => {

  return (
    <Modal visible={type.value} onClose={closeModal} {...type} >
      {type.value === 'blinds' && <Blinds onClose={closeModal} />}
      {type.value === 'gameRules' && <GameRules onClose={closeModal} />}
      {type.value === 'prizes' && <Prizes onClose={closeModal} />}
      {type.value === 'import' && <ImportDetails onClose={closeModal} />}
      {type.value === 'info' && <Info onClose={closeModal} />}
      {type.value === 'fee' && <Fee onClose={closeModal} />}
      {type.value === 'adjust' && <Adjust onClose={closeModal} />}
    </Modal>
  )
}
