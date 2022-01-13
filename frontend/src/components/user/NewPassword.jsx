import React, { useRef, useEffect as UseEffect } from 'react'
import MetaData from '../layouts/MetaData'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { resetPassword, clearError } from '../../actions/userActions'

//import form
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../ElementForm/Input'


const NewPassword = ({history, match}) => {
    //config form
    const Schema = yup.object().shape({
        password: yup.string().required(),
        confirmPassword: yup.string().required()
    })

    const form = useForm({
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
        resolver: yupResolver(Schema)
    })

    const { handleSubmit } = form

    const handleSubmitForm = (values) => {
        const formData = new FormData()
        formData.set('password', values.password)
        formData.set('confirmPassword', values.confirmPassword)

        dispatch(resetPassword(match.params.token ,formData))
    }
    
    const password = useRef('')
    const confirmPassword = useRef('')


    const alert = UseAlert()
    const dispatch = UseDispatch()

    const { error, success } = UseSelector(state => state.forgotPassword)

    UseEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (success) {
            alert.success('Password updated successfully')
            history.push('/login')

        }
    }, [dispatch, error, alert, success, history])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('password', password.current.value)
        formData.set('confirmPassword', confirmPassword.current.value)

        dispatch(resetPassword(match.params.token ,formData))
    }

    
    return (
        <>
            <MetaData title={'New Password Reset'}/>
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
                                <label for="password" className="text-xs">Old Password</label>
                                <Input form={form} type={"password"} placeholder={"New Password"} name={"password"} />
                            </div>
                            <div className="w-full mt-2">
                                <label for="confirmPassword" className="text-xs">New Password</label>
                                <Input form={form} type={"password"} placeholder={"Confirm New Password"} name={"confirmPassword"} />
                            </div>
                            
                            <button type="submit" className="w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">Set Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPassword