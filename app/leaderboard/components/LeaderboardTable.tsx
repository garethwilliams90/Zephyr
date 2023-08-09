import { leaderboardUserType } from "@/types/leaderboardUserType"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function LeaderboardTable(data) {
  const { data: session, status } = useSession()

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Rank</th>
              <th></th>
              <th>User</th>
              <th>Rounds</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {data.users.sortedUsers.map(
              (user: leaderboardUserType, index: number) => {
                return (
                  <tr
                    key={index}
                    className={
                      user.id === session.user.id
                        ? "text-primary bg-blue-600 font-semibold"
                        : ""
                    }
                  >
                    <th>{index + 1}</th>

                    <td>
                      <Image
                        src={`${user.image}`}
                        alt={user.image}
                        width={44}
                        height={44}
                        className="rounded-full "
                        tabIndex={0}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.totalRounds}</td>

                    <td>
                      <div className="p-2 bg-red-500 text-white font-semibold rounded-full flex items-center justify-center">
                        {user.currentStreak}
                      </div>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
