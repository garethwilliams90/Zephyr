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
  console.log(userSession)

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }

  //Extract the data from the body
  const {
    breathingSessionId,
    sessionStatus,
    roundCount,
    exerciseName,
    breathLength,
    totalTime,
  } = req.body

  // Create the breathing session data
  const breathingSessionData = {
    id: breathingSessionId,
    type: exerciseName,
    totalTime: totalTime,
    roundsCompleted: roundCount,
    breatheLength: breathLength,
    status: sessionStatus,
    startedAt: Date(),
    user: { connect: { id: userSession.user?.id } },
    userId: userSession.user.id,
  }

  console.log(breathingSessionData)

  // Update the prisma model with retrieved data
  prisma.exerciseSession.create({
    data: breathingSessionData,
  })

  res.status(200).json({ userSession })

  return
}
