import { prisma } from "@/util/prisma"
import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import calculateCurrentStreak from "@/util/getStreak"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions)

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }

  const totalSessions = await prisma.user.findMany({
    where: { id: userSession.user.id },
    select: {
      breathingSessions: true,
    },
  })

  const sessions = totalSessions[0].breathingSessions

  const totalRounds = sessions.reduce((sum, session) => {
    return sum + session.roundsCompleted
  }, 0)

  const totalTime = sessions.reduce((sum, session) => {
    return sum + session.totalTime
  }, 0)

  const accountCreated = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      createdDate: true,
    },
  })

  // Update prisma model with current streak and longest streak
  const [currentStreak, longestStreak] = await calculateCurrentStreak(sessions)

  const data = {
    accountCreated: accountCreated,
    totalRounds: totalRounds,
    totalSessions: sessions,
    totalTime: totalTime,
    currentStreak: currentStreak,
    longestStreak: longestStreak,
  }

  const updateData = await prisma.user.update({
    where: { id: userSession.user.id },
    data: {
      totalRounds: data.totalRounds,
      currentStreak: currentStreak,
      longestStreak: longestStreak,
    },
  })

  console.log({ userSession, data })

  res.status(200).json({
    userSession,
    data,
  })
}
