"use client"

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from "react-icons/ai"
import { motion, AnimatePresence } from "framer-motion"
import DarkLight from "./DarkLight"
import { useSession } from "next-auth/react"
import formatPrice from "@/util/PriceFormat"
import { useState } from "react"
import Drawer from "./Drawer"
import { Tooltip } from "@mui/material"

export default function Nav() {
  const cartStore = useCartStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { data: session, status } = useSession()

  //Total Price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)

  return (
    <div className="px-4 fixed left-0 top-0 w-full navbar bg-base-100 mb-4 hover:bg-base-300  shadow-md shadow-black/30 z-100 ">
      <Link href={"/"} className="flex-1">
        <h1 className="btn btn-ghost normal-case text-xl rounded-full">
          BoxBreath
        </h1>
      </Link>
      <div className="flex-none gap-4">
        {/* {Dark Mode} */}
        <DarkLight />
        <Tooltip title="View your cart" arrow>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartStore.cart.length > 0 && (
                  <motion.span
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    exit={{ scale: 0 }}
                  >
                    <motion.span className="badge badge-sm indicator-item bg-secondary text-white z-0">
                      {cartStore.cart.length}
                    </motion.span>
                  </motion.span>
                )}
              </div>
            </label>

            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-300 shadow border-gray-600 border"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartStore.cart.length} Items
                </span>
                <span className="text-info">
                  Subtotal: {formatPrice(totalPrice)}
                </span>

                <div className="card-actions">
                  <button
                    onClick={() => cartStore.toggleCart()}
                    className="btn btn-outline btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Tooltip>

        {/* If the user is not signed in */}
        {!session?.user && (
          <li className="btn btn-ghost bg-primary text-white font-medium py-2 px-4 rounded-full">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}

        {/* User is signed in */}
        {session?.user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session.user?.image as string}
                  alt={session.user.name as string}
                  width={36}
                  height={36}
                  className="rounded-full"
                  tabIndex={0}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg  bg-base-300 rounded-box w-48 border-gray-600 border"
            >
              <li>
                <Link
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link href={"/shop"}>Shop</Link>
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
                <Link href={"/settings"}>Settings</Link>
              </li>
              <li
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
