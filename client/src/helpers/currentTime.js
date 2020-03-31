export default function currentTime() {
  const todaysDate = new Date()

  // get hours
  const todaysHours = todaysDate.getHours()

  // get minutes
  const todaysMinutes = todaysDate.getMinutes()

  return `${todaysHours}:${todaysMinutes}`
}

