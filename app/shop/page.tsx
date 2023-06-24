import Product from "@/app/components/Product"
import getProducts from "@/util/getProducts"
import Link from "next/link"
import StripePricingTables from "./pricingTable"

export default async function Shop() {
  const products = await getProducts()
  return (
    <>
      <StripePricingTables />
      <div className="h-screen grid grid-rows-fluid gap-2">
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>
    </>
  )
}
