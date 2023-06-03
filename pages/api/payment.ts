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
  const { items, payment_intent } = req.body
  const total = calculateOrderAmount(items)
  console.log(`ID: ${payment_intent.id}`)

  //Create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent.id,
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

  if (payment_intent.id) {
    // console.log(`Payment intent id exists: ${payment_intent_id.id}`

    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent.id
    )
    // console.log(current_intent.id)

    if (current_intent) {
      // update the order in prisma
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent.id,
        { amount: total }
      )
      console.log(updated_intent.id)

      // fetch th order in the prisma database
      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentID: updated_intent.id },
          include: { products: true },
        }),
        prisma.order.update({
          where: { paymentIntentID: updated_intent.id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item) => ({
                name: item.name,
                description: item.description || null,
                unit_amount: parseFloat(item.unit_amount),
                image: item.image,
                quantity: item.quantity,
              })),
            },
          },
        }),
      ])

      if (!existing_order) {
        res.status(400).json({ message: "Invalid Payment Intent" })
      }

      // send the request
      res.status(200).json({ payment_intent })
      return
    }
  } else {
    // Create a new order with prisma since one couldn't be found
    console.log("Couldnt find a payment intent \n creating one now....")

    try {
      // create the payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        description: "Payment for your product or service",
        automatic_payment_methods: { enabled: true },
      })

      // create the new order with prisma
      orderData.paymentIntentID = paymentIntent.id
      const newOrder = await prisma.order.create({
        data: orderData,
      })

      // Return the client secret to the frontend
      res.status(200).json({
        paymentIntent,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Unable to create payment intent" })
    }
  }
}
