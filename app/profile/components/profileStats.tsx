"use client"

import { BsLungs, BsClock, BsFire } from "react-icons/bs"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import Loading from "@/app/components/Loading"

export default function ProfileStats(stats) {
  const { data: session, status } = useSession()

  return (
    <>
      <div>
        <div className="stats shadow bg-black w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <BsLungs size={40} />
            </div>
            <div className="stat-title">Total Sessions</div>
            <div className="stat-value text-primary">0</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <BsClock size={40} />
            </div>
            <div className="stat-title">Minutes Breathing</div>
            <div className="stat-value text-secondary">{stats.totalTime}</div>
            <div className="stat-desc">Top 8% of all users</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <BsFire size={40} />
            </div>
            <div className="stat-title">Current Streak</div>
            <div className="stat-value text-secondary">
              {stats.currentStreak} Days
            </div>
            <div className="stat-desc">Top 1% of all users</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary ">
              <Tooltip title="Upgrade to access all features" arrow>
                <div className="w-full rounded-full">
                  <Image
                    src={session?.user?.image as string}
                    alt={session?.user?.name as string}
                    width={64}
                    height={64}
                    className="rounded-full "
                    tabIndex={0}
                  />
                </div>
              </Tooltip>
            </div>
            <Tooltip title="Click to see upgrade options" arrow>
              <Link href={"/pricingOptions"} className="btn btn-ghost">
                <div className="stat-value ">Premium</div>
              </Link>
            </Tooltip>
            <div className="stat-title">Membership</div>
            <div className="stat-desc text-secondary">
              You have access to all premium features
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
