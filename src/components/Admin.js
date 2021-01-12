import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'
import Notification from './Notification'
import { adminColumns } from '../config/column_config'
import { API_URL_BASE } from '../config/constants'

function Admin() {
  const defaultNotifData = {isOpen: false, message: '', type:'info'}
  const [rows, setRows] = useState([])
  const [notification, setNotification] = useState(Object.assign({}, defaultNotifData))

  useEffect(() => {
    axios.get(`${API_URL_BASE}/duck-feed-admin`)
      .then((result) => {
        const { data } = result
        if(result.status !== 200 || data.error){
          setNotification({isOpen: true, message: 'Error! Unable to get data. Please try again.', type:'error'})       
        } else {
          setRows(data.message)
          setNotification({isOpen: true, message: 'Duck Feed data successfully fetched', type:'success'})
        }
        console.log('RESPONSE=>', result)
      })
    return () => {
      setRows([])
    }
  }, [])

  const handleNotificationClose = (event, reason) => {
    setNotification({isOpen: false, message: '', type:'info'})
  }
  
  return (
    <div style={{ minHeight:'40%', height: 'auto', width: '100%' }}>
      <DataGrid rows={rows} columns={adminColumns} pageSize={5} autoHeight={true}/>
      <Notification
        open={notification['isOpen']}
        message={notification['message']}
        onClose={handleNotificationClose}
        type={notification['type']}
      />
    </div>
  )
}
  
export default Admin