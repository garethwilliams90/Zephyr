export default function calculateCurrentStreak(array: any[]) {
  if (!Array.isArray(array) || array.length === 0) {
    return [0, 0] // Both current streak and longest streak are 0 if array is empty or not an array.
  }

  // Sort the array by the startedAt property in ascending order
  array.sort(
    (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
  )

  let currentStreak = 0
  let longestStreak = 0
  const oneDay = 1000 * 60 * 60 * 24 // 24 hours in milliseconds
  const today = new Date().getTime()
  let lastCompletedDate = null

  for (let i = 0; i < array.length; i++) {
    if (array[i].roundsCompleted > 0 && array[i].status === "complete") {
      const exerciseDate = new Date(array[i].startedAt).toLocaleDateString()

      if (lastCompletedDate === null || exerciseDate === lastCompletedDate) {
        // Exercise on the same day as the previous one, increment the streak
        currentStreak++
      } else {
        // Exercise on a different day, reset the streak
        currentStreak = 1
      }

      // Update the last completed date
      lastCompletedDate = exerciseDate

      // Update longest streak if necessary
      longestStreak = Math.max(longestStreak, currentStreak)
    }
  }

  return [currentStreak, longestStreak]
}
