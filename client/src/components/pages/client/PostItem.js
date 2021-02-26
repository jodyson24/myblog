import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'


import picA from '../../../assets/img/pexels-engin-akyurt-2848703.jpg'

const initialState = {
    name: "",
    comment: ""
}

export default function PostItem() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [posts] = state.postsAPI.posts
    const [postDetail, setPostDetail] = useState([])
    const [comment, setComment] = useState(initialState)
    const [callback, setCallback] = state.postsAPI.callback
    //const addComment = state.postsAPI.addComment

    // const [comments, setComments] = useState([])

    useEffect(() => {
        if (params.id) {
            posts.forEach(post => {
                if (post._id === params.id)
                    setPostDetail(post)
            })
        }
    }, [params.id, posts])

    if (postDetail.length === 0) return null;

    const handleChangeInput = e => {
        const { name, value } = e.target
        setComment({ ...comment, [name]: value })
    }

    const addComment = async (e) => {
        e.preventDefault()
        try {
            //console.log(comment)
            await axios.post(`/api/posts/${postDetail._id}/comments`, comment)
            //alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err)
        }
    }

    const likePost = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`/api/posts/${postDetail._id}/like-post`)
            //alert("liked")
            setCallback(!callback)
        } catch (err) {
            alert(err)
        }
    }

    const hatePost = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`/api/posts/${postDetail._id}/hate-post`)
            //alert("hated")
            setCallback(!callback)
        } catch (err) {
            alert(err)
        }
    }

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div className="post-body" key={postDetail._id}>
            <div className="post-body-right">
                <img src={postDetail.image} alt="img" />
                <p className="category-post"> {postDetail.category.name} </p>
                <h3>{postDetail.title}</h3>
                <ul>
                    <li>By {postDetail.author} </li>
                    <li><i className="fa fa-calendar" aria-hidden="true"></i> {(new Date(postDetail.createdAt)).toLocaleDateString('en-US', DATE_OPTIONS)} </li>
                    <li><i className="fa fa-comment" aria-hidden="true"></i> {postDetail.comments.length} </li>
                </ul>
                <div className="post-sharebox">
                    Share:
                       <div>
                        <ul>
                            <li><i className="fa fa-twitter" aria-hidden="true"></i></li>
                            <li><i className="fa fa-facebook" aria-hidden="true"></i></li>
                            <li><i className="fa fa-google" aria-hidden="true"></i></li>
                            <li><i className="fa fa-linkedin" aria-hidden="true"></i></li>
                            <li><i className="fa fa-instagram" aria-hidden="true"></i></li>
                            <li><i className="fa fa-wifi" aria-hidden="true"></i></li>
                        </ul>
                    </div>
                </div>

                <div className="blog-post-body"
                dangerouslySetInnerHTML={{ __html: postDetail.blogPost }}
                ></div>

                <hr />

                <div className="blog-post-actions">
                    <h5>Share your feeling regarding this article or add your comments below</h5>
                    <div className="blog-post-actions-btn">
                        <button onClick={likePost} className="like-btn">Like
                        <span> ({postDetail.likes}) </span>
                        </button>
                        <button onClick={hatePost} className="hate-btn">Hate
                        <span> ({postDetail.hates}) </span>
                        </button>
                    </div>
                </div>

                <hr />

                <div className="post-author-details">
                    <div className="p-a-d-info">
                        <img src={picA} alt="" />
                        <div>
                            <h5>Author</h5>
                            <h5>John Bunyan</h5>
                            <div>
                                <li><i className="fa fa-facebook" aria-hidden="true"></i></li>
                                <li><i className="fa fa-twitter" aria-hidden="true"></i></li>
                                <li><i className="fa fa-google" aria-hidden="true"></i></li>
                                <li><i className="fa fa-linkedin" aria-hidden="true"></i></li>
                                <li><i className="fa fa-instagram" aria-hidden="true"></i></li>
                                <li><i className="fa fa-wifi" aria-hidden="true"></i></li>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Fusce vel volutpat nisl,
                        nec lacinia purus. Sed fringilla sapien id eros laoreet,
                        pellentesque laoreet orci fringilla. Phasellus nec neque posuere, facilisis urna
                        ac, tempus sapien. Fusce vel volutpat nisl, nec lacinia purus. Sed fringilla sapien id eros laoreet,
                        pellentesque laoreet orci fringilla. Phasellus nec neque posuere, facilisis urna
                        ac, tempus sapien.</p>
                    </div>
                </div>

                <div className="related-posts">
                    <div className="r-l-box">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        <div className="r-l-box-img">
                            <img src={picA} alt="img" />
                        </div>
                        <div className="r-l-box-title">
                            <h5>Extreme</h5>
                            <h5>
                                Fusce vel volutpat nisl, nec lacinia purus
                        </h5>
                        </div>
                    </div>
                    <div className="r-l-box">
                        <div className="r-l-box-img">
                            <img src={picA} alt="img" />
                        </div>
                        <div className="r-l-box-title">
                            <h5>Extreme</h5>
                            <h5>
                                Fusce vel volutpat nisl, nec lacinia purus
                        </h5>
                        </div>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>

                <div className="comments-section">
                    <div className="comments-section-header">
                        <h5>Comments</h5>
                    </div>
                    <div className="other-comments">
                        {
                            postDetail.comments.map(e => {
                                //console.log(e.name + e.comment)
                                return (
                                    <div  className="c-com-box" key={e._id}>
                                        <div className="comment-img-box">

                                        </div>
                                        <div className="comment-box-oth">
                                            <h5> {e.name} </h5>
                                            <p> {e.comment} </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button>Reply</button>
                    </div>
                    <div className="add-comment">
                        <h5>Leave a comment</h5>
                        <form onSubmit={addComment} >
                            <div>
                                <input type="text" placeholder="Enter your name" name="name"
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div>
                                <input type="text" placeholder="Enter your comment" name="comment"
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div>
                                <button type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}