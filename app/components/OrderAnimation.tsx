import { motion } from "framer-motion"
import { Player } from "@lottiefiles/react-lottie-player"
import breathe from "@/public/breathe.json"

export default function OrderAnimation() {
  return (
    <div className="flex items-center justify-cente flex-col mt-24">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 10 }}
      >
        Prepping your order...
      </motion.h1>
      <Player autoplay loop src={breathe}></Player>
    </div>
  )
}
