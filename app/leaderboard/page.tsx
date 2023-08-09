"use client"

import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { useSession } from "next-auth/react"
import Link from "next/link"
import LeaderboardTable from "./components/LeaderboardTable"

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const { data: session, status } = useSession()

  const fetchAllUsers = async () => {
    try {
      const res = await fetch("/api/get-all-users")
      const usersData = await res.json()
      console.log(usersData)
      return usersData
    } catch (error) {
      throw new Error("Failed to fetch all users: " + error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchAllUsers()
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    )
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {!session?.user && <div>You must Login to see your profile page</div>}
      {session?.user && (
        <div className="bg-black p-4 rounded-2xl m-2 lg:m-4">
          <LeaderboardTable users={users} />
        </div>
      )}
    </>
  )
}
