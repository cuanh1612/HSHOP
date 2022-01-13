import React, {useEffect as UseEffect, useState as UseState } from 'react'
import { useHistory as UseHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { register, clearError } from '../../actions/userActions'

//import form
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../ElementForm/Input'



const Register = () => {
    //config form
    const Schema = yup.object().shape({
        name: yup.string().required().min(6),
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
        avatar: yup.mixed().test("type", "Please add avatar image", (value) => {
            return value && ["image/jpeg", "image/bmp", "image/png", 'application/jpg'].includes(value[0].type)
        })
    })

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            avatar: ""
        },
        resolver: yupResolver(Schema)
    })

    const { handleSubmit } = form

    const handleSubmitForm = (values) => {
        const formData = new FormData()
        formData.set('name', values.name)
        formData.set('email', values.email)
        formData.set('password', values.password)
        formData.set('avatar', avatar)

        dispatch(register(formData))
    }
    //config form

    const [avatar, setAvatar] = UseState('')
    const [avatarPreview, setAvatarPreview] = UseState("https://cdn.universalnews.org/wp-content/uploads/2020/05/Facebook-Avatar.jpg")


    const alert = UseAlert()
    const dispatch = UseDispatch()
    const history = UseHistory()

    const { isAuthenticated, error, loading } = UseSelector(state => state.auth)

    UseEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, isAuthenticated, error, history])


    const changeAvatar = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <>
            <MetaData title={'Register User'} />
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
                            <h1 className="text-3xl font-extrabold py-7">Register your account</h1>
                            <div className="w-full">
                                <label for="name" className="text-xs">Name</label>
                                <Input form={form} type={"text"} placeholder={"Your Name"} name={"name"} />
                            </div>
                            <div className="w-full mt-2">
                                <label for="email" className="text-xs">Email Address</label>
                                <Input form={form} type={"email"} placeholder={"Your Email"} name={"email"} />
                            </div>
                            <div className="w-full mt-2">
                                <label for="password" className="text-xs">Password</label>
                                <Input form={form} type={"password"} placeholder={"Your Password"} name={"password"} />
                            </div>
                            <div className="w-full mt-2">
                                <label className="text-xs">Choose Avatar</label>
                                <div className="relative">
                                    <div className="relative w-14 h-14">
                                        <img src={avatarPreview} alt="avatar" className="object-cover w-full h-full mt-2 border-2 border-blue-400 rounded-full" />
                                    </div>
                                    <label htmlFor="avatar" className="absolute top-0 left-0 h-full text-xs rounded-full cursor-pointer w-14"></label>
                                    <Input form={form} type={"file"} name={"avatar"} onchange={changeAvatar} hidden accept={'image/*'}/>
                                </div>
                            </div>
                            <button type="submit" disabled={loading ? true : false} className={
                                loading
                                    ? "w-full py-2 mt-6 text-lg font-semibold text-white bg-gray-700 rounded-lg"
                                    : "w-full py-2 mt-6 text-lg font-semibold text-white bg-gray-900 rounded-lg"
                            }>Register</button>
                            <div className="flex justify-center mt-8">
                                <span className="text-base">You already have an account?
                                    <Link style={{textDecoration: "none"}} to="/login">
                                        <span className="text-blue-500 cursor-pointer"> Sign In</span>
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
