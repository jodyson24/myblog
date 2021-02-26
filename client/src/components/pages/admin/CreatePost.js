import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


import { GlobalState } from '../../../GlobalState'
import { useHistory, useParams } from 'react-router-dom'


const initialState = {
    title: "",
    author: '',
    blogPost: "",
    category: ""
}
export default function CreatePost() {
    const state = useContext(GlobalState)
    const [post, setPost] = useState(initialState)
    const [image, setImage] = useState(false)
    const [categories] = state.categoriesAPI.categories

    const [token] = state.token

    const [posts] = state.postsAPI.posts

    const history = useHistory()
    const param = useParams()
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.postsAPI.callback

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            posts.forEach(post => {
                if (post._id === param.id) {
                    setPost(post)
                    setImage(post.image)
                }
            })
        } else {
            setOnEdit(false)
            setPost(initialState)
            setImage(false)
        }
    }, [param.id, posts])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
    }

    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            let formData = new FormData()
            formData.append('file', file)

            console.log(file)

            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })
            console.log(res.data)
            setImage(res.data.img)
            console.log(image)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            await axios.post('/api/destroy', { public_id: image.public_id }, {
                headers: { Authorization: token }
            })
            setImage(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`/api/posts/${post._id}`, { ...post, image }, {
                    headers: { Authorization: token }
                })
                console.log(post)
                alert("successful")
            } else {
                await axios.post('/api/posts', { ...post, image }, {
                    headers: { Authorization: token }
                })
                console.log(post)
                alert("successful")
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: image ? "block" : "none"
    }

    return (
        <div className="admin_sub_pages">
            <div className="create_post">
                <div className="create_post_header">
                    <ul>
                        <li><h4>{onEdit ? "Edit Post" : "New Post"}</h4></li>
                    </ul>
                </div>
                <div className="create-post-form">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
                        <div className="top-post-form">
                            <div className="post-write-up">
                                <div>
                                    <input type="text" placeholder="Article title" name="title"
                                        onChange={handleChangeInput} value={post.title}
                                    />
                                </div>

                                <div>
                                    <div className="preview_nav">
                                        <ul>
                                            <li><Link to="!#">Markdown Input</Link></li>
                                            <li><Link to="!#">Preview</Link></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <textarea placeholder="Blog Post" name="blogPost"
                                            onChange={handleChangeInput} value={post.blogPost}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="media-post">
                                <div>
                                    <label htmlFor="categories">Categories:</label>
                                    <select name="category" value={post.category} onChange={handleChangeInput}>
                                        <option value="">Please select a category</option>
                                        {
                                            categories.map(category => (
                                                <option value={category._id} key={category._id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <input type="text" placeholder="Article Author" name="author"
                                        onChange={handleChangeInput} value={post.author}
                                    />
                                </div>
                                <div className="media-post-header">
                                    <h5>Add media</h5>
                                    <input type="file" id="file_up" name="file"
                                        onChange={handleUpload} multiple
                                    />
                                    <div id="file_img" style={styleUpload}>
                                        <img src={image} alt="" />
                                        <span onClick={handleDestroy}>X</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button type="submit">{onEdit ? "Update Post" : "Publish Post"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
