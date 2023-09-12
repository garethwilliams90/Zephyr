import { prisma } from "@/util/prisma"
import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import calculateStreak from "@/util/calculateStreak"

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

  // calculate the new streaks with the new sessions array
  const [currentStreak, longestStreak] = await calculateStreak(sessions)

  const data = {
    accountCreated: accountCreated,
    totalRounds: totalRounds,
    totalSessions: sessions,
    totalTime: totalTime,
    currentStreak: currentStreak,
    longestStreak: longestStreak,
  }

  // Update the database with the new streak, rounds and time
  const updateData = await prisma.user.update({
    where: { id: userSession.user.id },
    data: {
      totalRounds: data.totalRounds,
      currentStreak: currentStreak,
      longestStreak: longestStreak,
      totalTime: totalTime,
    },
  })

  res.status(200).json({
    userSession,
    data,
  })
}
