export const parseDate = (date: Date): string => {
  if (!date) {
    return 'Date not available'
  }
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return Intl.DateTimeFormat('en-us', options).format(date)
}
