import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'

import bgProfile from '../../asset/bgProfile.jpg'

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={"Your Profile"} />
                    <div className="mx-auto my-5 bg-white shadow-lg rounded-2xl dark:bg-gray-800 w-96 ">
                        <img alt="profil" src={bgProfile} className="object-cover object-center w-full mb-4 rounded-t-lg h-28" />
                        <div className="flex flex-col items-center justify-center p-2 -mt-16">
                            <a href="#!" className="relative block">
                                <img src={user.avatar.url} alt={user.name} className="object-cover w-16 h-16 mx-auto border-2 border-white rounded-full dark:border-gray-800" />
                            </a>
                            <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
                                {user.name}
                            </p>
                            <p className="mb-4 text-base text-gray-400">
                                {user.email}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-5 pt-0 pb-4 pl-4 pr-4">
                            <Link to="/me/update" style={{textDecoration: "none"}}>
                                <div className="flex items-center w-2/3 px-3 py-2 mx-auto space-x-3 font-medium text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">
                                    <i class="far fa-edit"></i>
                                    <div className="w-full text-center">
                                        Edit Profile
                                    </div>
                                </div>
                            </Link>

                            <Link to="/orders/me" style={{textDecoration: "none"}}>
                                <div className="flex items-center w-2/3 px-3 py-2 mx-auto space-x-3 font-medium text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">
                                    <i class="fas fa-box"></i>
                                    <div className="w-full text-center">
                                        My Orders
                                    </div>
                                </div>
                            </Link>

                            <Link to="/password/update" style={{textDecoration: "none"}}>
                                <div className="flex items-center w-2/3 px-3 py-2 mx-auto space-x-3 font-medium text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">
                                    <i class="fas fa-lock"></i>
                                    <div className="w-full text-center">
                                        Change Password
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile
