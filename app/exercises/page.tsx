"use client"

import { useState } from "react"
import BoxBreathing from "./components/BoxBreathing"

export default function Exercises() {
  const [exercise, setExercise] = useState("box")
  return (
    <div className="flex flex-col w-full justify-center items-center z-0">
      <div className="flex flex-col lg:flex-row tabs tabs-boxed m-2 lg:m-6 bg-black">
        <div
          onClick={() => {
            setExercise("box")
          }}
          className={`tab ${exercise === "box" && "tab-active"}`}
        >
          Box Breathing
        </div>
        <div
          onClick={() => {
            setExercise("hold")
          }}
          className={`tab tab-disabled ${exercise === "hold" && "tab-active"}`}
        >
          Breathe Holds
        </div>
        <div
          onClick={() => {
            setExercise("tummo")
          }}
          className={`tab tab-disabled ${exercise === "tummo" && "tab-active"}`}
        >
          Tummo Breathing
        </div>
      </div>
      <BoxBreathing />
    </div>
  )
}
