import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GlobalState } from '../../GlobalState'

export default function UserMenu(props) {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user

    const logoutUser = async () => {
        await axios.post('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const { modal } = props;

    const loggedIn = () => {
        <>
            <div className="user-link">
                <img src={user.avatar} alt="profile-img" />
                <h4>{user.name}</h4>
            </div>
            <div className="user-link-menu">
                <ul>
                    <li><Link to="/">My Account</Link></li>
                    <li><Link to="/">Settings</Link></li>
                    <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                </ul>
            </div>
        </>
    }

    const notLoggedIn = () => {
        <>
            <ul className="not-logged">
                <li><Link to="/login">Sign in</Link></li>
                <li>OR</li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </>
    }

    return (
        <div className={modal ? "drop-nav modal" : "drop-nav hide"}>
            <>
                <div className="user-link">
                    <img src={user.avatar} alt="profile-img" />
                    <h4>{user.name}</h4>
                </div>
                <div className="user-link-menu">
                    <ul>
                        <li><Link to="/">My Account</Link></li>
                        <li><Link to="/">Settings</Link></li>
                        <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
                    </ul>
                </div>
            </>
        </div>
    )
}