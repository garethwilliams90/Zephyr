import Link from "next/link"
import Exercises from "./exercises/page"
import ExerciseAnimation from "./exerciseAnimation"

export default async function Home() {
  return (
    <div className="h-auto bg-base-300 p-4 rounded-xl">
      <div className="flex flex-col items-center py-10">
        <h1 className="text-7xl font-bold text-primary">Zephyr</h1>
        <h2 className="w-3/4 lg:w-2/3 p-6 text-lg lg:text-xl my-10 leading-loose tracking-wide text-center">
          An app designed to help you create and sustain healthy breathing
          habits to improve you mental, physical and emotional health, one
          breathe at a time.
        </h2>
        <Link
          href={"/exercises"}
          className={
            "p-6 btn btn-secondary text-xl lg:text-2xl font-bold h-auto w-auto"
          }
        >
          Start breathing here...
        </Link>
        <div className="flex flex-col bg-black p-4 pb-0 lg:p-6 w-full lg:w-1/2 h-auto mt-10 lg:mt-20 rounded-xl">
          <div className="text-lg lg:text-2xl font-bold tracking-widest">
            Features
          </div>
          <div className="bg-base-100 p-2 lg:p-4 rounded-xl my-4">
            <h1 className="font-semibold text-lg text-primary">
              Create a habit
            </h1>
            <p className="text-md font-light leading-relaxed text-base-content">
              Whilst tracking you progress and seeing gradual improvements you
              will start to create a small yet effective habit.
            </p>
          </div>
          <div className="bg-base-100 p-2 lg:p-4 rounded-xl my-4">
            <h1 className="font-semibold text-lg text-primary">
              Improve you breathing
            </h1>
            <p className="text-md font-light leading-relaxed text-base-content">
              Performing breathing exercises and breath holds that have been
              proven to help improve breathing ability and breath hold time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
