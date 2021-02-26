import {useState, useEffect} from 'react'
import axios from 'axios'

function NotofcationsAPI() {
    const [notifications, setNotifications] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getNotifications = async () => {
            const res = await axios.get('/api/notifications')
            setNotifications(res.data)
        }
 
        getNotifications()
    }, [callback])

    return {
        notifications: [notifications, setNotifications],
        callback: [callback, setCallback]
    }
}

export default NotofcationsAPI
