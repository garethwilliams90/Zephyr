import * as React from "react"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import MuiAlert, { AlertProps } from "@mui/material/Alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SimpleSnackbar({ message }: { message: String }) {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <div>
      <div className="btn btn-primary" onClick={handleClick}>
        {message}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        message="Feature Work In Progress"
        action={action}
      />
    </div>
  )
}
