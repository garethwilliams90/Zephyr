import databaseType from ".databasetype"
import { useEffect, useState } from "react"

// Technologies used to build Zephyr...

interface TechnologiesProps {
  Typescript: true
  TailwindCSS: UX | UI
  NextJS: true
  Prisma: databaseType
  GoogleAuth: true
  Stripe: payments
  daisyUI: UX | UI
  nextUI: UX | UI
}

export default function App({ TailwindCSS }: TechnologiesProps) {
  const [framer, setFramer] = useState(true)
  const [figma, setFigma] = useState(true)

  useEffect(() => {
    // figma and framer were used to start to build the ui quickly
    console.log("Using Figma & Framer....\n")
  }, [figma, framer])

  const getWorkflow = () => {
    // Actions and workflow management with Git/GitHub and Github Actions
    fetch("/api/create-github-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gitHub: true,
        git: true,
        gitHubActions: true,
      }),
    }).then((res) => {
      return res.json()
    })
  }

  return <Zephyr>{children}</Zephyr>
}
