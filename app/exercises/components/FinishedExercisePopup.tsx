import { useEffect, useState } from "react"
import CompletionCarousel from "./CompletionCarousel"

interface PopupProps {
  showFinished: boolean
  roundCount?: number | null
  disabled: boolean
}

export default function FinishedExercisePopup({ disabled }: PopupProps) {
  const [animationPlaying, setAnimationPlaying] = useState(false)

  const togglePlayState = () => {
    setAnimationPlaying((prevState) => !prevState) // Update state to start animation playback
  }

  return (
    <>
      {/* The button to open modal */}
      <label
        htmlFor="my_modal_7"
        className={`btn btn-outline ${disabled ? "btn-disabled" : ""}`}
        onClick={togglePlayState}
      >
        Exercise Summary
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="flex flex-col bg-base-100 w-2/3 h-auto p-10 rounded-xl shadow-xl gap-4">
          <CompletionCarousel playing={animationPlaying} />
          <div className="modal-action ">
            <label
              htmlFor="my_modal_7"
              className="btn btn-outline"
              onClick={togglePlayState}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
