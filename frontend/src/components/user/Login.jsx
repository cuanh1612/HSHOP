import React, {useEffect as UseEffect } from 'react'
import { Link, useHistory as UseHistory } from 'react-router-dom'

import loader from '../layouts/loader'
import MetaData from '../layouts/MetaData'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { clearError, login } from '../../actions/userActions'

//import form
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import Input from '../../ElementForm/Input'

export default function Login({ location }) {
    //config form
    const Schema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required()
    })

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(Schema)
    })

    const { handleSubmit } = form

    const handleSubmitForm = (values) => {
        console.log(values)
        dispatch(login(values.email, values.password))
    }
    //config form

    const alert = UseAlert()
    const dispatch = UseDispatch()
    const history = UseHistory()

    const { isAuthenticated, error, loading } = UseSelector(state => state.auth)

    const redirect = location.search ? location.search.split('=')[1] : '/'
    UseEffect(() => {
        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, isAuthenticated, error, history])

    return (
        <>
            {loading ? <loader /> : (
                <>
                    <MetaData title={'Login'} />
                    <div className="relative flex justify-center w-full py-5">
                        <div className="relative grid w-3/4 grid-cols-3 overflow-hidden border rounded-lg">
                            <div className="relative hidden h-full lg:block lg:col-span-1 xl:col-span-2">
                                <img src="https://images.hdqwalls.com/wallpapers/spider-man-2020-all-0n.jpg" alt="HSHOP" className="object-cover w-full h-full" />
                            </div>
                            <div className="relative col-span-3 px-6 py-20 lg:col-span-2 xl:col-span-1">
                                <form onSubmit={handleSubmit(handleSubmitForm)}>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                                        <h2 className="text-sm font-extrabold">HSHOP</h2>
                                    </div>
                                    <h1 className="text-3xl font-extrabold py-7">Log in to your account</h1>
                                    <div className="w-full">
                                        <label for="email" className="text-xs">Email Address</label>
                                        <Input form={form} type={"text"} placeholder={"Your Email"} name={"email"} />
                                    </div>
                                    <div className="w-full mt-2">
                                        <label for="password" className="text-xs">Password</label>
                                        <Input form={form} type={"password"} placeholder={"Your Password"} name={"password"} />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <Link style={{textDecoration: "none"}} to='/password/forgot'>
                                            <span className="text-sm cursor-pointer">
                                                Forgot Password?
                                            </span>
                                        </Link>
                                    </div>
                                    <button type="submit" className="w-full py-2 mt-6 text-lg font-semibold text-white bg-gray-900 rounded-lg">Log In</button>
                                    <div className="flex justify-center mt-8">
                                        <span className="text-base">Need an account?
                                            <Link style={{textDecoration: "none"}} to='/register' >
                                                <span className="text-blue-500 cursor-pointer">Sign Up</span>
                                            </Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

