export const createValidation = ({
  identityNumber,
  identitySeries,
  identityValidity,
  firstName,
  lastName,
  birthDate,
  citizenship,
  country,
  address,
  email,
  password,
  role,
  gender
}) => {
  const errors = {}
  if (!identityNumber) {
    errors.identityNumber = 'Enter identity number'
  }
  if (!identitySeries) {
    errors.identitySeries = 'Select series/no'
  }

  if (!firstName) {
    errors.firstName = 'Select firstname'
  }
  if (!lastName) {
    errors.lastName = 'Select lastname'
  }
  if (!birthDate) {
    errors.birthDate = 'Select birth date'
  }
  if (!gender) {
    errors.gender = 'Select gender'
  }
  if (!citizenship) {
    errors.citizenship = 'Select citizenship'
  }
  if (!country) {
    errors.country = 'Select country'
  }
  if (!address) {
    errors.address = 'Select address'
  }
  if (!email) {
    errors.email = 'Select email'
  }
  if (!password) {
    errors.password = 'Select password'
  }
  if (!role) {
    errors.role = 'Select role'
  }
  return errors
}
