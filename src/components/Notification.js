import React, {useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default function Notification(props) {
  const {anchorOrigin, autoHideDuration, message, onClose} = props
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

  return (
    <div>
      <Snackbar
        anchorOrigin={anchorOrigin || { vertical: 'bottom', horizontal: 'left',}}
        open={open}
        autoHideDuration={autoHideDuration || 6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}