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
  gender
}) => {
  const errors = {}
  // if (!identityNumber) {
  //   errors.identityNumber = 'Enter identity number'
  // }
  // if (!identitySeries) {
  //   errors.identitySeries = 'Select series/no'
  // }

  if (!firstName) {
    errors.firstName = 'Select firstname'
  } else {
    if (firstName.length < 3) {
      errors.firstName = 'Must be longer than 3'
    }
  }
  if (!lastName) {
    errors.lastName = 'Select lastname'
  } else {
    if (lastName.length < 3) {
      errors.lastName = 'Must be longer than 3'
    }
  }
  // if (!birthDate) {
  //   errors.birthDate = 'Select birth date'
  // }
  // if (!gender) {
  //   errors.gender = 'Select gender'
  // }
  // if (!citizenship) {
  //   errors.citizenship = 'Select citizenship'
  // }
  // if (!country) {
  //   errors.country = 'Select country'
  // }
  // if (!address) {
  //   errors.address = 'Select address'
  // }
  return errors
}
