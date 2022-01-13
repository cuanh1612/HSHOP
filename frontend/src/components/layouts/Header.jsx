import React, { Fragment } from 'react'
import '../../App.css'
import Search from './search'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions.js'

import { Menu, Transition } from '@headlessui/react'

export default function Header() {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)

    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Loggged out successfully.')
    }
    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between h-20 px-4 bg-white shadow dark:bg-gray-800">
                <Link style={{ textDecoration: 'none' }} to='/' className="flex items-center h-full text-2xl font-bold">
                    HSHOP
                </Link>

                <div className="relative items-center hidden h-full md:flex w-96">
                    <Search />
                </div>


                <div className="flex items-center space-x-6">
                    <Link to='/cart' className="flex justify-center">
                        <a className="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                            href="#!">
                            <svg className="w-6 h-6 mt-1 ml-2" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            {
                                cartItems && (
                                    cartItems.length > 0 && (
                                        <div
                                            className="absolute top-0 left-0 w-4 h-4 text-center text-white align-middle bg-blue-400 rounded-full">
                                            <span className="block leading-4 text-center text-10px">{cartItems.length > 99 ? 99 : cartItems.length}</span>
                                        </div>
                                    )
                                )
                            }
                        </a>
                    </Link>

                    {user
                        ? (
                            <Menu as="div" className="hidden w-10 h-10 md:block">
                                {({ open }) => (
                                    <>
                                        <Menu.Button className="focus:outline-none">
                                            <img src={user.avatar && user.avatar.url} alt={user && user.name} className="object-cover w-10 h-10 border-2 border-blue-400 rounded-full" />
                                        </Menu.Button>
                                        <Transition show={open}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Menu.Items>
                                                <div className="absolute top-0 right-0 py-3 mt-20 bg-white shadow dark:bg-grabg-yellow-800">
                                                    {user && user.role === 'admin' && (
                                                        <Link style={{ textDecoration: "none" }} to='/dashboard'>
                                                            <p className="px-5 cursor-pointer hover:bg-blue-400 hover:text-white">Dashboard</p>
                                                        </Link>
                                                    )}

                                                    <Link to='/orders/me' style={{ textDecoration: 'none' }} >
                                                        <p className="px-5 cursor-pointer hover:bg-blue-400 hover:text-white">Order</p>
                                                    </Link>
                                                    <Link to='/me' style={{ textDecoration: 'none' }} >
                                                        <p className="px-5 cursor-pointer hover:bg-blue-400 hover:text-white">Profile</p>
                                                    </Link>
                                                    <Link to='/' style={{ textDecoration: 'none' }} onClick={logoutHandler} >
                                                        <p className="px-5 cursor-pointer hover:bg-blue-400 hover:text-white">Logout</p>
                                                    </Link>
                                                </div>
                                            </Menu.Items>
                                        </Transition>

                                    </>
                                )}
                            </Menu>
                        )
                        : (
                            <Link to="/login" style={{ textDecoration: 'none' }} className="hidden px-3 py-2 text-white bg-blue-400 rounded-lg outline-none md:block hover:bg-blue-500">
                                LogIn
                            </Link>
                        )
                    }




                    {/* Menu mobile */}
                    <Menu as="div" className="md:hidden">
                        {({ open }) => (
                            <>
                                <Menu.Button className="focus:outline-none">
                                    <i className="cursor-pointer fas fa-bars"></i>
                                </Menu.Button>
                                <Transition show={open}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Menu.Items className="md:hidden">
                                        <div className="absolute right-0 w-full px-5 py-3 bg-white shadow top-20 dark:bg-gray-800">

                                            <div className="w-full">
                                                {user && user.role === 'admin' && (
                                                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                                                        <p className="w-full mt-2 cursor-pointer hover:bg-blue-400 hover:text-white">Dashboard</p>
                                                    </Link>

                                                )}
                                                <Link to='/orders/me' style={{ textDecoration: 'none' }}>
                                                    <p className="w-full mt-2 cursor-pointer hover:bg-blue-400 hover:text-white">Orders</p>
                                                </Link>
                                                <Link to='/me' style={{ textDecoration: 'none' }}>
                                                    <p className="w-full mt-2 cursor-pointer hover:bg-blue-400 hover:text-white">Profile</p>
                                                </Link>
                                            </div>

                                            {user && (
                                                <div className="flex items-center w-full mt-2">
                                                    <img src={user.avatar && user.avatar.url} alt={user.name} className="object-cover w-10 h-10 rounded-full" />
                                                    <p className="ml-2 font-semibold">{user.name}</p>
                                                </div>
                                            )}


                                            <div className="relative flex flex-col justify-center w-full mt-2 space-y-2">
                                                <Search />

                                                {user
                                                    ? (
                                                        <Link to='/' onClick={logoutHandler} style={{ textDecoration: 'none' }} >
                                                            <button className="w-full px-3 py-2 font-semibold text-white bg-blue-400 rounded-lg outline-none hover:bg-blue-500 focus:outline-none">
                                                                Log Out
                                                            </button>
                                                        </Link>
                                                    )
                                                    : (
                                                        <Link to='/login' style={{ textDecoration: 'none' }}>
                                                            <button className="w-full px-3 py-2 font-semibold text-white bg-blue-400 rounded-lg outline-none hover:bg-blue-500 focus:outline-none">
                                                                Log Int
                                                            </button>
                                                        </Link>
                                                    )}
                                            </div>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}

                    </Menu>
                </div>
            </nav>
        </>
    )
}
