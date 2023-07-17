"use client"

import { Stack, Slider } from "@mui/material"
import { SetStateAction, useState } from "react"

interface DurationSliderProps {
  onChange: (value: number) => void
}

export default function RoundsSlider({ onChange }: DurationSliderProps) {
  const [breathLength, setBreathLength] = useState<number>(3)
  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 25,
      label: "25",
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
      className="bg-secondary-focus rounded-xl px-6 my-4 pb-8 pt-4 w-1/3 flex flex-row items-center justify-center"
      spacing={1}
    >
      <div className="my-2">Target Rounds</div>
      <Slider
        onChange={handleSliderChange}
        getAriaLabel={() => "Custom marks"}
        orientation="horizontal"
        value={breathLength}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={1}
        max={25}
        color="secondary"
        size="medium"
      />
    </Stack>
  )
}
