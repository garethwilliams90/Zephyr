"use client"

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { motion, AnimatePresence } from "framer-motion"
import DarkLight from "./DarkLight"
import { useSession } from "next-auth/react"
import formatPrice from "@/util/PriceFormat"
import { Tooltip } from "@mui/material"
import { BsFire } from "react-icons/bs"
import { useEffect, useState } from "react"
import useSound from "use-sound"
import DropDown from "./Dropdown"
import Plonk from "./sound/plonk"
import calculateCurrentStreak from "@/util/getStreak"

export default function Nav() {
  const cartStore = useCartStore()
  const { data: session, status } = useSession()
  const [streak, setStreak] = useState(null)

  useEffect(() => {
    setStreak(session?.user.currentStreak)
    console.log(session)
  }, [session])

  return (
    <div className="px-4 fixed opacity-95 left-0 top-0 w-full navbar bg-base-300 mb-4 hover:bg-base-300  shadow-md shadow-black/30 z-50">
      <Link href={"/"} className="flex-1">
        <h1 className="btn btn-ghost normal-case text-lg lg:text-xl rounded-full">
          Zephyr
        </h1>
      </Link>
      <div className="flex-none gap-4">
        {session?.user && (
          <div className="-mt-4">
            <div className="bg-red-500 rounded-full h-4 w-4 shadow-xl top-2 left-4 relative flex justify-center items-center">
              <p className="text-white font-semibold text-sm">{streak}</p>
            </div>
            <BsFire size={30} />
          </div>
        )}
        {/* {Dark Mode} */}
        <DarkLight />
        {/* <Plonk /> */}

        {/* If the user is not signed in */}
        {!session?.user && (
          <li className="btn btn-ghost bg-primary text-white font-medium py-2 px-4 rounded-full">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}

        {/* <DropDown /> */}

        {/* User is signed in */}
        {session?.user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-12 rounded-full">
                <Image
                  src={session.user?.image as string}
                  alt={session.user.name as string}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-blue-400"
                  tabIndex={0}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg  bg-base-300 rounded-box w-48 md:w-64 lg:w-64 border-gray-600 border"
            >
              <li>
                <Link
                  href={"/exerciseHistory"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  History
                </Link>
              </li>

              <li>
                <Link href={"/profile"}>
                  <h3 className="justify-between">
                    Profile
                    <span className="badge mx-2 ">New</span>
                  </h3>
                </Link>
              </li>

              <li>
                <Link href={"/leaderboard"}>
                  <h3 className="justify-between">
                    Leaderboard
                    <span className="badge mx-2 ">New</span>
                  </h3>
                </Link>
              </li>
              <li
                className="hover:bg-red-500/40 rounded-full"
                onClick={() => {
                  signOut()
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur()
                  }
                }}
              >
                <h3>Sign out</h3>
              </li>
            </ul>
          </div>
        )}
      </div>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </div>
  )
}
