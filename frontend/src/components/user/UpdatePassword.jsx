import React, { useRef, useEffect as UseEffect, useState as UseState } from 'react'
import { useHistory as UseHistory } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { updatePassword, clearError } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants.js'

//import form
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../ElementForm/Input'


const UpdatePassword = () => {
     //config form
     const Schema = yup.object().shape({
        oldPassword: yup.string().required(),
        password: yup.string().required()
    })

    const form = useForm({
        defaultValues: {
            oldPassword: '',
            password: ''
        },
        resolver: yupResolver(Schema)
    })

    const { handleSubmit } = form

    const handleSubmitForm = (values) => {
        const formData = new FormData()
        formData.set('oldPassword', values.oldPassword)
        formData.set('password', values.password)

        dispatch(updatePassword(formData))
    }

    const alert = UseAlert()
    const dispatch = UseDispatch()
    const history = UseHistory()

    const { error, isUpdated, loading } = UseSelector(state => state.user)

    UseEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (isUpdated) {
            alert.success('Password updated successfully')

            history.push('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, history, isUpdated, alert])

    return (
        <>
        <MetaData title = {'Change Password'}/>

        <div className="relative flex justify-center w-full py-5">
                <div className="relative grid w-3/4 overflow-hidden border rounded-lg md:w-2/4">

                    <div className="relative col-span-3 px-6 py-4 lg:col-span-2 xl:col-span-1">
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className="flex items-center">
                                <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                                <h2 className="text-sm font-extrabold">HSHOP</h2>
                            </div>
                            <h1 className="text-3xl font-extrabold py-7">Update Password</h1>
                            <div className="w-full">
                                <label for="oldPassword" className="text-xs">Old Password</label>
                                <Input form={form} type={"password"} placeholder={"Your old password"} name={"oldPassword"} />
                            </div>
                            <div className="w-full mt-2">
                                <label for="password" className="text-xs">New Password</label>
                                <Input form={form} type={"password"} placeholder={"Your new password"} name={"password"} />
                            </div>
                            
                            <button type="submit" className="w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword
