import React, {useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification(props) {
  const {anchorOrigin, autoHideDuration, message, onClose, type} = props
  const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    onClose(event, reason)
  };

  return(
    <div>
      <Snackbar
        anchorOrigin={anchorOrigin || {vertical: 'bottom', horizontal: 'left'}}
        open={open}
        autoHideDuration={autoHideDuration || 3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}