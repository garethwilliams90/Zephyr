import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata

  return (
    <div className="border-gray-600 border   btn-ghost p-4 rounded-lg bg-base-300 ">
      <Link
        href={{
          pathname: `/product/${id}`,
          query: { name, image, unit_amount, id, description, features },
        }}
      >
        <div>
          {/* <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className="w-full h-80 object-cover rounded-lg mx-2"
            priority={true}
          /> */}
          <div className="font-medium py-4">
            <h1>{name}</h1>
            <h2 className="text-sm text-primary">
              {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  )
}
