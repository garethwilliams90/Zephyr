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
  let lastStreakIncrementDate = null
  let longestStreakStartDate = null

  for (let i = 0; i < array.length; i++) {
    if (array[i].roundsCompleted > 0 && array[i].status === "complete") {
      let exerciseDate = new Date(array[i].startedAt)

      if (lastStreakIncrementDate === null) {
        currentStreak = 1 // Initialize streak on the first exercise
        lastStreakIncrementDate = exerciseDate
        longestStreakStartDate = exerciseDate
      } else {
        let timeSinceLastIncrement =
          (exerciseDate.getTime() - lastStreakIncrementDate.getTime()) / oneDay

        while (timeSinceLastIncrement <= 1) {
          const exerciseDay = exerciseDate.toDateString()
          const lastIncrementDay = lastStreakIncrementDate.toDateString()

          if (exerciseDay !== lastIncrementDay) {
            // Increment only if the day is different
            currentStreak++
            lastStreakIncrementDate = exerciseDate

            // Update longest streak if necessary
            if (currentStreak > longestStreak) {
              longestStreak = currentStreak
              longestStreakStartDate = exerciseDate
            }

            break // Exit the while loop
          }

          i++ // Move to the next exercise
          if (i < array.length) {
            exerciseDate = new Date(array[i].startedAt)
            timeSinceLastIncrement =
              (exerciseDate.getTime() - lastStreakIncrementDate.getTime()) /
              oneDay
          } else {
            break // Exit the loop when there are no more exercises
          }
        }

        if (timeSinceLastIncrement > 1) {
          // Reset the streak if more than 24 hours have passed since last increment
          currentStreak = 1
          lastStreakIncrementDate = exerciseDate
          longestStreakStartDate = exerciseDate
        }
      }
    }
  }

  return [currentStreak, longestStreak]
}
