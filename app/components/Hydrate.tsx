"use client"

import { useThemeStore } from "@/store"
import { ReactNode, useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from "@nextui-org/react"
import { Providers } from "../providers"

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()

  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    // <Providers>
    <SessionProvider>
      {isHydrated ? (
        <body className="lg:px-16 font-roboto" data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </SessionProvider>
    // </Providers>
  )
}
