import { getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions)

  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" })
    return
  }

  const customer = await stripe.customers.retrieve(
    userSession.user.stripeCustomerId
  )

  res.status(200).json({
    customer,
  })
}
