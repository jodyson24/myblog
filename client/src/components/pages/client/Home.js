import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

import picA from '../../../assets/img/pexels-george-desipris-752882.jpg'

export default function Home() {
    const state = useContext(GlobalState)
    // console.log(state.postsAPI.posts)
    const [posts] = state.postsAPI.posts

    const seenCounter = async (_id) => {
        //console.log("clicked")
        try {
            let id = _id
            let post = posts.find(post =>
                post._id === id
            )
            await axios.put(`/api/posts/${post._id}/seen-counter`)
        } catch (err) {
            console.log(err)
        }
        // alert(res.data.msg)
    }

    return (
        <div className="page home_page">
            <div className="side-bar">
                <div className="channels-following">
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                    <div className="channel">
                        <img src={picA} alt="pic" />
                        <p>Nigerians</p>
                    </div>
                </div>
                <div className="footer">
                    <ul>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Terms</li>
                        <li>Privacy</li>
                        <li>Acceptable Use</li>
                        <li>Businesses</li>
                        <li>Your Ad Choices</li>
                    </ul>
                </div>
            </div>
            <div className="center">
                {
                    posts.map(post => {
                        return (
                            <div className="post_box" key={post._id}>
                                <div className="post_box_header">
                                    <h3>{post.title}</h3>
                                </div>
                                <div className="post_box_img">
                                    <img src={post.image} alt="img" />
                                </div>
                                <div className="post_box_options">
                                    <p> {post.author}</p>
                                    <ul>
                                        <li>Seen: 0</li>
                                        <li>Share</li>
                                        <li>Comments: {post.comments.length} </li>
                                    </ul>
                                </div>
                                <div className="post_box_sup_text">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo facilisis nulla vitae ornare. Integer sit amet tortor dui. Aliquam nec tempor ipsum.
                                    </p>
                                    <li onClick={e => seenCounter(post._id)}>
                                        <Link to={`/post/${post._id}`}>Read more</Link>
                                    </li>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="side-bar side-two">
                <div className="option_box">
                    <div className="option_box_header">
                        <h5>Improve Your Feed</h5>
                    </div>
                    <ul>
                        <li>
                            <input type="option" /> Select
                        </li>
                    </ul>
                </div>

                <div className="option_box">
                    <div className="option_box_header">
                        <h5>Spaces to follow</h5>
                    </div>
                    <div>
                        <ul>
                            <li>loremlorem</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
