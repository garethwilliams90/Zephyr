"use client"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { DayCalendarSkeleton } from "@mui/x-date-pickers"
import SimpleSnackbar from "@/app/components/SnackBar"
import AddManualSession from "./ManualAddSession"
import calculateCurrentStreak from "@/util/getStreak"
import { BsFire } from "react-icons/bs"

export default function ProfileStreak({ stats }) {
  const [currentStreak, longestStreak] = calculateCurrentStreak(
    stats.data.totalSessions
  )

  console.log(currentStreak, longestStreak)

  return (
    <div className="w-full lg:w-2/5 bg-black p-2 lg:p-4 flex flex-col rounded-xl">
      <div className="stat -m-2 lg:-m-4">
        <div className="stat-title">Current Streak</div>
        <div className="stat-value text-primary">{currentStreak} Days</div>
        <div className="stat-figure text-primary">
          <BsFire size={40} />
        </div>
      </div>
      <div className="stat -m-2 lg:-m-4">
        <div className="stat-title">Longest Streak</div>
        <div className="stat-value text-purple-400">{longestStreak} Days</div>
        <div className="stat-figure text-purple-400">
          <BsFire size={40} />
        </div>
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
