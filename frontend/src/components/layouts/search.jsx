import React, { useState as UseState } from 'react'
import { useHistory as UseHistory } from 'react-router-dom'

export default function search() {
    const history = UseHistory()

    const [keyword, setKeyword] = UseState('')
    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <form className="relative w-full" onSubmit={searchHandler}>
            <div className="relative flex w-full">
                <input
                    type="text" id="search_field"
                    className="w-full h-full border rounded-l-lg "
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="w-10 text-white bg-blue-400 rounded-r-lg focus:outline-none">
                    <i className="fa fa-search" aria-hidden="true" />
                </button>
            </div>
        </form>

        // <form onSubmit={searchHandler}>
        //     <div className="input-group">
        //         <input 
        //             type="text" 
        //             id="search_field" 
        //             className="form-control" 
        //             placeholder="Enter Product Name ..." 
        //             onChange = {(e) => setKeyword(e.target.value)}
        //         />
        //         <div className="input-group-append">
        //             <button id="search_btn" className="btn">
        //                 <i className="fa fa-search" aria-hidden="true" />
        //             </button>
        //         </div>
        //     </div>
        // </form>
    )
}
