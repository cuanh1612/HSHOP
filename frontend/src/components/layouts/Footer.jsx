import React, { Fragment } from 'react';

const Footer = () => {
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
        'Outdoor'
    ]

    return (
        <>
            <footer className="grid grid-cols-1 mt-5 bg-gray-900 px-7 py-14 lg:grid-cols-4">
                <div className="grid grid-cols-2 col-span-1 py-3 lg:grid-cols-3 lg:col-span-3 xl:grid-cols-4 gap-7">
                    <div>
                        <h1 className="text-xl font-bold text-white">
                            HSHOP
                        </h1>
                        <p className="mb-2">
                            HSHOP is one of the leading luxury brands in the world today with high-end and trendy products. Over 100 years of development.
                        </p>
                    </div>
                    <div>
                        <h1 className="font-semibold text-white">Category</h1>
                        <ul>
                            {categories.map(category => {
                                return <li className="my-2">{category}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold text-white">Category</h1>
                        <ul>
                            {categories.map(category => {
                                return <li className="my-2">{category}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold text-white">Category</h1>
                        <ul>
                            {categories.map(category => {
                                return <li className="my-2">{category}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-span-1 py-3">
                    <h1 className="font-semibold text-white">Subscribe for updates</h1>
                    <div className="flex mt-2 space-x-2">
                        <input type="text" placeholder="Email" className="w-full px-4 py-2 rounded-lg focus:outline-none md:w-96 lg:w-full" />
                        <button className="h-10 px-3 ml-2 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700">Subscribe</button>
                    </div>
                </div>
                <hr className="col-span-1 bg-gray-800 lg:col-span-4" />
                <div className="justify-between col-span-1 py-6 space-y-2 lg:col-span-4 sm:block lg:flex">
                    <p>
                        © Copyright 2020 Lorem Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6 list-none">
                        <li><i class="flex items-center justify-center rounded-full cursor-pointer fab fa-google mt-2 hover:text-white"></i></li>
                        <li><i class="flex items-center justify-center rounded-full cursor-pointer fab fa-facebook-f mt-2 hover:text-white"></i></li>
                        <li><i class="flex items-center justify-center rounded-full cursor-pointer fab fa-github-square mt-2 hover:text-white"></i></li>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
