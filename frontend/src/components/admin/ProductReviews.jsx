import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, clearError, deleteReview } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

export default function ProductReviews({history}) {
    const [productId, setProductId] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, reviews } = useSelector(state => state.productReviews)
    const { isDeleted } = useSelector(state => state.review)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted){
            alert.success('Review deleted successfully')
            dispatch({type: DELETE_REVIEW_RESET})
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getProductReviews(productId))
    }
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'Comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions:
                    <button className="px-2 py-1 ml-2 btn btn-danger" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={"Product Reviews"} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <>

                        <div className="mt-5 row justify-content-center">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="productId_field">Enter Product ID</label>
                                        <input type="text" id="productId_field" className="form-control" value={productId} onChange={(e) => setProductId(e.target.value)} />
                                    </div>
                                    <button id="search_button" type="submit" className="py-2 btn btn-primary btn-block">
                                        SEARCH
                                    </button>
                                </form>
                            </div>
                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}
                    </>
                </div>
            </div>
        </>
    )
}
