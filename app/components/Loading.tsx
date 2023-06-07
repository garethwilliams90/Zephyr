import loading from "@/public/loading.json"
import { Player } from "@lottiefiles/react-lottie-player"

export default function Loading() {
  return <Player autoplay speed={1} loop src={loading}></Player>
}
