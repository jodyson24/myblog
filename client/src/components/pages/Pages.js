import React
// {useContext} 
from 'react'
import { Switch, Route } from 'react-router-dom'
// import { GlobalState } from '../../GlobalState'

import Home from './client/Home'
import PostITem from './client/PostItem'
import Notifications from './client/Notifications'


// import Login from './auth/Login'

export default function Pages() {
    // const state = useContext(GlobalState)

    //const [isLogged] = state.userAPI.isLogged

    return (
        <>
            <div className="main">
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home} />

                        <Route exact path="/post/:id" component={PostITem} />

                        <Route exact path="/notifications" component={Notifications} />


                    </Switch>
                </div>
            </div>
        </>
    )
}
