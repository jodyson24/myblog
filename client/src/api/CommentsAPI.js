import {useState, useEffect} from 'react'
import axios from 'axios'

export default function CommentsAPI() {
    const [comments, setComments] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(()=>{
        const getComments = async () => {
            const res = await axios.get('/api/comments')
            setComments(res.data)
           // console.log(comments)
        }
        getComments()
    },[callback])

    return{
        comments: [comments, setComments],
        callback: [callback, setCallback]
    }
}
