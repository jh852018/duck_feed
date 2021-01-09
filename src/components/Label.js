import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  label: {
      marginTop: '0.5em',
      marginLeft: '1em'
  },
}))


function Label(props) {
  const classes = useStyles()
  const { text } = props 
  return (
    <Typography
      className={classes.label}
      variant='body2'
    >
      { text }
    </Typography>
  )
  }
  
  export default Label