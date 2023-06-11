import ExerciseAnimation from "@/app/exerciseAnimation"

export default function StartBreathing() {
  return (
    <>
      <div className="bg-secondary rounded-full p-4 my-4 font-medium">
        Start Breathing here...
      </div>
      <div className="left-0 w-1/2 h-1/2 object-center">
        <ExerciseAnimation />
      </div>
    </>
  )
}
