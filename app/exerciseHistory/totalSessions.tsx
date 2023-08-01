import React from "react"
import { BsCalendar, BsClock, BsLungs } from "react-icons/bs"
import { formatTime } from "./utils/formatDates"

const TotalSessionsComponent = ({ totalSessions }) => {
  // Sort the totalSessions array by the newest date first
  const sortedSessions = totalSessions.sort(
    (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
  )

  return (
    <div className="gap-2 lg:gap-4 flex flex-col">
      {sortedSessions.map((session, index) => {
        const { formattedTime, formattedDate } = formatTime(session.startedAt)

        return (
          <div key={index} className="p-2 lg:p-6 bg-base-300 rounded-xl">
            <h1 className="text-primary-focus font-semibold text-lg">
              {session.type}
            </h1>
            <div className="flex flex-col md:flex-col lg:flex-row bg-black shadow-lg gap-2 lg:gap-4 rounded-xl p-2 lg:p-4 mt-2">
              <div className="stat ">
                <div className="hidden md:block lg:block stat-figure text-primary">
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
