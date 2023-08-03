import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

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

  //Extract the data from the body
  const { sessionStatus, roundCount, exerciseName, breathLength, totalTime } =
    req.body

  // Create the breathing session data
  const breathingSessionData = {
    type: exerciseName,
    totalTime: totalTime,
    roundsCompleted: roundCount,
    breatheLength: breathLength,
    status: sessionStatus,
    user: { connect: { id: userSession.user?.id } },
  }

  console.log(breathingSessionData)

  if (breathingSessionData.status === "complete") {
    // add this session and the stats to the user prisma model
    // create an breathing session with prisma
    const newSession = await prisma.exerciseSession.create({
      data: breathingSessionData,
    })
  }

  res.status(200).json({ userSession, breathingSessionData })

  return
}
