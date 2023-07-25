import "./globals.css"
import { Roboto, Lobster_Two } from "next/font/google"
import Nav from "./components/Nav"
import Hydrate from "./components/Hydrate"
import Footer from "./components/Footer"

//Define main font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-robot",
})
const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
})

export const metadata = {
  title: "Zephyr",
  description: "Helping breathing habits stick",
  github: "garethwilliams90",
  author: "Gareth Williams",
  // authorUrl: "https://gareth.dev",
  keywords: [
    "boxbreathing",
    "zephyr",
    "zephyr-app",
    "zepher",
    "zeffer-app",
    "zeffer",
    "breathing exercise",
    "breathing app",
    "nextjs",
    "tailwind",
    "tailwindcss",
    "tailwind-nextjs",
    "tailwindcss-nextjs",
  ],
  // canonical: "https://gareth.dev/",
  image: "https://gareth.dev/images/og.png",
  // ogImage: "https://gareth.dev/images/og.png",
  // ogImageWidth: 1200,
  // ogImageHeight: 630,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`${roboto.variable} ${lobster.variable} overflow-scroll scroll-m-96`}
      lang="en"
    >
      <Hydrate>
        <Nav />
        <div className="mt-28">
          {children}
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>WORK IN PROGRESS</span>
            </div>
          </div>
        </div>
        <Footer />
      </Hydrate>
    </html>
  )
}
