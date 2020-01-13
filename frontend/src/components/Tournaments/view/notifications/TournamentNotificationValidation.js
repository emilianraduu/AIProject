export const createValidation = ({
  title,
  message,
  type
}) => {
  const errors = {}
  if (!title) {
    errors.title = 'Enter title'
  }
  if (!message) {
    errors.message = 'Enter message'
  }
  if (!type) {
    errors.type = 'Select target users'
  }
  return errors
}
