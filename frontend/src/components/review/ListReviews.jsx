import React from 'react'
import ReactStars from "react-rating-stars-component"

const ListReviews = ({ reviews }) => {
    const configRating = {
        size: 24,
        count: 5,
        a11y: true,
        isHalf: true,
        edit: false
    };

    return (
        <div className='px-5 mx-auto mt-10 max-w-1000'>
            <p className='mb-2 text-xl font-semibold text-indigo-500'>Other's Reviews</p>
            <div className='ml-3 divide-y divide-gray-200'>

                {
                    reviews && reviews.map(review => (
                        <>
                            <div className='py-6 space-y-3'>
                                <ReactStars {...configRating} value={review.rating} />
                                <div className='space-y-2'>
                                    <p className='text-xl font-semibold'>{review.comment}</p>
                                    <p className='text-gray-400'>{review.name}</p>
                                </div>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>


    )
}

export default ListReviews
