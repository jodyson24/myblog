import React, {useContext} from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'

export default function Comments() {
    const state = useContext(GlobalState)
    const [comments] = state.commentsAPI.comments
    const [callback, setCallback] = state.commentsAPI.callback
    const [token] = state.token

    const deleteComment = async (id, public_id) => {
        try {
            // const destroyImg = axios.post('/api/destroy', {public_id},{
            //     headers: {Authorization: token}
            // })
            const deletePost = axios.delete(`/api/comments/${id}`, {
                headers: { Authorization: token }
            })

            // await destroyImg
            await deletePost
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div className="admin-panel-pages">
            <div className="admin_post_menu">
                <ul>
                    <li><h4>Comments</h4></li>
                </ul>
            </div>

            <div className="admin_post_table">
                <div className="admin_post_table_body">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                comments.map(e => {
                                    return (
                                        <tr key={e._id}>
                                            <td> {(new Date(e.createdAt)).toLocaleDateString('en-US', DATE_OPTIONS)} </td>
                                            <td> {e.name} </td>
                                            <td> {e.comment} </td>
                                            <td>
                                                <ul className="admin-post-actions">
                                                    <li className="delete-post" onClick={() => deleteComment(e._id)}
                                                    ><i className="fa fa-trash" aria-hidden="true"></i>Delete</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}
