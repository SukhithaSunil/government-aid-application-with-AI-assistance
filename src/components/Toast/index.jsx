import Snackbar from '@mui/material/Snackbar'

export const Toast = ({message,open,handleClose}) => {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  )
}
