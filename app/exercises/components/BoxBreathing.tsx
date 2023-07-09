"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"
import ExerciseDuration from "./ExerciseDuration"
import { useRouter } from "next/navigation"
import { duration } from "@mui/material"

export default function BoxBreathing() {
  const router = useRouter()
  const [breathMessage, setBreathMessage] = useState("Click To Start")
  const [sessionStatus, setSessionStatus] = useState("pending")
  const [messageStarted, setMessageStarted] = useState(false)
  const [isBreathing, setIsBreathing] = useState(false)
  const [isExerciseRunning, setIsExerciseRunning] = useState(false) // New state variable
  const [rounds, setRounds] = useState(3)
  const [roundCount, setRoundCount] = useState(0)
  const [showFinished, setShowFinished] = useState(false)
  const [breathLength, setBreathLength] = useState(5500)
  const [boxLength, setBoxLength] = useState(breathLength * 4)
  const [exerciseDuration, setExerciseDuration] = useState(rounds * boxLength)
  const controls = useAnimation()
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const resetSquare = () => {
    controls.stop()
    controls.set({
      x: "0%",
      y: "0%",
    })
  }

  const startBreathing = () => {
    animateSquare(rounds, boxLength)
    setRoundCount(0)
  }

  const cancelBreathing = async () => {
    setShowFinished(true)
    await delay(3000)
    setShowFinished(false)
  }

  const finishExercise = () => {
    // Set the state variables to default
    setIsBreathing(false)
    cancelBreathing()
    resetSquare()
    setBreathMessage("Click To Start")

    // Log the rounds completed

    // Update prisma for rounds, time, streak, and session
  }

  const toggleBreathing = () => {
    if (!isBreathing) {
      setIsBreathing(true)
      setBreathMessage("")
      startBreathing()
    } else return
  }

  const animateSquare = async (rounds: number, boxLength: number) => {
    await controls
      .start({
        x: ["0%", "400%", "400%", "0%", "0%"],
        y: ["0%", "0%", "400%", "400%", "0%"],
        transition: {
          duration: boxLength / 1000,
          ease: "easeInOut",
          repeat: rounds - 1,
        },
      })
      .then(() => {
        setRoundCount((prevstate) => prevstate + 1)
        if (!isBreathing) {
          finishExercise()
        }
      })
  }

  function handleBreathLengthChange(value: number): void {
    setBreathLength(value * 1000)
  }

  function handleRoundChange(value: number): void {
    setRounds(value)
  }

  useEffect(() => {
    setBreathLength(breathLength)
    setBoxLength(breathLength * 4)
    setRounds(rounds)
    setExerciseDuration(rounds * boxLength)
    setRoundCount(roundCount)
  }, [rounds, breathLength, isBreathing, roundCount])

  return (
    <div className="flex flex-col p-6 bg-base-300 rounded-xl w-full h-screen text-xl">
      <div className="flex flex-row items-center justify-center bg-black w-full h-2/3 rounded-xl p-6 mb-4">
        <div className="w-1/3 h-full flex items-start justify-start ">
          <div className="bg-secondary-focus/80 p-2 rounded-lg w-1/2 h-1/8 text-black">
            <div>
              Rounds: <span className=" font-bold">{roundCount}</span>
            </div>
            {/* <div>Breath: {breathLength / 1000}s</div>
            <div>Box Time: {boxLength / 1000}s</div>
            <div>Rounds: {rounds}</div>
            <div>Total Time: {exerciseDuration / 1000}s</div>
            <div>Breathing?: {isBreathing ? "True" : "False"}</div> */}
          </div>
        </div>

        {showFinished && (
          <div className="toast toast-start">
            <div className="alert alert-success">
              <span>Exercise Completed</span>
              <span>{roundCount} rounds completed</span>
            </div>
          </div>
        )}

        <AnimatePresence>
          <div
            onClick={toggleBreathing}
            className={`w-1/3 aspect-square btn-secondary rounded-xl font-medium text-black relative flex items-center justify-center m-4`}
          >
            <h1 className="absolute -top-10 text-white">INHALE</h1>
            <h1 className="absolute -left-16 text-white">HOLD</h1>
            <h1 className="absolute -bottom-10 text-white">EXHALE</h1>
            <h1 className="absolute -right-16 text-white">HOLD</h1>
            <motion.div
              className="bg-white/80 w-1/5 aspect-square shadow rounded-xl absolute top-0 left-0"
              animate={controls}
            ></motion.div>
            <div className="text-md">{breathMessage}</div>
          </div>
        </AnimatePresence>

        <div className="w-1/3 flex flex-col justify-end items-end h-full gap-4">
          <div
            onClick={finishExercise}
            className={`btn btn-outline ${!isBreathing ? "btn-disabled" : ""}`}
          >
            Finish Exercise
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 bg-black rounded-xl">
        <TimerSlider onChange={handleBreathLengthChange} />
        <ExerciseDuration onChange={handleRoundChange} />
      </div>
    </div>
  )
}
