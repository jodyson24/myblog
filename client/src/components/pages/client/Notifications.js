import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

export default function Notifications() {
    const state = useContext(GlobalState)
    const [notifications] = state.notificationsAPI.notifications
    console.log(notifications)

    const markAsRead = async () => {
        await axios.put('/api/mark-as-read')
    }

    const deleteNotification = async () => {
        await axios.delete('/api/delete-notification')
    }

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div className="page">
            <div className="notify-page-width">
                <div className="side-bar notify-s-d-bar">
                    <h4>Filters</h4>
                    <div>
                        <ul>
                            <li>All Notifications <span className="notify-count-stat"> {notifications.length} </span> </li>
                            <li>Stories</li>
                            <li>Questions</li>
                            <li>Spaces</li>
                            <li>Subscription</li>
                            <li>Comments</li>
                            <li>Likes</li>
                            <li>Your Content</li>
                            <li>Your Profile</li>
                            <li>Annoucements</li>
                        </ul>
                    </div>
                </div>
                <div className="center">
                    <div className="notify-menu">
                        <ul>
                            <li>Notifications <span className="notify-count-stat"> {notifications.length} </span></li>
                        </ul>
                        <ul>
                            <li>Mark All As Read</li>
                            <li>.</li>
                            <li>Settings</li>
                        </ul>
                    </div>
                    <>
                        {
                            notifications.reverse().map(e => {
                                const { title, message, createdAt } = e
                                return (
                                    <div className="notification-item">
                                        <div className="notify-img">
                                            <img src="" alt="img" />
                                        </div>
                                        <div className="notfiy-details">
                                            <h4> {title} </h4>
                                            <div>                                        
                                            <p> {message} </p>
                                            <p> {(new Date(createdAt)).toLocaleDateString('en-US', DATE_OPTIONS)} </p>
                                            </div>
                                        </div>
                                        <div className="notify-actions">
                                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                            {/* <button className="notify-btn">Mark as Read</button>
                                            <button className="notify-btn">Delete</button> */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                </div>
            </div>
        </div>
    )
}
