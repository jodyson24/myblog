import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

import PostsAdmin from './PostsAdmin'
import Mail from './Mail'
import Settings from './Settings'
import Users from './Users'
import MainBoard from './MainBoard'
import Media from './Media'
import Comments from './Comments'
import Pages from './Pages'


import CreatePost from './CreatePost'


export default function Dashboard() {
    // eslint-disable-next-line
    const state = useContext(GlobalState)

    const logoutUser = async () =>{
        await axios.post('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const goHome = () => {
        window.location.href = "/";
    }

    return (
        <div className="admin_page">
            <Router>
            <div className="side-nav">
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke="none" className="icon_svg-fill_as_stroke" fill="#b92b27" fillRule="nonzero"><path d="M20.0072,17.2488 L18.7456,17.2488 C18.6968,17.8088 18.4064,18.3592 17.6776,18.3592 C16.9736,18.3592 16.5368,17.8352 16.0272,17.0792 C17.848,15.7952 19.0608,13.7848 19.0608,11.3344 C19.0608,6.8688 15.324,3.9112 11.368,3.9112 C7.4608,3.9112 3.7,6.896 3.7,11.3384 C3.7,15.7304 7.46,18.7408 11.368,18.7408 C12.0286168,18.7444148 12.685083,18.6362209 13.3096,18.4208 C14.0136,19.7304 14.96,20.7544 16.7552,20.7544 C19.692,20.7616 20.104,18.0384 20.0072,17.2488 Z M14.8384,15.1024 C14.1344,14.012 13.0896,13.1384 11.3424,13.1384 C10.2984,13.1384 9.532,13.4392 8.9896,13.8416 L9.4096,14.8592 C9.58305813,14.809484 9.76276344,14.7849664 9.9432,14.7864 C11.0632,14.7864 11.8056,15.7352 12.5576,17.0448 C12.1657898,17.1226671 11.7674651,17.1631157 11.368,17.1656 C8.6264,17.1656 7.44,15.176 7.44,11.3424 C7.44,7.4832 8.6296,5.4936 11.3712,5.4936 C14.1376,5.4936 15.3272,7.4832 15.3272,11.3424 C15.324,12.8952 15.1784,14.16 14.8384,15.1024 Z"></path></g></svg>
                </div>
                <div className="inner-b-logo">

                </div>
                <ul>
                    <li><Link to="/admin"><i className="fa fa-home fa-1x" aria-hidden="true"></i>Dashboard</Link></li>
                    <li><Link to="/admin/posts"><i className="fa fa-newspaper-o fa-1x" aria-hidden="true"></i>Posts</Link></li>
                    <li><Link to="/admin/media"><i className="fas fa-photo-video"></i> Media</Link></li>
                    <li><Link to="/admin/pages"><i className="fas fa-file-alt"></i>Pages</Link></li>
                    <li><Link to="/admin/comments"><i className="fa fa-comment" aria-hidden="true"></i> Comment</Link></li>
                    <li><Link to="/admin/mail"><i className="fas fa-mail-bulk    fa-1x"></i> Mail</Link> </li>
                    <li><Link to="/admin/users"><i className="fa fa-user fa-1x" aria-hidden="true"></i>User</Link></li>
                    <li><Link to="/admin/settings"><i className="fa fa-cogs fa-1x" aria-hidden="true"></i>Settings</Link></li>
                    <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                </ul>

            </div>
            <div className="main-dashboard">
                <div className="dashboard-header" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h5>Dashboard</h5>
                    <div style={{display: 'flex'}}>
                        <li className="d-gap" onClick={goHome}><Link to="/">Back to Home</Link></li>
                        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                    </div>
                </div>

                <div className="dashboard-body">
                    <Switch>
                        <Route exact path="/admin/posts" component={PostsAdmin} />
                        <Route exact path="/admin" component={MainBoard} />
                        <Route exact path="/admin/mail" component={Mail} />
                        <Route exact path="/admin/settings" component={Settings} />
                        <Route exact path="/admin/users" component={Users} />
                        <Route exact path="/admin/media" component={Media} />
                        <Route exact path="/admin/pages" component={Pages} />
                        <Route exact path="/admin/comments" component={Comments} />

                        <Route exact path="/admin/create-post" component={CreatePost} />
                        <Route exact path="/admin/edit_post/:id" component={CreatePost} />
                    </Switch>
                </div>
            </div>
            </Router>
        </div>
    )
}