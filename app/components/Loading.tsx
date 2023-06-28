import loader from "@/public/loader.json"
import { Player } from "@lottiefiles/react-lottie-player"

export default function Loading() {
  return <Player autoplay speed={1} loop src={loader}></Player>
}
