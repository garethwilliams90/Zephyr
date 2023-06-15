"use client"

import BreatheLength from "./components/BreatheLength"
import BreathingExercises from "./components/BreathingExercises"
import StartBreathing from "./components/StartBreathing"
import Timer from "./components/Timer"
import ExerciseAnimation from "./exerciseAnimation"

export default function Exercises() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <BreathingExercises />
      <Timer />
      <BreatheLength />
      <StartBreathing />
    </div>
  )
}
