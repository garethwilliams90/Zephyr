"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import { OrderType, ProductType } from "@/types/OrderType"
import TotalSessionsComponent from "./totalSessions"

export default function History() {
  const [history, setHistory] = useState<[]>([])
  const [totalSessions, setTotalSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/get-profile-stats")
      const data = await res.json()

      return data
    } catch (error) {
      throw new Error("Failed to fetch orders: " + error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchHistory()
      .then((data) => {
        setHistory(data)
        setTotalSessions(data.data.totalSessions)
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
      <div className="font-secondary font-bold text-lg lg:text-2xl mb-4">
        Exercise History
      </div>
      <TotalSessionsComponent totalSessions={totalSessions} />
    </>
  )
}
