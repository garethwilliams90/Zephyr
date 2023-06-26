"use client"

import formatPrice from "@/util/PriceFormat"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Loading from "../components/Loading"
import { OrderType, ProductType } from "@/types/OrderType"

export default function Dashboard() {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/get-orders")
      const data = await res.json()
      console.log(data)
      return data
    } catch (error) {
      throw new Error("Failed to fetch orders: " + error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchOrders()
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  console.log(`Orders: ${orders}`)

  if (loading)
    return (
      <div className="flex  items-center justify-center">
        <Loading />
      </div>
    )
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <motion.div layout>
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {orders.length > 0 && (
            <>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
                >
                  <h2 className="text-xs font-medium">
                    Order reference: {order.id}
                  </h2>
                  <p className="text-xs">
                    Status:
                    <span
                      className={`${
                        order.status === "complete"
                          ? "bg-success"
                          : "bg-failure"
                      } text-white py-1 rounded-md px-2 mx-2 text-xs`}
                    >
                      {order.status}
                    </span>
                  </p>

                  <p className="text-xs">
                    Time: {new Date(order.createdDate).toString()}
                  </p>
                  <div className="text-sm lg:flex items-center gap-4">
                    {order.products.map((product: ProductType) => (
                      <div className="py-2" key={product.id}>
                        <h2 className="py-2 font-bold text-primary-focus">
                          {product.name}
                        </h2>
                        <div className="flex items-baseline gap-4">
                          {/* <Image
                            src={product.image!}
                            width={36}
                            height={36}
                            alt={product.name}
                            priority={true}
                            className="w-auto"
                          /> */}
                          <p>{formatPrice(product.unit_amount!)}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-medium py-2">
                    Total: {formatPrice(order.amount)}
                  </p>
                </div>
              ))}
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
