"use client"

import { use, useEffect, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"
import ExerciseDuration from "./ExerciseDuration"

export default function BoxBreathing() {
  const [breathMessage, setBreathMessage] = useState("Click To Start")
  const [isBreathing, setIsBreathing] = useState(false)
  const [rounds, setRounds] = useState(3)
  const [roundCount, setRoundCount] = useState(0)
  const [breathLength, setBreathLength] = useState(5500)
  const [boxLength, setBoxLength] = useState(breathLength * 4)
  const [exerciseDuration, setExerciseDuration] = useState(rounds * boxLength)
  const controls = useAnimation()

  const resetSquare = () => {
    controls.stop()
    controls.set({
      x: "0%",
      y: "0%",
    })
  }

  const messageTimer = () => {
    // Update the message every breathLength
    setBreathMessage("INHALE")

    setTimeout(() => {
      setBreathMessage("HOLD")
    }, breathLength)
    setTimeout(() => {
      setBreathMessage("EXHALE")
    }, breathLength * 2)
    setTimeout(() => {
      setBreathMessage("HOLD")
    }, breathLength * 3)
    return
  }

  const startBreathing = () => {
    messageTimer()
    // Increment roundCount every full round
    setInterval(() => {
      setRoundCount((prevState) => prevState + 1)
      messageTimer()
    }, boxLength)

    animateSquare(rounds, boxLength)
  }

  const toggleBreathing = () => {
    setIsBreathing((prevState) => !prevState)

    if (!isBreathing) {
      startBreathing()
    } else {
      resetSquare()
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

  return (
    <div className="flex flex-col p-6 bg-base-300 rounded-xl w-full h-screen text-xl">
      <div className="flex flex-row items-center justify-center bg-black w-full h-2/3 rounded-xl p-6 mb-4">
        <AnimatePresence>
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
            className="w-1/3 aspect-square  btn-secondary rounded-xl font-medium text-black relative flex items-center justify-center m-4"
          >
            <motion.div
              className="bg-white/80 w-1/5 aspect-square shadow rounded-xl absolute top-0 left-0"
              animate={controls}
            ></motion.div>
            <div className="text-md">{breathMessage}</div>
          </motion.div>
          <div className="w-1/3"></div>
        </AnimatePresence>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 bg-black rounded-xl">
        <TimerSlider onChange={handleBreatheLengthChange} />
        {/* <ExerciseDuration onChange={handleDurationChange} /> */}
      </div>
    </div>
  )
}
