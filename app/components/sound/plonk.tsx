"use client"

import { useState } from "react"
import useSound from "use-sound"

export default function Plonk() {
  const plonkURL = "@/static/sounds/plonk.mp3"

  const [play, setPlay] = useState(false)
  const playSound = () => {
    setPlay(true)
    console.log("playing sound")
  }

  return (
    <div className="btn btn-outline" onClick={playSound}>
      {play && <audio controls={false} src="@/public/sounds/plonk.mp3" />}
      Click Me!
    </div>
  )
}
