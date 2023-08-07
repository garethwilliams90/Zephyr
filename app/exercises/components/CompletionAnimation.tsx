import { useState } from "react"
import { Player, Controls } from "@lottiefiles/react-lottie-player"
import exerciseComplete from "@/public/exerciseComplete.json"

export default function CompletionAnimation({ playing }: { playing: boolean }) {
  return (
    <div>
      {playing && ( // Conditionally render animation based on state
        <Player
          className="w-32 aspect-square m-4"
          autoplay={true}
          loop={false}
          src={exerciseComplete}
          keepLastFrame={true}
          speed={0.8}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      )}
    </div>
  )
}
