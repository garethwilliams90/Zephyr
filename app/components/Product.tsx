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
    <div className="hover:border-secondary-focus hover:border-2 p-4 rounded-lg">
      <Link
        href={{
          pathname: `/product/${id}`,
          query: { name, image, unit_amount, id, description, features },
        }}
      >
        <div className="my-2 ">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-80 object-cover rounded-lg mx-2"
            priority={true}
          />
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
