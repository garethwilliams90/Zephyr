export default function calculateCurrentStreak(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return [0, 0] // Both current streak and longest streak are 0 if array is empty or not an array.
  }

  // Sort the totalSessions array by the newest date first
  const sortedSessions = array.sort(
    (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
  )

  const oneDay = 1000 * 60 * 60 * 24
  let currentStreak = 0
  let longestStreak = 0

  const today = new Date()
  const todayTimestamp = today.getTime() // Convert today to a timestamp

  let prevDate = new Date(sortedSessions[0].startedAt)
  let prevDateTimestamp = prevDate.getTime()

  for (let i = 0; i < sortedSessions.length; i++) {
    if (
      sortedSessions[i].status === "complete" &&
      sortedSessions[i].roundsCompleted > 0
    ) {
      const currentDate = new Date(sortedSessions[i].startedAt)
      const currentDateTimestamp = currentDate.getTime() // Convert currentDate to a timestamp
      const timeDifference = (prevDateTimestamp - currentDateTimestamp) / oneDay

      if (timeDifference <= 1) {
        // If the current date is within 24 hours of the previous date, it's part of the streak.
        currentStreak++
      } else {
        // If the streak is broken, update the longest streak if necessary.
        longestStreak = Math.max(longestStreak, currentStreak)
        currentStreak = 0
      }

      prevDate = currentDate // Update the previous date for streak calculation.
      prevDateTimestamp = currentDateTimestamp
    }
  }

  // Check if the streak continues till today.
  const lastCompletedTimestamp = prevDate.getTime()
  const timeDifference = (todayTimestamp - lastCompletedTimestamp) / oneDay
  if (timeDifference <= 1) {
    currentStreak++
  }

  // Update the longest streak only if currentStreak is greater.
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak
  }

  return [currentStreak, longestStreak]
}
