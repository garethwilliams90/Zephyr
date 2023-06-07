"use client"

import ExerciseAnimation from "./exerciseAnimation"

export default function Exercises() {
  return (
    <div className="w-full h-screen justify-center items-center">
      <div className="left-0 w-1/2 h-1/2 object-center">
        <ExerciseAnimation />
      </div>
    </div>
  )
}
