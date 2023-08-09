import { useSession } from "next-auth/react"
import CompletionAnimation from "./CompletionAnimation"

export default function CompletionCarousel({ playing }: { playing: boolean }) {
  const { data: session, status } = useSession()
  const fullName = session?.user.name

  function extractFirstName(fullName) {
    if (fullName) {
      const names = fullName.split(" ")
      if (names.length > 0) {
        return names[0]
      }
      return ""
    } else return
  }

  return (
    <>
      <div className="carousel w-full h-auto">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="flex flex-col w-full text-center gap-2 lg:gap-6">
            <h1 className="font-bold text-lg lg:text-3xl ">
              Congratulations {extractFirstName(fullName)}!
            </h1>
            <h2 className="text-secondary">You Completed A Session</h2>
            <CompletionAnimation playing={playing} />
            <p>
              You are improving your breathing skills every day, carry on
              practicing to improve even more
            </p>

            <div className="flex justify-between">
              <a href="#slide3" className=""></a>
              <a href="#slide2" className="btn btn-primary">
                Session Summary ❯
              </a>
            </div>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="flex flex-col w-full text-center gap-2 lg:gap-6">
            <h1 className="font-bold text-lg lg:text-3xl ">You Improved!</h1>
            <div className="flex justify-center">
              <div className="bg-primary-content w-full lg:w-1/2 p-4 lg:p-6 text-black rounded-lg flex flex-col gap-4 lg:gap-10">
                <h1 className="font-medium text-md lg:text-xl">Skills</h1>
                <div>
                  <h2>Box Breathing: Level 1</h2>
                  <progress
                    className="progress progress-primary w-56"
                    value="50"
                    max="100"
                  />
                </div>
                <div>
                  <h2>Iron Lungs: Level 1</h2>
                  <progress
                    className="progress progress-primary w-56"
                    value="10"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <a href="#slide1" className="btn btn-circle btn-outline">
                ❮
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
