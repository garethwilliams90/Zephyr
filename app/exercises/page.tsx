"use client"

import { useEffect, useState } from "react"
import BoxBreathing from "./components/BoxBreathing"

export default function Exercises() {
  const [exercise, setExercise] = useState("box")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfileStats = async () => {
    try {
      const res = await fetch("/api/get-stripe-customer")
      const stripeCustomer = await res.json()
      console.log(stripeCustomer.customer)
      return stripeCustomer
    } catch (error) {
      throw new Error("Failed to fetch stripe customer: " + error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProfileStats()
      .then((data) => {
        // setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col w-full justify-center items-center z-0">
      <div className="flex flex-col w-auto items-center justify-evenly lg:flex-row lg:tabs tabs-boxed mb-8 lg:m-6 bg-black">
        <div
          onClick={() => {
            setExercise("box")
          }}
          className={`tab ${exercise === "box" && "tab-active"}`}
        >
          Box Breathing
        </div>
        <div
          onClick={() => {
            setExercise("hold")
          }}
          className={`tab tab-disabled ${exercise === "hold" && "tab-active"}`}
        >
          Breathe Holds
        </div>
        <div
          onClick={() => {
            setExercise("tummo")
          }}
          className={`tab tab-disabled ${exercise === "tummo" && "tab-active"}`}
        >
          Tummo Breathing
        </div>
      </div>
      <BoxBreathing />
    </div>
  )
}
