import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Link from "next/link"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

export default function BreathingExercises() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className="mb-20 w-full">
      <div className="bg-secondary rounded-full p-4 my-4 font-medium mb-10">
        Select an exercise
      </div>

      <Box
        className="bg-base-300 rounded-xl flex"
        sx={{
          flexGrow: 1,
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Box Breathing" {...a11yProps(0)} />
          <Tab label="Tummo" {...a11yProps(1)} />
          <Tab label="Breath Holds" {...a11yProps(2)} />
          <Tab label="Nasal Clearing" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          A simple but effective exercise that involes holds after inhaling and
          exhaling...
          <Link className="font-medium text-info" href={"/info/box-breathing"}>
            Click here to learn more about this exercise
          </Link>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
    </div>
  )
}
