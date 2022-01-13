import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

export default function Product({ product, col }) {
    const firstExample = {
        size: 15,
        count: 5,
        value: product.ratings,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        edit: false,
    };

    return (
        <div class="relative">
            <Link to={`/product/${product._id}`}>
                <div className="relative w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer hover:opacity-75 h-80 min-h-80 group">
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="object-cover w-full h-full duration-300 transform scale-100 group-hover:scale-110"
                    />
                </div>
            </Link>
            <div className="flex justify-between w-full mt-2">
                <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                    <p className="text-base font-medium text-gray-900 cursor-pointer">{product.name}</p>
                </Link>
                <p className="text-sm font-medium text-red-500">${product.price}</p>
            </div>
            <p className="mt-2 text-sm text-gray-500">{product.category}</p>
            <div className="mt-2">
                <ReactStars {...firstExample} />
            </div>
        </div>
    )
}
