import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "./auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { AddCartType } from "@/types/AddCartType"
import { prisma } from "@/util/prisma"
import { ProductType } from "@/types/ProductType"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string)

const calculateOrderAmount = (items: ProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!
  }, 0)
  return totalPrice
}

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
  const { items, payment_intent_id } = req.body
  const total = calculateOrderAmount(items)
  //Create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: item.unit_amount,
        image: item.image,
        quantity: item.quantity,
      })),
    },
  }
}
