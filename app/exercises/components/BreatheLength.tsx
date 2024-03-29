import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"
import MuiInput from "@mui/material/Input"
import VolumeUp from "@mui/icons-material/VolumeUp"
import { FaClock } from "react-icons/fa"

const Input = styled(MuiInput)`
  width: 42px;
`

export default function BreatheLength() {
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(30)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0)
    } else if (value > 100) {
      setValue(100)
    }
  }

  return (
    <div className="items-center justify-center w-full">
      <div className="bg-secondary rounded-full p-4 my-4 font-medium mb-10">
        Select the length of each breathe
      </div>
      <Box sx={{ width: 500 }}>
        <Typography id="input-slider" gutterBottom>
          Seconds
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FaClock />
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 0.2,
                min: 2,
                max: 15,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
