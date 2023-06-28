import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import TimerSlider from "./TimerSlider"

export default function BoxBreathing() {
  const [isBreathing, setIsBreathing] = useState(false)
  const [totalTime, setTotalTime] = useState(25)
  const controls = useAnimation()

  useEffect(() => {
    if (isBreathing) {
      const interval = setInterval(() => {
        animateSquare()
      }, 0)
      return () => clearInterval(interval)
    }
  }, [isBreathing])

  const toggleBreathing = () => {
    setIsBreathing((prevIsBreathing) => !prevIsBreathing)
  }

  //   const adjustTime = () => {
  //     setTotalTime()
  //   }

  const animateSquare = async () => {
    await controls.start({
      x: ["0%", "400%", "400%", "0%", "0%"], // Animation from top left -> top right -> bottom right -> bottom left -> top left
      y: ["400%", "400%", "00%", "0%", "400%"], // Animation from top left -> top right -> bottom right -> bottom left -> top left
      transition: {
        duration: totalTime,
        ease: "easeInOut",
        repeat: Infinity,
      }, // Repeat the animation in a cycle
    })
  }

  return (
    <div className="flex flex-col p-6 m-4 bg-base-300 rounded-xl w-full h-screen text-xl ">
      <motion.div className="flex gap-8 flex-row items-center justify-center bg-black w-full h-1/2 rounded-xl p-6 mb-4">
        <div className="w-1/3 h-full"></div>
        <motion.div
          onClick={toggleBreathing}
          className="w-1/3 aspect-square btn-primary bg-secondary  rounded-md font-medium text-black relative"
        >
          <motion.div
            className="bg-white w-1/5 aspect-square shadow rounded-md absolute top-0 left-0"
            animate={controls}
          >
            <div></div>
          </motion.div>
          {!isBreathing && <>Click to start</>}
          {isBreathing && <div>Time Remaining {totalTime}</div>}
        </motion.div>
        <div className="w-1/3"></div>
      </motion.div>
      <TimerSlider />
    </div>
  )
}
