import React from 'react'
import Modal from '../../../Global/Modals/Modal'

export default ({ type, closeModal }) => {

  return (
    <Modal visible={type.value} onClose={closeModal} {...type} >

    </Modal>
  )
}
