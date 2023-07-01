"use client"

import { use, useEffect, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"
import ExerciseDuration from "./ExerciseDuration"

export default function BoxBreathing() {
  const [breathMessage, setBreathMessage] = useState("Click To Start")
  const [sessionStatus, setSessionStatus] = useState("pending")
  const [messageStarted, setMessageStarted] = useState(false)
  const [isBreathing, setIsBreathing] = useState(false)
  const [rounds, setRounds] = useState(3)
  const [roundCount, setRoundCount] = useState(0)
  const [breathLength, setBreathLength] = useState(5500)
  const [boxLength, setBoxLength] = useState(breathLength * 4)
  const [exerciseDuration, setExerciseDuration] = useState(rounds * boxLength)
  const controls = useAnimation()

  const messageTimer = async (cancel: boolean) => {
    // Update the message every breathLength
    setBreathMessage("INHALE")

    let timer1 = setTimeout(() => {
      setBreathMessage("HOLD")
    }, breathLength)

    let timer2 = setTimeout(() => {
      setBreathMessage("EXHALE")
    }, breathLength * 2)

    let timer3 = setTimeout(() => {
      setBreathMessage("HOLD")
    }, breathLength * 3)

    if (cancel) {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }

  const resetSquare = () => {
    controls.stop()
    controls.set({
      x: "0%",
      y: "0%",
    })
  }

  const startBreathing = () => {
    // Increment roundCount every full round
    setInterval(() => {
      setRoundCount((prevState) => prevState + 1)
      messageTimer(false)
    }, boxLength)

    animateSquare(rounds, boxLength)
  }

  const stopBreathing = () => {
    // if rounds is greater than 0 send to database
    if (roundCount > 0) {
    }
    // cancel the messageTimer function
    messageTimer(true)
    setMessageStarted(false)
    resetSquare()
    // Clear the breathing message timer stuff
    setBreathMessage("Click To Start")
  }

  const toggleBreathing = async () => {
    setIsBreathing((prevState) => !prevState)
    messageTimer(false)

    if (!isBreathing) {
      await setMessageStarted(true)
      startBreathing()
    } else {
      stopBreathing()
    }
  }

  // Function to animate the square during breathing
  const animateSquare = async (rounds: number, boxLength: number) => {
    await controls.start({
      x: ["0%", "400%", "400%", "0%", "0%"],
      y: ["0%", "0%", "400%", "400%", "0%"],
      transition: {
        duration: boxLength / 1000,
        ease: "easeInOut",
        repeat: rounds,
      },
    })
  }

  function handleBreatheLengthChange(value: number): void {
    throw new Error("Function not implemented.")
  }

  // Create a breathing session as soon as page loads
  useEffect(() => {
    fetch("/api/create-breathing-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roundCount: roundCount,
        sessionStatus: sessionStatus,
      }),
    })
  }, [])

  return (
    <div className="flex flex-col p-6 bg-base-300 rounded-xl w-full h-screen text-xl">
      <div className="flex flex-row items-center justify-center bg-black w-full h-2/3 rounded-xl p-6 mb-4">
        <div className="toast toast-end">
          <div className="alert alert-info">
            <span>Click and hold to end exercise</span>
          </div>
        </div>

        <div className="w-1/3 h-full flex items-start justify-start ">
          <motion.div className="bg-secondary-focus/80 p-2 rounded-lg w-1/2 h-1/8 text-black">
            <div>
              Rounds: <span className=" font-bold">{roundCount}</span>
            </div>
            <div>Breath: {breathLength / 1000}s</div>
            <div>Box Time: {boxLength / 1000}s</div>
            <div>Rounds: {rounds}</div>
            <div>Total Time: {exerciseDuration / 1000}s</div>
            <div>Breathing?: {isBreathing ? "True" : "False"}</div>
          </motion.div>
        </div>

        <motion.div
          onClick={toggleBreathing}
          className="w-1/3 aspect-square btn-secondary rounded-xl font-medium text-black relative flex items-center justify-center m-4"
        >
          <motion.div
            className="bg-white/80 w-1/5 aspect-square shadow rounded-xl absolute top-0 left-0"
            animate={controls}
          ></motion.div>
          <div className="text-md">{breathMessage}</div>
        </motion.div>
        <div className="w-1/3"></div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 bg-black rounded-xl">
        {/* <TimerSlider onChange={handleBreatheLengthChange} /> */}
        {/* <ExerciseDuration onChange={handleDurationChange} /> */}
      </div>
    </div>
  )
}
