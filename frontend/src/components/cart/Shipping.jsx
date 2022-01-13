import { yupResolver } from '@hookform/resolvers/yup'
import { countries } from 'countries-list'
import React, { useRef } from 'react'
//import form
import { useForm } from "react-hook-form"
import { useDispatch as UseDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { saveShippingInfo } from '../../actions/cartActions'
import Input from '../../ElementForm/Input'
import Select from '../../ElementForm/Select'
import MetaData from '../layouts/MetaData'
import CheckoutStep from './CheckoutStep'




const Shipping = ({ history }) => {
    //config form
    const Schema = yup.object().shape({
        address: yup.string().required('Address is a required field'),
        city: yup.string().required('City is a required field'),
        phoneNo: yup.string().required('Phone is a required field'),
        postalCode: yup.string().required('Postal code is a required field'),
        country: yup.string().required('Country is a required field')
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
        dispatch(saveShippingInfo({
            address: values.address,
            city: values.city,
            phoneNo: values.phoneNo,
            postalCode: values.postalCode,
            country: values.country
        }))
        history.push('/orders/confirm')
    }
    //config form

    const dispatch = UseDispatch()
    
    const countriesList = Object.values(countries)

    const { shippingInfo } = useSelector(state => state.cart)
    const address = useRef({ value: shippingInfo.address })
    const city = useRef({ value: shippingInfo.city })
    const postalCode = useRef({ value: shippingInfo.postalCode })
    const phoneNo = useRef({ value: shippingInfo.phoneNo })
    const country = useRef({ value: shippingInfo.country })


    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({
            address: address.current.value,
            city: city.current.value,
            phoneNo: phoneNo.current.value,
            postalCode: postalCode.current.value,
            country: country.current.value
        }))
        history.push('/orders/confirm')
    }


    return (
        <>
            <MetaData title={'Shipping Info'} />
            <CheckoutStep shipping />
            <>
                <div className="relative flex justify-center w-full py-5">
                    <div className="relative grid w-3/4 overflow-hidden border rounded-lg md:w-2/4">

                        <div className="relative col-span-3 px-6 py-4 lg:col-span-2 xl:col-span-1">
                            <form onSubmit={handleSubmit(handleSubmitForm)}>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                                    <h2 className="text-sm font-extrabold">HSHOP</h2>
                                </div>
                                <h1 className="text-3xl font-extrabold py-7">Shipping Info</h1>
                                <div className="w-full">
                                    <label for="address" className="text-xs">Address</label>
                                    <Input form={form} type={"text"} placeholder={"Your Address"} name={"address"} defaultValue={address.current.value}/>
                                </div>
                                <div className="w-full mt-2">
                                    <label for="city" className="text-xs">City</label>
                                    <Input form={form} type={"text"} placeholder={"Your City"} name={"city"} defaultValue={city.current.value}/>
                                </div>
                                <div className="w-full mt-2">
                                    <label for="phoneNo" className="text-xs">Phone No</label>
                                    <Input form={form} type={"text"} placeholder={"Your Phone"} name={"phoneNo"} number defaultValue={phoneNo.current.value}/>
                                </div>
                                <div className="w-full mt-2">
                                    <label for="postalCode" className="text-xs">Postal Code</label>
                                    <Input form={form} type={"text"} placeholder={"Your Postal Code"} name={"postalCode"} number defaultValue={postalCode.current.value}/>
                                </div>
                                <div className="w-full mt-2">
                                    <label for="country" className="text-xs">Country</label>
                                    <Select form={form} type={"text"} placeholder={"Your Country"} name={"country"} number options={countriesList} defaultValue={country.current.value}/>
                                </div>
                                <button type="submit" className="w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">CONTINUE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Shipping