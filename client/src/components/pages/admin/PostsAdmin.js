import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

export default function PostsAdmin() {
    const state = useContext(GlobalState)
    const [posts] = state.postsAPI.posts
    const [callback, setCallback] = state.postsAPI.callback
    const [token] = state.token
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.postsAPI.category
    const [sort, setSort] = state.postsAPI.sort
    const [search, setSearch] = state.postsAPI.search
    const [page, setPage] = state.postsAPI.page
    const [result] = state.postsAPI.result


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    const deletePost = async (id, public_id) => {
        try {
            // const destroyImg = axios.post('/api/destroy', {public_id},{
            //     headers: {Authorization: token}
            // })
            const deletePost = axios.delete(`/api/posts/${id}`, {
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
        <div className="admin_sub_pages">
            <div className="admin_post_menu">
                <ul>
                    <li><h4>Posts</h4></li>
                    <li><button><Link to="/admin/create-post">Add New</Link></button></li>
                </ul>
            </div>

            <div className="post-counters">
                <ul>
                    <li>All
                        <span> {posts.length} </span>
                    </li>
                    <li>|</li>
                    <li>Published
                    <span>{posts.length}</span>
                    </li>
                    <li>|</li>
                    <li>Sticky
                    <span>{posts.length}</span>
                    </li>
                    <li>|</li>
                    <li>Private
                    <span>{posts.length}</span>
                    </li>
                    <li>|</li>
                    <li>CornerStone Articles
                    <span>{posts.length}</span>
                    </li>
                </ul>

                <div className="post-admin-search">
                    <input type="text" value={search} placeholder="Search posts!"
                        onChange={e => setSearch(e.target.value.toLowerCase())} />
                </div>
            </div>

            <div className="post-filters">
                <div>
                    <div>
                        <select name="category" value={category} onChange={handleCategory} >
                            <option value=''>All Posts</option>
                            {
                                categories.map(category => (
                                    <option value={"category=" + category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <input type="text" />
                    <input type="text" />
                </div>
                <div>
                    <ul>
                        <li> <button><i class="fa fa-arrow-left" aria-hidden="true"></i></button> </li>
                        <li> {page} </li>
                        <li> <button
                        > <i class="fa fa-arrow-right" aria-hidden="true"></i> </button></li>
                    </ul>
                </div>
            </div>

            <div className="admin_post_table">
                <div className="admin_post_table_body">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Comments</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map(post => {
                                    return (
                                        <tr key={post._id}>
                                            <td> {(new Date(post.createdAt)).toLocaleDateString('en-US', DATE_OPTIONS)} </td>
                                            <td> {post.title} </td>
                                            <td> {post.author} </td>
                                            <td> {post.seen} </td>
                                            <td> {post.likes} </td>
                                            <td> {post.comments.length} </td>
                                            <td>
                                                <ul className="admin-post-actions">
                                                    <li className="p-l"><Link to={`/admin/edit_post/${post._id}`}><i class="fa fa-pencil " aria-hidden="true"></i>Edit</Link> </li>
                                                    <li className="delete-post" onClick={() => deletePost(post._id)}
                                                    ><i class="fa fa-trash" aria-hidden="true"></i>Delete</li>
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
