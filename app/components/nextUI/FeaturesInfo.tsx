export default function FeaturesInfo() {
  return (
    <div className="flex flex-col bg-black p-4 pb-0 lg:p-6 w-full lg:w-1/2 h-auto mt-10 lg:mt-20 rounded-xl">
      <div className="text-lg lg:text-2xl font-semibold ">Features</div>
      <div className="bg-base-100 p-2 lg:p-4 rounded-xl my-4">
        <h1 className="font-semibold text-lg text-primary">Create a habit</h1>
        <p className="text-md font-light leading-relaxed text-base-content">
          Whilst tracking your progress and seeing gradual improvements you will
          start to create a small yet effective habit.
        </p>
      </div>
      <div className="bg-base-100 p-2 lg:p-4 rounded-xl my-4">
        <h1 className="font-semibold text-lg text-primary">
          Improve you breathing
        </h1>
        <p className="text-md font-light leading-relaxed text-base-content">
          Performing breathing exercises and breath holds that have been proven
          to help improve breathing ability and breath hold time.
        </p>
      </div>
    </div>
  )
}
