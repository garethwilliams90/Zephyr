import Link from "next/link"
import Exercises from "./exercises/page"
import ExerciseAnimation from "./exerciseAnimation"

export default async function Home() {
  return (
    <div className="hero min-h-screen bg-base-200 rounded-xl">
      <div className="hero-content text-center">
        <div className="max-w-full">
          <Link href={"/exercises"}>
            <h1 className="p-6 btn btn-ghost text-5xl font-bold h-auto w-auto btn-circle">
              Start breathing here...
            </h1>
          </Link>
        </div>
      </div>
    </div>
  )
}
