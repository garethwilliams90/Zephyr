"use client"

import { useEffect, useState } from "react"
import ProfileStreak from "./components/ProfileStreak"
import UserProfile from "./components/UserProfile"
import ProfileStats from "./components/profileStats"
import Loading from "../components/Loading"
import { useSession } from "next-auth/react"

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState([])
  const { data: session, status } = useSession()

  const fetchProfileStats = async () => {
    try {
      const res = await fetch("/api/get-profile-stats")
      const data = await res.json()
      console.log(data)
      return data
    } catch (error) {
      throw new Error("Failed to fetch profile stats: " + error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProfileStats()
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <div className="flex  items-center justify-center">
        <Loading />
      </div>
    )
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {!session?.user && <div>You must Login to see your profile page</div>}
      {session?.user && (
        <div className="min-h-screen bg-base-300 p-4 rounded-xl">
          <div className="flex flex-col gap-4 m-6">
            <ProfileStats stats={stats} />
            <div className="flex flex-row gap-2">
              <ProfileStreak stats={stats} />
              <UserProfile />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
