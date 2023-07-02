"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function UserProfile() {
  const { data: session, status } = useSession()

  return (
    <div className="stats shadow w-3/5 bg-black">
      <div className="stat">
        {!session?.user && <div>You must Login to see your profile page</div>}
        {session?.user && (
          <div className="flex flex-rows w-full gap-2">
            <div className="w-2/3 h-1/2 bg-base-300 p-4 rounded-xl ">
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
                Password: <span className="stat-value text-sm">password</span>
              </div>
            </div>
            <div className="w-1/3 h-1/3 bg-base-300 p-3 rounded-xl flex items-center justify-center">
              <Image
                src={session.user?.image as string}
                alt={session.user?.name as string}
                width={60}
                height={60}
                className="rounded-full w-1/2"
                tabIndex={0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
