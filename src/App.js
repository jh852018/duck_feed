import { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Entry from './components/Entry'
import Admin from './components/Admin'
import './App.css'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));


function App() {
  const classes = useStyles()
  const [isAdminMode, setIsAdminMode] = useState(false)

  const onChangeAdminMode = (event) => {
    setIsAdminMode(!isAdminMode)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
              Duck Feed App
          </Typography>
          <FormControlLabel
            control={<Switch checked={isAdminMode} onChange={onChangeAdminMode} />}
            label="Admin Mode"
          />
        </Toolbar>
      </AppBar>
      { isAdminMode
        ? <Admin/>
        : <Entry/>
      }
    </div>
  );
}

export default App
