export const formatTime = (isoDate) => {
  const date = new Date(isoDate)

  // Format time (am/pm hours/minutes)
  const hours = date.getHours() % 12 || 12
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const ampm = date.getHours() >= 12 ? "pm" : "am"
  const formattedTime = `${hours}:${minutes} ${ampm}`

  // Format date (21st January 2023)
  const day = date.getDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th"
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  const formattedDate = `${day}${suffix} ${month} ${year}`

  return { formattedTime, formattedDate }
}
