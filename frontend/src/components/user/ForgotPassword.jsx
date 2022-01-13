import React, { useRef, useEffect as UseEffect } from 'react'
import MetaData from '../layouts/MetaData'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { forgotPassword, clearError } from '../../actions/userActions'

//import form
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../ElementForm/Input'

const ForgotPassword = () => {
     //config form
     const Schema = yup.object().shape({
        email: yup.string().required().email(),
    })

    const form = useForm({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(Schema)
    })

    const { handleSubmit } = form

    const handleSubmitForm = (values) => {
        const formData = new FormData()
        formData.set('email', values.email)

        dispatch(forgotPassword(formData))
    }

    const alert = UseAlert()
    const dispatch = UseDispatch()

    const { error, message, loading } = UseSelector(state => state.forgotPassword)

    UseEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (message) {
            alert.success(message)

        }
    }, [dispatch, error, alert, message])


    return (
        <>
            <MetaData title={'Forgot Password'}/>

            <div className="relative flex justify-center w-full py-5">
                <div className="relative grid w-3/4 overflow-hidden border rounded-lg md:w-2/4">

                    <div className="relative col-span-3 px-6 py-4 lg:col-span-2 xl:col-span-1">
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className="flex items-center">
                                <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                                <h2 className="text-sm font-extrabold">HSHOP</h2>
                            </div>
                            <h1 className="text-3xl font-extrabold py-7">Forgot Password</h1>
                            <div className="w-full">
                                <label for="oldPassword" className="text-xs">Old Password</label>
                                <Input form={form} type={"email"} placeholder={"Your email"} name={"email"} />
                            </div>
                            
                            <button type="submit" className="w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">Send Email</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
