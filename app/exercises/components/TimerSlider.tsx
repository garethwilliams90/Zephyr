"use client"

import { Stack, Slider } from "@mui/material"
import { SetStateAction, useState } from "react"

interface TimerSliderProps {
  onChange: (value: number) => void
}

export default function TimerSlider({ onChange }: TimerSliderProps) {
  const [breathLength, setBreathLength] = useState<number>(5.5)
  const marks = [
    {
      value: 2,
      label: "2s",
    },
    {
      value: 5.5,
      label: "5.5s",
    },
    {
      value: 15,
      label: "15s",
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
      className="bg-base-100 rounded-xl px-6 pb-8 pt-4 w-1/3 flex flex-row items-center justify-center"
      spacing={1}
    >
      <div className="my-2">Inhale/Exhale length</div>
      <Slider
        onChange={handleSliderChange}
        getAriaLabel={() => "Custom marks"}
        orientation="horizontal"
        value={breathLength}
        step={0.5}
        valueLabelDisplay="auto"
        marks={marks}
        min={2}
        max={15}
        color="secondary"
        size="medium"
      />
    </Stack>
  )
}