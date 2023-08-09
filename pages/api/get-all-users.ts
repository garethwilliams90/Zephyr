import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { prisma } from "@/util/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get user
  const userSession = await getServerSession(req, res, authOptions)

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }

  const users = await prisma.user.findMany({
    where: { NOT: {} },
    select: {
      name: true,
      image: true,
      totalTime: true,
      totalRounds: true,
      currentStreak: true,
      id: true,
    },
  })

  const sortedUsers = users.sort(
    (userA, userB) => userB.totalRounds - userA.totalRounds
  )

  res.status(200).json({
    userSession,
    sortedUsers,
  })
}
