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

  res.status(200).json({ userSession })
}
