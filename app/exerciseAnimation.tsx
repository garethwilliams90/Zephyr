"use client"

import { motion } from "framer-motion"
import { Player } from "@lottiefiles/react-lottie-player"
import exercise from "@/public/70733-simple-breathing-animation.json"

export default function ExerciseAnimation() {
  return (
    <div className="flex items-center justify-cente flex-col mt-24">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 10 }}
      >
        Inhale
      </motion.h1>
      <Player autoplay loop src={exercise}></Player>
    </div>
  )
}
