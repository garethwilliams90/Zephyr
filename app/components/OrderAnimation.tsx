import { motion } from "framer-motion"
import Loading from "./Loading"

export default function OrderAnimation() {
  return (
    <div className="flex items-center justify-cente flex-col mt-24">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 10 }}
      >
        Prepping your order...
      </motion.h1>
      <div className="w-1/2 h-1/2">
        <Loading />
      </div>
    </div>
  )
}
