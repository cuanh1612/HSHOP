import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Disclosure } from '@headlessui/react'

import MetaData from './layouts/MetaData'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layouts/loader'

import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
// import slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import ReactStars from "react-rating-stars-component"

import NotFoundProduct from './Other/NotFoundProduct'

const ConfigStar = {
    size: 15,
    count: 5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    edit: false,
};

// const { createSliderWithTooltip } = slider
// const Range = createSliderWithTooltip(slider.Range)

export default function Home({ match }) {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Electronics',
        'Cameras',
        'Laptop',
        'Accessories',
        'Headphones',
        'Food',
        'books',
        'clother/shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const prices = [
        {
            content: "$0 to $100",
            price: [0, 100]
        },
        {
            content: "$100 to $200",
            price: [100, 200]
        },
        {
            content: "$300 to $300",
            price: [200, 300]
        },
        {
            content: "$400 to $400",
            price: [300, 400]
        },
        {
            content: "$400 to $500",
            price: [400, 500]
        }
    ]

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const keyword = match.params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating))
    }, [dispatch, alert, error, currentPage, keyword, price, category, rating])

    let count = productsCount
    if (keyword) {
        count = filteredProductsCount
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Buy Best Products Online" />
                    <div className="w-full bg-white">
                        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="flex flex-col sm:flex-row">
                                {keyword && (
                                    products && (
                                        <div className="w-full mb-2 mr-2 space-y-2 rounded-lg sm:w-60 sm:min-w-60">
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                            <span>Filter product prices</span>
                                                            <i
                                                                className={`${open ? 'fas fa-sort-up mt-1' : 'fas fa-sort-down mb-1'} `}
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm text-gray-500">
                                                            {
                                                                prices.map(priceList => (
                                                                    <div
                                                                        className="w-full h-6 mt-2 text-xs cursor-pointer hover:text-blue-500 hover:text-sm"
                                                                        key={category}
                                                                        onClick={() => setPrice(priceList.price)}
                                                                    >
                                                                        {priceList.content}
                                                                    </div>
                                                                ))
                                                            }
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>

                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                            <span>Filter product categories</span>
                                                            <i
                                                                className={`${open ? 'fas fa-sort-up mt-1' : 'fas fa-sort-down mb-1'} `}
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm text-gray-500">
                                                            {
                                                                categories.map(category => (
                                                                    <div
                                                                        className="w-full h-6 mt-2 text-xs cursor-pointer hover:text-blue-500 hover:text-sm"
                                                                        key={category}
                                                                        onClick={() => setCategory(category)}
                                                                    >
                                                                        {category}
                                                                    </div>
                                                                ))
                                                            }
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>

                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                            <span>Filter product rates</span>
                                                            <i
                                                                className={`${open ? 'fas fa-sort-up mt-1' : 'fas fa-sort-down mb-1'} `}
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="px-4 pt-1 pb-2 text-sm text-gray-500">
                                                            {
                                                                [5, 4, 3, 2, 1, 0].map(star => (
                                                                    <div
                                                                        className="mt-2 cursor-pointer"
                                                                        key={star}
                                                                        onClick={() => setRating(star)}
                                                                    >
                                                                        <ReactStars  {...ConfigStar} value={star} />
                                                                    </div>

                                                                ))
                                                            }
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                    )

                                )}

                                {
                                    products && products.length === 0 ? <NotFoundProduct/> : (
                                        <div className={keyword
                                            ? "grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-3 xl:px-8"
                                            : "grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:px-8"}>
                                            {
                                                products &&  products.map(product => (
                                                    <Product key={product._id} product={product} />
                                                ))
                                            }
                                        </div>
                                    )
                                }


                            </div>
                            {resPerPage <= count && (
                                <div className='mt-5 d-flex justify-content-center'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={'Next'}
                                        prevPageText={'Prev'}
                                        firstPageText={'First'}
                                        lastPageText={'Last'}
                                        itemClass="text-gray-900 inline-block"
                                        linkClass="inline-block w-9 h-9 flex items-center justify-center hover:no-underline hover:text-lg duration-100"
                                        activeLinkClass="text-white bg-blue-400 rounded-full "
                                        itemClassFirst="inline-block w-14 h-9 flex items-center justify-center border"
                                        itemClassPrev="inline-block w-14 h-9 flex items-center justify-center border mr-2"
                                        itemClassNext="inline-block w-14 h-9 flex items-center justify-center border ml-2"
                                        itemClassLast="inline-block w-14 h-9 flex items-center justify-center border"
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </>
            )}
        </>
    )
}
