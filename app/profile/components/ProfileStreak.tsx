"use client"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { DayCalendarSkeleton } from "@mui/x-date-pickers"
import SimpleSnackbar from "@/app/components/SnackBar"

export default function ProfileStreak({ stats }) {
  return (
    <div className="stats shadow w-2/5 bg-black">
      <div className="stat">
        <div className="stat-title">Current Streak</div>
        <div className="stat-value text-primary">
          {stats.userSession.user.currentStreak} Days
        </div>
        <div className="flex flex-col p-4 my-4 rounded-xl text-primary-focus bg-slate-700">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              autoFocus
              readOnly
              timezone="system"
              renderLoading={() => <DayCalendarSkeleton />}
            />
          </LocalizationProvider>

          <SimpleSnackbar message={"Add a manual session"} />
        </div>
      </div>
    </div>
  )
}
