export const festivalValidation = ({ name, startDate, endDate }) => {
  const errors = {}
  if (!name) {
    errors.name = 'Enter festival name'
  } else {
    if (name.length < 3) {
      errors.name = 'Name must be longer than 3 characters'
    }
  }
  if (!startDate) {
    errors.startDate = 'Select festival start date'
  }
  if (!endDate) {
    errors.endDate = 'Select festival end date'
  }
  return errors
}
