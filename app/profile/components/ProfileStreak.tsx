"use client"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { DayCalendarSkeleton } from "@mui/x-date-pickers"
import SimpleSnackbar from "@/app/components/SnackBar"
import AddManualSession from "./ManualAddSession"

export default function ProfileStreak({ stats }) {
  function calculateCurrentStreak(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return 0 // If the array is empty or not an array, streak is 0.
    }

    let currentStreak = 1
    let longestStreak = 1

    for (let i = 1; i < array.length; i++) {
      const currentDate = new Date(array[i].startedAt)
      const prevDate = new Date(array[i - 1].startedAt)
      const timeDifference = currentDate - prevDate
      const oneDay = 1000 * 60 * 60 * 24

      if (timeDifference <= oneDay) {
        // If the current date is within 24 hours of the previous date, it's part of the streak.
        currentStreak++
      } else {
        // If the current date is not within 24 hours of the previous date, update the longest streak if necessary.
        longestStreak = Math.max(longestStreak, currentStreak)
        currentStreak = 1 // Reset current streak for the new streak.
      }
    }

    // After the loop, check if the last streak is the longest streak.
    longestStreak = Math.max(longestStreak, currentStreak)

    return longestStreak
  }

  const currentStreak = calculateCurrentStreak(stats.data.totalSessions)
  console.log("Current Streak:", currentStreak)

  return (
    <div className="w-full lg:w-2/5 bg-black p-2 lg:p-4 flex flex-col rounded-xl">
      <div className="stat -m-2 lg:-m-4">
        <div className="stat-title">Current Streak</div>
        <div className="stat-value text-primary">{currentStreak} Days</div>
      </div>
      <div className="flex flex-col p-2 lg:p-4 my-2 lg:my-4 rounded-xl text-primary-focus bg-slate-700 w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            autoFocus
            timezone="system"
            renderLoading={() => <DayCalendarSkeleton />}
          />
        </LocalizationProvider>
        <AddManualSession />
      </div>
    </div>
  )
}
