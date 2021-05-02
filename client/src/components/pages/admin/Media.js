import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

export default function Media() {
    const state = useContext(GlobalState)
    const [posts] = state.postsAPI.posts

    return (
        <div className="admin-panel-pages">
            <div className="admin_post_menu">
                <ul>
                    <li><h4>Media Gallery</h4></li>
                </ul>
            </div>

            <div>
                <div className="img-board-upload img-panel-tile">
                    <h4>Upload an Image</h4>
                    <div>
                        <img src="" alt="" />
                        <input type="file" name="" />
                    </div>
                </div>
                <div className="blog-posts-img img-panel-tile">
                    <h4>Posts Images</h4>
                    <div className="media-grid">
                        {
                            posts.map(e => {
                                return (
                                    <div className="media-item" key={e._id}>
                                        <img src={e.image} alt="post-img" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="other-img img-panel-tile">
                    <h4>Others</h4>
                    <div>

                    </div>
                </div>
            </div>


        </div>
    )
}
