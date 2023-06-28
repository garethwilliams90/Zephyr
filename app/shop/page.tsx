import Product from "@/app/components/Product"
import getProducts from "@/util/getProducts"
import Link from "next/link"
import StripePricingTables from "./pricingTable"
import SubscribeStatButton from "../components/SubscribeStatButton"

export default async function Shop() {
  const products = await getProducts()
  return (
    <>
      <SubscribeStatButton />
      <div className="h-1/2 grid grid-rows-fluid gap-4">
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>
    </>
  )
}
