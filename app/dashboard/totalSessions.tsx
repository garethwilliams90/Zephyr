import React from "react"
import { BsCalendar, BsClock, BsLungs } from "react-icons/bs"

const formatTime = (isoDate) => {
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

const TotalSessionsComponent = ({ totalSessions }) => {
  return (
    <div className="gap-2 lg:gap-4 flex flex-col">
      {totalSessions.map((session, index) => {
        const { formattedTime, formattedDate } = formatTime(session.startedAt)

        return (
          <div key={index} className="p-2 lg:p-6 bg-base-300 rounded-xl">
            <h1 className="text-primary-focus font-semibold text-lg">
              {session.type}
            </h1>
            <div className="flex flex-col md:flex-row lg:flex-row bg-black shadow-lg gap-2 lg:gap-4 rounded-xl p-2 lg:p-4 mt-2">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <BsCalendar size={40} />
                </div>
                <div className="stat-title">Date</div>
                <div className="flex flex-col">
                  <div className="stat-value text-primary">{formattedDate}</div>
                  <div className="stat-value text-info text-sm">
                    {formattedTime}
                  </div>
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-primary">
                  <BsLungs size={40} />
                </div>
                <div className="stat-title">Rounds Completed</div>
                <div className="stat-value text-primary">
                  {session.roundsCompleted}
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-primary">
                  <BsClock size={40} />
                </div>
                <div className="stat-title">Time</div>
                <div className="stat-value text-primary">
                  {session.totalTime / 1000}s
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Breath Length</div>
                <div className="stat-value text-primary">
                  {session.breatheLength / 1000}s
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TotalSessionsComponent
