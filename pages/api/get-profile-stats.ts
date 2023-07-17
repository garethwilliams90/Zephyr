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

  const currentStreak = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      currentStreak: true,
    },
  })

  const totalTime = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      totalTime: true,
    },
  })

  const totalSessions = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      sessions: true,
    },
  })

  const totalRounds = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      totalRounds: true,
    },
  })

  const accountCreated = await prisma.user.findFirst({
    where: { id: userSession.user.id },
    select: {
      createdDate: true,
    },
  })

  const data = {
    accountCreated: accountCreated,
    totalRounds: totalRounds,
    totalSessions: totalSessions,
    totalTime: totalTime,
    currentStreak: currentStreak,
    longestStreak: longestStreak,
  }

  res.status(200).json({
    userSession,
    data,
  })
}
