import React, { useRef, useEffect as UseEffect, useState as UseState } from 'react'
import { useHistory as UseHistory } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { updateUser, loadUser, clearError } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants.js'

//import form
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../ElementForm/Input'


const UpdateProfile = () => {
    const alert = UseAlert()
    const dispatch = UseDispatch()
    const history = UseHistory()

    const { user, loading } = UseSelector(state => state.auth)
    const { error, isUpdated } = UseSelector(state => state.user)


    //config form
    const Schema = yup.object().shape({
        name: yup.string().required().min(6),
        email: yup.string().required().email()
    })

    const form = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            avatar: ''
        },
        resolver: yupResolver(Schema)
    })

    const { handleSubmit } = form

    const handleSubmitForm = (values) => {
        const formData = new FormData()
        formData.set('name', values.name)
        formData.set('email', values.email)
        formData.set('avatar', avatar)

        dispatch(updateUser(formData))
    }

    const [avatar, setAvatar] = UseState('')
    const [avatarPreview, setAvatarPreview] = UseState("https://cdn.universalnews.org/wp-content/uploads/2020/05/Facebook-Avatar.jpg")


    UseEffect(() => {
        if (user) {
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser())

            history.push('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, history, isUpdated, alert])


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
            <MetaData title={'Upadate Profile'} />
            <div className="relative flex justify-center w-full py-5">
                <div className="relative grid w-3/4 overflow-hidden border rounded-lg md:w-2/4">

                    <div className="relative col-span-3 px-6 py-4 lg:col-span-2 xl:col-span-1">
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className="flex items-center">
                                <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                                <h2 className="text-sm font-extrabold">HSHOP</h2>
                            </div>
                            <h1 className="text-3xl font-extrabold py-7">Update Profile</h1>
                            <div className="w-full">
                                <label for="name" className="text-xs">Your Name</label>
                                <Input form={form} type={"text"} placeholder={"Your Name"} name={"name"} />
                            </div>
                            <div className="w-full mt-2">
                                <label for="email" className="text-xs">Your Email</label>
                                <Input form={form} type={"email"} placeholder={"Your Email"} name={"email"} />
                            </div>
                            <div className="w-full mt-2">
                                <label className="text-xs">Choose Avatar</label>
                                <div className="relative">
                                    <div className="relative w-14 h-14">
                                        <img src={avatarPreview} alt="avatar" className="object-cover w-full h-full mt-2 border-2 border-blue-400 rounded-full" />
                                    </div>
                                    <label htmlFor="avatar" className="absolute top-0 left-0 h-full text-xs rounded-full cursor-pointer w-14"></label>
                                    <Input form={form} type={"file"} name={"avatar"} onchange={changeAvatar} hidden accept={'image/*'} />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={loading ? "w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-700 rounded-lg cursor-pointer"
                                    : "w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-9 00 rounded-lg cursor-pointer"}
                            >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
