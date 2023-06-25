"use client"

import ProfileStreak from "./components/ProfileStreak"
import UserProfile from "./components/UserProfile"
import ProfileStats from "./components/profileStats"

export default function Profile() {
  return (
    <div className="min-h-screen bg-base-300 p-4 rounded-xl">
      <div className="flex flex-col gap-4 m-6">
        <ProfileStats />
        <div className="flex flex-row gap-2">
          <ProfileStreak />
          <UserProfile />
        </div>
      </div>
    </div>
  )
}
