import Link from "next/link"
import FeaturesInfo from "./components/nextUI/FeaturesInfo"

export default async function Home() {
  return (
    <div className="h-auto bg-base-300 p-4">
      <div className="flex flex-col items-center py-10">
        <h1 className="text-7xl font-bold text-primary">Zephyr</h1>
        <h2 className="w-full lg:w-2/3 p-6 text-lg lg:text-xl my-10 leading-loose tracking-wide text-center">
          An app designed to help you create and sustain healthy breathing
          habits to improve your mental, physical and emotional health, one
          breathe at a time.
        </h2>
        <Link
          href={"/exercises"}
          className={
            "p-6 btn btn-outline text-xl lg:text-2xl font-bold h-auto w-auto"
          }
        >
          START
        </Link>
        <FeaturesInfo />
      </div>
    </div>
  )
}
