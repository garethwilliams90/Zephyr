import { create } from "zustand"
import { persist } from "zustand/middleware"
import { BreathingSessionType } from "./types/BreathingSessionType"

type ExerciseState = {
  step: number
  type: string
  selectedExercise: BreathingSessionType | {}
  durationSelected: boolean
  selectExercise: () => void
  clearExercise: () => void
}

export const useBreathingExercise = create<ExerciseState>()(
  persist(
    (set) => ({
      step: 1,
      selectedExercise: {},
      type: "box-breathing",
      durationSelected: false,
      selectExercise: () => set((state) => ({})),
      clearExercise: () =>
        set((state) => ({
          step: 1,
          selectedExercise: {},
          type: "box-breathing",
          durationSelected: false,
        })),
    }),
    { name: "breathing-exercise" }
  )
)
