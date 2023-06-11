import Product from "@/app/components/Product"
import getProducts from "@/util/getProducts"

export default async function Shop() {
  const products = await getProducts()
  return (
    <div className="h-screen grid grid-rows-fluid gap-2">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </div>
  )
}
