import React, {createContext, useState, useEffect} from 'react'
import UserAPI from './api/UserAPI'
import PostsAPI from './api/PostsAPI'
import CategoriesAPI from './api/CategoriesAPI'
import CommentsAPI from './api/CommentsAPI'
import NotificationsAPI from './api/NotifcationsAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        userAPI: UserAPI(token),
        postsAPI: PostsAPI(),
        categoriesAPI: CategoriesAPI(),
        commentsAPI: CommentsAPI(),
        notificationsAPI: NotificationsAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}