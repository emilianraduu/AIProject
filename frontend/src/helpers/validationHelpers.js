export const numberValidation = /^[0-9]+$/

export const validityMax = () => {
  const currDate = new Date()
  const year = currDate.getFullYear()
  const month = currDate.getMonth()
  const day = currDate.getDate()
  return new Date(year + 10, month, day)
}
export const validityMin = () => {
  return new Date()
}
export const birthDateMax = () => {
  const currDate = new Date()
  const year = currDate.getFullYear()
  const month = currDate.getMonth()
  const day = currDate.getDate()
  return new Date(year - 18, month, day)
}
export const birthDateMin = () => {
  const currDate = new Date()
  const year = currDate.getFullYear()
  const month = currDate.getMonth()
  const day = currDate.getDate()
  return new Date(year - 100, month, day)
}
