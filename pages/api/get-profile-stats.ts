import { prisma } from "@/util/prisma"
import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions)
  console.log(userSession)

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }

  const longestStreak = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      longestStreak: true,
    },
  })

  const accountCreated = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      createdDate: true,
    },
  })

  console.log(longestStreak, accountCreated)
  res.status(200).json({ longestStreak, accountCreated })
}
