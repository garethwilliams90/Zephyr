"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"
import RoundsSlider from "./RoundsSlider"
import { useRouter } from "next/navigation"
import BoxBreathMessages from "./BoxBreathMessages"
import FinishedExercisePopup from "./FinishedExercisePopup"
import { FaCog } from "react-icons/fa"

export default function BoxBreathing() {
  const router = useRouter()

  const [showFinished, setShowFinished] = useState(false)
  const [isBreathing, setIsBreathing] = useState(false)

  const [breathMessage, setBreathMessage] = useState("Click To Start")
  const [sessionStatus, setSessionStatus] = useState("")

  const [rounds, setRounds] = useState(3)
  const [roundCount, setRoundCount] = useState(0)
  const [breathLength, setBreathLength] = useState(5500)
  const [boxLength, setBoxLength] = useState(breathLength * 4)
  const [exerciseDuration, setExerciseDuration] = useState(rounds * boxLength)

  const progressControls = useAnimation()
  const controls = useAnimation()

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  function handleBreathingCompletion(status) {
    //Create a breathingSession as soon as the page loads up
    fetch("/api/create-breathing-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        breathingSessionId: 3,
        sessionStatus: status,
        roundCount: rounds,
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

  const resetProgressBar = () => {
    progressControls.stop()
    progressControls.set({
      scaleX: 0,
    })
  }

  const completeExercise = async () => {
    // send API post request with completed exercise data
    setSessionStatus("complete")
    resetVariables()
    setShowFinished(true)
    await delay(4500)
    setShowFinished(false)

    if (rounds > 0) {
      handleBreathingCompletion("complete")
    }
    setRoundCount(0)
  }

  const cancelExercise = () => {
    // reset all and do not send API POST
    resetVariables()
    setSessionStatus("")
  }

  const resetVariables = () => {
    setIsBreathing(false)
    resetProgressBar()
    resetSquare()
    setBreathMessage("Click To Start")
  }

  const startBreathing = async () => {
    if (!isBreathing) {
      setIsBreathing(true)
      setBreathMessage("")
      animateProgressBar(exerciseDuration)
      await animateSquare(rounds, boxLength).then(() => {
        setSessionStatus("complete")
        completeExercise()
      })
    } else return
  }

  const animateSquare = async (rounds: number, boxLength: number) => {
    await controls.start({
      x: ["0%", "400%", "400%", "0%", "0%"],
      y: ["0%", "0%", "400%", "400%", "0%"],
      transition: {
        duration: boxLength / 1000,
        ease: "easeInOut",
        repeat: rounds - 1,
      },
    })
  }

  const animateProgressBar = async (exerciseDuration: number) => {
    await progressControls.start({
      scaleX: [0, 1],
      transition: {
        duration: exerciseDuration / 1000,
        ease: "linear",
        repeat: 0,
      },
    })
  }

  function handleBreathLengthChange(value: number): void {
    setBreathLength(value * 1000)
    setBoxLength(breathLength * 4)
    setExerciseDuration(boxLength * rounds)
  }

  function handleRoundChange(value: number): void {
    setRounds(value)
    setExerciseDuration(rounds * boxLength)
  }

  useEffect(() => {
    setInterval(() => {
      setRoundCount((prevState) => prevState + 1)
    }, boxLength)
  }, [isBreathing])

  return (
    <div className="flex -m-6 lg:m-0 flex-col p-2 lg:p-6 bg-base-300 rounded-xl w-full h-screen">
      <AnimatePresence>
        <motion.div
          animate={progressControls}
          className="h-1 bg-primary rounded-xl align-baseline"
        ></motion.div>
      </AnimatePresence>
      <div className="flex flex-row items-center justify-center bg-black w-full h-2/3 rounded-xl p-2 lg:p-6 mb-4">
        <div className="w-1/6 lg:w-1/3 h-full  flex items-start justify-start "></div>
        <FinishedExercisePopup
          showFinished={showFinished}
          roundCount={roundCount}
        />
        <AnimatePresence>
          <div
            onClick={startBreathing}
            className={`w-3/4 md:w-1/3 lg:w-1/3 aspect-square btn-secondary rounded-lg lg:rounded-xl font-medium text-black relative flex items-center justify-center m-10`}
          >
            <BoxBreathMessages />
            <motion.div
              className="bg-white/80 w-1/5 aspect-square shadow rounded-lg lg:rounded-xl absolute top-0 left-0"
              animate={controls}
            ></motion.div>
            <div className="text-md">{breathMessage}</div>
          </div>
        </AnimatePresence>

        <div className="w-1/6 lg:w-1/3 flex flex-col justify-end items-end h-full gap-4">
          <div
            onClick={cancelExercise}
            className={`btn btn-outline ${!isBreathing ? "btn-disabled" : ""}`}
          >
            Cancel Exercise
          </div>
        </div>
      </div>

      {/* The button to open modal */}
      <div className="w-full flex items-center justify-center">
        <label htmlFor="my_modal_6" className="btn btn-outline">
          <FaCog size={40} />
        </label>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Exercise Settings</h3>
          <div className="flex flex-col items-center justify-center gap-2 lg:gap-6 p-4 rounded-xl">
            <TimerSlider
              onChange={handleBreathLengthChange}
              isBreathing={isBreathing}
            />
            <RoundsSlider
              onChange={handleRoundChange}
              isBreathing={isBreathing}
            />
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
