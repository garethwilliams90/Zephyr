"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"
import RoundsSlider from "./RoundsSlider"
import { useRouter } from "next/navigation"

export default function BoxBreathing() {
  const router = useRouter()
  const [breathMessage, setBreathMessage] = useState("Click To Start")
  const [sessionStatus, setSessionStatus] = useState("")
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

  function handleBreathingCompletion() {
    //Create a breathingSession as soon as the page loads up
    fetch("/api/create-breathing-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        breathingSessionId: 3,
        sessionStatus: sessionStatus,
        roundCount: roundCount,
        exerciseName: "Box Breathing",
        breathLength: breathLength,
        totalTime: exerciseDuration,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push("/api/auth/signin")
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
  }

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
    setSessionStatus("started")
  }

  const cancelBreathing = async () => {
    setShowFinished(true)
    await delay(4500)
    setShowFinished(false)
  }

  const finishExercise = () => {
    // Set the state variables to default
    setIsBreathing(false)
    cancelBreathing()
    resetSquare()
    setBreathMessage("Click To Start")
    setSessionStatus("complete")

    handleBreathingCompletion()
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
    if (isBreathing) {
      setInterval(() => {
        setRoundCount((prevState) => prevState + 1)
      }, boxLength)
    }
  }, [isBreathing])

  useEffect(() => {
    setBreathLength(breathLength)
    setBoxLength(breathLength * 4)
    setRounds(rounds)
    setExerciseDuration(rounds * boxLength)
  }, [rounds, breathLength, isBreathing])

  return (
    <div className="flex -m-6 lg:m-0 flex-col p-2 lg:p-6 bg-base-300 rounded-xl w-full h-screen">
      <div className="flex flex-row items-center justify-center bg-black w-full h-2/3 rounded-xl p-2 lg:p-6 mb-4">
        <div className="w-1/6 lg:w-1/3 h-full  flex items-start justify-start "></div>

        {showFinished && (
          <div className="toast toast-start shadow-lg z-50">
            <div className="alert alert-success flex-col">
              <div>
                <span>{roundCount} rounds completed</span>
              </div>
              <span>You can view your stats on your profile page</span>
            </div>
          </div>
        )}

        <AnimatePresence>
          <div
            onClick={toggleBreathing}
            className={`w-3/4 lg:w-1/3 aspect-square btn-secondary rounded-lg lg:rounded-xl font-medium text-black relative flex items-center justify-center m-4`}
          >
            <h1 className="absolute -top-8 lg:-top-10 text-white text-xs lg:text-sm">
              INHALE
            </h1>
            <h1 className="absolute -left-12 lg:-left-16 text-white text-xs lg:text-sm">
              HOLD
            </h1>
            <h1 className="absolute -bottom-8 lg:-bottom-10 text-white text-xs lg:text-sm">
              EXHALE
            </h1>
            <h1 className="absolute -right-12 lg:-right-16 text-white text-xs lg:text-sm">
              HOLD
            </h1>
            <motion.div
              className="bg-white/80 w-1/5 aspect-square shadow rounded-lg lg:rounded-xl absolute top-0 left-0"
              animate={controls}
            ></motion.div>
            <div className="text-md">{breathMessage}</div>
          </div>
        </AnimatePresence>

        <div className="w-1/6 lg:w-1/3 flex flex-col justify-end items-end h-full gap-4">
          <div
            onClick={finishExercise}
            className={`btn btn-outline ${!isBreathing ? "btn-disabled" : ""}`}
          >
            Finish Exercise
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-6 p-4 bg-black rounded-xl">
        <TimerSlider
          onChange={handleBreathLengthChange}
          isBreathing={isBreathing}
        />
        <RoundsSlider onChange={handleRoundChange} isBreathing={isBreathing} />
      </div>
    </div>
  )
}
