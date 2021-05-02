import React, { useContext } from 'react'
import { GlobalState } from "../../../GlobalState"
export default function Pages() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    // const colours = [blue[800], green[500], orange[500], purple[800], red[800]]
    // const getColour = () => colours[Math.floor(Math.random() * colours.length)]

    return (
        <div className="admin-panel-pages">
            <div className="admin_post_menu">
                <ul>
                    <li><h4>Page Manager</h4></li>
                </ul>
            </div>

            <div className="white-tile page-manager-header">
                <h4>Create new categories</h4>
                <form>
                    <div>
                        <label htmlFor="category-name">Category Name:</label>
                        <input type="text" alt="" />
                    </div>
                    <div>
                        <label htmlFor="thumbnail">Image thumbnail:</label>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <input type="file" id="img-thumbnail" alt="" />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>

            <div className="white-tile page-manager-listing">
                <h4>Categories:</h4>
                {
                    categories.map(e => {
                        return (
                            <ul>
                                <li key={e._id} 
                                // style={{backgroundColor: getColour()}}
                                > 
                                {e.name} </li>
                            </ul>
                        )
                    })
                }
            </div>

        </div>
    )
}
