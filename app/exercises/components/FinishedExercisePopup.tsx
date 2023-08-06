interface PopupProps {
  showFinished: boolean
  roundCount?: number | null
}

export default function FinishedExercisePopup({
  showFinished,
  roundCount,
}: PopupProps) {
  return (
    <>
      {showFinished && (
        <div className="toast toast-start shadow-lg z-50">
          <div className="alert alert-success flex-col">
            <div>
              <span>Exercise completed</span>
            </div>
            <span>You can view your stats on your profile page</span>
          </div>
        </div>
      )}
    </>
  )
}
