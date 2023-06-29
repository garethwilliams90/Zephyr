"use client"

import { Stack, Slider } from "@mui/material"
import { SetStateAction, useState } from "react"

interface DurationSliderProps {
  onChange: (value: number) => void
}

export default function ExerciseDuration({ onChange }: DurationSliderProps) {
  const [breathLength, setBreathLength] = useState<number>(5)
  const marks = [
    {
      value: 0.5,
      label: "30s",
    },
    {
      value: 5,
      label: "5min",
    },
    {
      value: 15,
      label: "15min",
    },
  ]

  const handleSliderChange = (e: any, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setBreathLength(newValue)
      onChange(newValue) // Call the onChange function passed from the parent component
    }
  }

  return (
    <Stack
      className="bg-base-100 rounded-xl px-6 my-4 pb-8 pt-4 w-1/3 flex flex-row items-center justify-center"
      spacing={1}
    >
      <div className="my-2">Total Breathing Time</div>
      <Slider
        onChange={handleSliderChange}
        getAriaLabel={() => "Custom marks"}
        orientation="horizontal"
        value={breathLength}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={0.5}
        max={15}
        color="primary"
        size="medium"
      />
    </Stack>
  )
}
