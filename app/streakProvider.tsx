import React, { createContext, useContext, useState } from "react"

const StreakContext = createContext()

export function useStreakContext() {
  return useContext(StreakContext)
}

export function StreakProvider({ children }) {
  const [streakData, setStreakData] = useState([0, 0]) // Default values

  return (
    <StreakContext.Provider value={{ streakData, setStreakData }}>
      {children}
    </StreakContext.Provider>
  )
}
