import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Label from './Label'
import Notification from './Notification'
import { API_URL_BASE } from '../config/constants'

const useStyles = makeStyles((theme) => ({
  label: {
      marginTop: '0.5em',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submitButton: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(3),
  },
}))

function Entry() {
  const classes = useStyles()
  const defaultDFData = {dfTime : '', dfFood : 'Breadcrumbs', dfLocation : 'Pond', dfCount : '3', dfFoodType : 'Snack', dfFoodQty: '15'}
  const defaultNotifData = {isOpen: false, message: '', type:'info'}
  const [duckFeedData, setDuckFeedData] = useState(Object.assign({}, defaultDFData))
  const [notification, setNotification] = useState(Object.assign({}, defaultNotifData))

  const onChangeDuckFeedData = (attr, value) => {
    let newDuckFeedData = Object.assign({}, duckFeedData)
    newDuckFeedData[attr] = value
    setDuckFeedData(newDuckFeedData)
  }

  const onClickSubmit = () => {
    let dfData = Object.assign({}, duckFeedData)
    dfData['dfTime'] = (new Date(dfData['dfTime'])).toISOString()
    console.log('--->', dfData)
    axios.post(`${API_URL_BASE}/duck-feed-entry`, dfData, {headers: { 'content-type': 'application/json' }})
      .then((result) => {
        const { data } = result
        if(result.status !== 200 || data.error){
          setNotification({isOpen: true, message: 'Error! Data not processed. Please try again.', type:'error'})       
        } else {
          setNotification({isOpen: true, message: 'Duck Feed data successfully added', type:'success'})
        }
        console.log('RESPONSE=>', result)
        // setNotification({isOpen: true, message: 'Duck Feed data successfully submitted'}) 
      })
    setDuckFeedData(Object.assign({}, defaultDFData))
    setNotification({isOpen: true, message: 'Duck Feed data successfully submitted', type:'info'}) 
  }

  const handleNotificationClose = (event, reason) => {
    setNotification({isOpen: false, message: '', type: 'info'})
  }

  const validateData = () => {
    const { dfTime, dfFood, dfLocation } = duckFeedData
    if(!(dfTime && dfFood && dfLocation)){
      setNotification({isOpen: true, message: 'Required fields(*) missing.', type:'error'})
      return true
    } else if (new Date(dfTime) > new Date()){
      setNotification({isOpen: true, message: 'Feed time can not be in future', type:'error'})
      return true
    }
    return false
  }
  const submitHandler = (event) => {
    event.preventDefault()
    console.log('--> In submitHandler')
    if (validateData()){
      return
    }
    onClickSubmit()
  }

  const getDuckFeedTime = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Label text='What time the ducks are fed?*'/>
        </Grid>
        <TextField
          id="time"
          type="datetime-local"
          className={classes.textField}
          InputLabelProps={{
              shrink: true,
          }}
          inputProps={{
              step: 300, // 5 min
          }}
          value={duckFeedData['dfTime']}
          onChange={(event) => {onChangeDuckFeedData('dfTime', event.target.value)}}
        />
      </Grid>
    )
  }

  const getDuckFeedFood = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Label text='What food the ducks are fed?*'/>
        </Grid>
        <TextField
          className={classes.textField}
          value={duckFeedData['dfFood']}
          onChange={(event) => onChangeDuckFeedData('dfFood', event.target.value)}
        />
      </Grid>
    )
  }

  const getDuckFeedLocation = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Label text='Where the ducks are fed?*'/>
        </Grid>
        <TextField
          className={classes.textField}
          value={duckFeedData['dfLocation']}
          onChange={(event) => onChangeDuckFeedData('dfLocation', event.target.value)}
        />
      </Grid>
    )
  }

  const getDuckFeedCount = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Label text='How many ducks are fed?'/>
        </Grid>
        <TextField
          className={classes.textField}
          value={duckFeedData['dfCount']}
          onChange={(event) => onChangeDuckFeedData('dfCount', event.target.value)}
        />
      </Grid>
    )
  }

  const getDuckFeedFoodType = () => {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Label text='What kind of food the ducks are fed?'/>
        </Grid>
        <TextField
          className={classes.textField}
          value={duckFeedData['dfFoodType']}
          onChange={(event) => onChangeDuckFeedData('dfFoodType', event.target.value)}
        />
      </Grid>
    )
  }

  const getDuckFeedFoodAmt = () => {
    return (
      <Grid container>
          <Grid item xs={6}>
            <Label text='How much food(in g) the ducks are fed?'/>
          </Grid>
          <TextField
            className={classes.textField}
            value={duckFeedData['dfFoodQty']}
            onChange={(event) => onChangeDuckFeedData('dfFoodQty', event.target.value)}
          />
      </Grid>
    )
  }

  const getNotification = () => {
    return (
      <Notification
        open={notification['isOpen']}
        message={notification['message']}
        onClose={handleNotificationClose}
        type={notification['type']}
      />
    )
  }
  
  return (
    <form className={classes.container} noValidate onSubmit={submitHandler}>
        {getDuckFeedTime()}
        {getDuckFeedFood()}
        {getDuckFeedLocation()}
        {getDuckFeedCount()}
        {getDuckFeedFoodType()}
        {getDuckFeedFoodAmt()}
        <Button
          className={classes.submitButton}
          variant='contained'
          color='primary'
          type='submit'
          disableElevation
        >
          Submit
        </Button>
        {getNotification()}
    </form>
  )
}

export default Entry