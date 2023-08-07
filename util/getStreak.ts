export default function calculateCurrentStreak(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return 0 // If the array is empty or not an array, streak is 0.
  }

  // Sort the totalSessions array by the newest date first
  const sortedSessions = array.sort(
    (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
  )

  let currentStreak = 1
  let longestStreak = 1

  for (let i = 0; i < sortedSessions.length; i++) {
    if (sortedSessions[i].status === "complete") {
      const currentDate = new Date(sortedSessions[i].startedAt)
      const prevDate = new Date(sortedSessions[i + 1].startedAt)
      const timeDifference = currentDate - prevDate
      const oneDay = 1000 * 60 * 60 * 24

      if (timeDifference <= oneDay) {
        // If the current date is within 24 hours of the previous date, it's part of the streak.
        currentStreak++
      } else {
        // If the current date is not within 24 hours of the previous date, update the longest streak if necessary.
        longestStreak = Math.max(longestStreak, currentStreak)
        currentStreak = 0 // Reset current streak for the new streak.
      }
    }
  }

  // After the loop, check if the last streak is the longest streak.
  longestStreak = Math.max(longestStreak, currentStreak)

  return [currentStreak, longestStreak]
}
