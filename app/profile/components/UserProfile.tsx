"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function UserProfile() {
  const { data: session, status } = useSession()

  return (
    <div className="stats shadow w-full lg:w-3/5 bg-black">
      <div className="stat flex items-center flex-col gap-4  ">
        {!session?.user && <div>You must Login to see your profile page</div>}
        {session?.user && (
          <div className="flex flex-rows w-full gap-2">
            <div className="w-full bg-base-300 p-4 rounded-xl ">
              <div className="stat-title">
                <span className="">Username:</span>
                <span className="stat-value text-sm">
                  {session?.user?.name}
                </span>
              </div>
              <div className="stat-title">
                Email:{" "}
                <span className="stat-value text-sm">
                  {session?.user?.email}
                </span>
              </div>
              <div className="stat-title">
                Password: <span className="stat-value text-sm">**********</span>
              </div>
            </div>
          </div>
        )}
        <Link
          className="btn btn-primary "
          href={"https://billing.stripe.com/p/login/test_aEUdUQgJv4Y98YEdQR"}
        >
          Customer Portal
        </Link>
      </div>
    </div>
  )
}
