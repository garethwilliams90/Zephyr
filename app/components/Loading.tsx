import loader from "@/public/loader.json"
import { Player } from "@lottiefiles/react-lottie-player"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Player autoplay speed={1} loop src={loader} />
      <div className="text-3xl font-medium text-primary">loading.....</div>
    </div>
  )
}
