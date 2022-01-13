import React from 'react'
import './index.css'
import { Disclosure } from '@headlessui/react'



export default function Register() {
    const product =
    {
        imageSrc: "https://images.hdqwalls.com/wallpapers/spider-man-2020-all-0n.jpg",
        imageAlt: "huy",
        name: 'huy',
        color: 'blue',
        price: "huy"
    }

    return (
        <div className="w-full bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col sm:flex-row">
                    
                    <div className="w-full mb-2 mr-2 rounded-lg sm:w-60 sm:min-w-60">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>What is your refund policy?</span>
                                        <i
                                            className={`${open ? 'fas fa-sort-up mt-1' : 'fas fa-sort-down mb-1'} `}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                        If you're unhappy with your purchase for any reason, email us
                                        within 90 days and we'll refund you in full, no questions asked.
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>


                    {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:px-8"> */}
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-3 xl:px-8">
                        <div class="relative">
                            <div className="relative w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer hover:opacity-75 h-80 min-h-80 group">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover w-full h-full duration-300 transform scale-100 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-between w-full mt-2">
                                <p className="text-base font-medium text-gray-900 cursor-pointer">Basic Tee</p>
                                <p className="text-sm font-medium text-red-500">$35</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Laptop</p>
                        </div>

                        <div class="relative">
                            <div className="relative w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer hover:opacity-75 h-80 min-h-80 group">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover w-full h-full duration-300 transform scale-100 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-between w-full mt-2">
                                <p className="text-base font-medium text-gray-900 cursor-pointer">Basic Tee</p>
                                <p className="text-sm font-medium text-red-500">$35</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Laptop</p>
                        </div>

                        <div class="relative">
                            <div className="relative w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer hover:opacity-75 h-80 min-h-80 group">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover w-full h-full duration-300 transform scale-100 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-between w-full mt-2">
                                <p className="text-base font-medium text-gray-900 cursor-pointer">Basic Tee</p>
                                <p className="text-sm font-medium text-red-500">$35</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Laptop</p>
                        </div>

                        <div class="relative">
                            <div className="relative w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer hover:opacity-75 h-80 min-h-80 group">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="object-cover w-full h-full duration-300 transform scale-100 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex justify-between w-full mt-2">
                                <p className="text-base font-medium text-gray-900 cursor-pointer">Basic Tee</p>
                                <p className="text-sm font-medium text-red-500">$35</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Laptop</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}