"use client"

import { SetStateAction, useEffect, useState } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"
import ExerciseDuration from "./ExerciseDuration"

export default function BoxBreathing() {
  const [isBreathing, setIsBreathing] = useState<boolean>(false)
  const [breatheLength, setBreatheLength] = useState<number>(5500)
  const [boxLength, setBoxLength] = useState<number>(breatheLength * 4)
  const [exerciseDuration, setExerciseDuration] = useState<number>(300000)
  const [roundCount, setRoundCount] = useState<number>(0)
  const [breathMessage, setBreathMessage] = useState<string>("Click To Start")
  const controls = useAnimation()

  const messageLoop = () => {
    setBreathMessage("Inhale")
    setTimeout(() => setBreathMessage("Hold"), breatheLength)
    setTimeout(() => setBreathMessage("Exhale"), breatheLength * 2)
    setTimeout(() => setBreathMessage("Hold"), breatheLength * 3)
  }

  const handleBreatheLengthChange = (newValue: number) => {
    setBreatheLength(newValue * 1000)
    setBoxLength(newValue * 4)
    console.log(
      `Breathe Length: ${breatheLength} \n\nRound Length: ${boxLength}`
    )
  }

  const handleDurationChange = (newValue: number) => {
    setExerciseDuration(newValue)
    console.log(exerciseDuration)
  }

  const resetAll = () => {
    // Reset the exercise completely
    setBreatheLength(5500)
    setBoxLength(breatheLength * 4)
    setExerciseDuration(boxLength * 5)
  }

  const toggleBreathing = () => {
    setIsBreathing((prevIsBreathing) => !prevIsBreathing)

    if (!isBreathing) {
      setBoxLength(breatheLength * 4)
      animateSquare()
    } else {
      controls.stop()
      controls.set({
        x: "0%",
        y: "0%",
      })
    }
  }

  useEffect(() => {
    if (isBreathing) {
      const interval = setInterval(() => {
        setBoxLength((prevState) => prevState - 1000)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isBreathing])

  const animateSquare = async () => {
    await controls.start({
      x: ["0%", "400%", "400%", "0%", "0%"],
      y: ["0%", "0%", "400%", "400%", "0%"],
      transition: {
        duration: boxLength / 1000,
        ease: "easeInOut",
        repeat: exerciseDuration / boxLength,
      },
    })
  }

  return (
    <div className="flex flex-col p-6 bg-base-300 rounded-xl w-full h-screen text-xl">
      <div className="flex flex-row items-center justify-center bg-black w-full h-2/3 rounded-xl p-6 mb-4">
        <AnimatePresence>
          <div className="w-1/3 h-full flex items-start justify-start ">
            <motion.div className="bg-secondary-focus/80 p-2 rounded-lg w-1/2 h-1/8 text-black">
              Rounds: <span className=" font-bold">{roundCount}</span>
            </motion.div>
          </div>

          <motion.div
            onClick={toggleBreathing}
            className="w-1/3 aspect-square  btn-secondary rounded-2xl font-medium text-black relative flex items-center justify-center m-4"
          >
            <motion.div
              key={"fhnjgn"}
              className="bg-white/80 w-1/5 aspect-square shadow rounded-2xl absolute top-0 left-0"
              animate={controls}
            ></motion.div>
            {!isBreathing && <div className="text-md">Click To Start</div>}
            {isBreathing && <div className="text-md">{boxLength / 1000}</div>}
          </motion.div>
          <div className="w-1/3" key={"foingob9n"}></div>
        </AnimatePresence>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 bg-black rounded-xl">
        <TimerSlider onChange={handleBreatheLengthChange} />
        <ExerciseDuration onChange={handleDurationChange} />
      </div>
    </div>
  )
}
