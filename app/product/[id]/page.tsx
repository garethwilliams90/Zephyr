import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamTypes"
import formatPrice from "@/util/PriceFormat"
import AddCart from "./AddCart"

export default async function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-16 h-full">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={96}
        height={96}
        className="rounded-lg w-1/3 lg:w-2/3  aspect-square"
        priority={true}
      />

      <div className="font-medium ">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  )
}
