import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function AddManualSession() {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my_modal_6" className="btn btn-disabled">
        Add Manual Session
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a session manually</h3>
          <div className="m-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select date"
                className="bg-white p-2 lg:p-4 rounded-lg"
              />
            </LocalizationProvider>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
