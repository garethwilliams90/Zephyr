"use client"

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useCartStore } from "@/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import CheckoutForm from "./CheckoutForm"
import OrderAnimation from "./OrderAnimation"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Checkout() {
  const cartStore = useCartStore()
  const router = useRouter()
  const [clientSecret, setClientSecret] = useState("")
  const themeStore = useThemeStore()
  const [stripeTheme, setStripeTheme] = useState<
    "flat" | "stripe" | "night" | "none"
  >("stripe")

  useEffect(() => {
    //Set the theme of stripe
    if (themeStore.mode === "night") {
      setStripeTheme("stripe")
    } else {
      setStripeTheme("night")
    }
    //Create a paymentIntent as soon as the page loads up
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent: cartStore.paymentIntent,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          return router.push("/api/auth/signin")
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setClientSecret(data.paymentIntent.client_secret)
        cartStore.setPaymentIntent(data.paymentIntent)
        console.log(
          `Payment Intent Id: ${data.paymentIntent.id}, \n Client Secret: ${data.paymentIntent.client_secret}`
        )
      })
  }, [])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: stripeTheme,
      labels: "floating",
    },
  }

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </motion.div>
      )}
    </div>
  )
}
