import moment from 'moment-timezone'

export const createValidation = ({
  name,
  description,
  dateTime,
}) => {
  const errors = {}
  if (!name) {
    errors.name = 'Enter name'
  }
  if (!description) {
    errors.description = 'Enter description'
  }
  if (!dateTime) {
    errors.dateTime = 'Select date and time'
  } else {
    if (moment().diff(dateTime) > 0) {
      errors.dateTime = 'Not allowed'
    }
  }
  return errors
}
export const cashGameValidation = ({
  name,
  description,
  type,
  festival,
  dateTime,
  status,
  registerEnd,
  registerStart
}) => {
  const errors = {}
  if (!name) {
    errors.name = 'Enter name'
  }
  if (!description) {
    errors.description = 'Enter description'
  }
  if (!dateTime) {
    errors.dateTime = 'Select date and time'
  }
  return errors
}

export const editValidation = ({
  name,
  description,
  type,
  festival,
  dateTime,
  status,
  registerEnd,
  registerStart
}) => {
  const errors = {}
  if (!name) {
    errors.name = 'Enter name'
  }
  if (!description) {
    errors.description = 'Enter description'
  }
  if (!dateTime) {
    errors.dateTime = 'Select date and time'
  }

  if (!registerStart) {
    errors.registerStart = 'Select date and time'
  }

  if (!registerEnd) {
    errors.registerEnd = 'Select date and time'
  }

  return errors
}
