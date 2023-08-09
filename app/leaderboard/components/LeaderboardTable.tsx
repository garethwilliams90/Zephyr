import { leaderboardUserType } from "@/types/leaderboardUserType"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { IoPersonAddSharp } from "react-icons/io5"

export default function LeaderboardTable(data) {
  const { data: session, status } = useSession()

  return (
    <>
      <div className="w-full">
        <table className="table-compact w-full">
          {/* head */}
          <thead className="border-b border-primary-focus">
            <tr>
              <th>Rank</th>
              <th></th>
              <th>User</th>
              <th>Rounds</th>
              <th>Streak</th>
              <th></th>
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
                        ? "text-primary border-x-2 border-primary font-semibold"
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
                    <td>
                      {user.id !== session.user.id && (
                        <div className="btn btn-primary">
                          <IoPersonAddSharp />
                        </div>
                      )}
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
