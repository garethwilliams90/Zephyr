import Link from "next/link"
import Exercises from "./exercises/page"
import ExerciseAnimation from "./exerciseAnimation"

export default async function Home() {
  return (
    <div className="hero min-h-screen rounded-xl">
      <div className="hero-content text-center">
        <div className="max-w-full">
          <div className="min-h-screen bg-base-300 p-4">
            <div className="flex flex-col items-center py-10">
              <h1 className="text-7xl font-bold text-primary">Zephyr</h1>
              <h2 className="w-2/3 p-6 text-xl mt-10">
                An app designed to help you create and sustain healthy breathing
                habits to improve you mental, physical and emotional health, one
                breathe at a time.
              </h2>

              <Link
                href={"/exercises"}
                className={
                  "mt-24 p-6 btn btn-outline text-5xl font-bold h-auto w-auto btn-circle"
                }
              >
                Start breathing here...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
