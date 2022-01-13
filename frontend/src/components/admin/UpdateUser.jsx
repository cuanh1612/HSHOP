import React, {useEffect as UseEffect, useState as UseState } from 'react'
import { useHistory as UseHistory } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { useAlert as UseAlert } from 'react-alert'
import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'

import { updateUserAdmin, clearError, getUserDetails } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants.js'


export default function UpdateUser({ match }) {
    const [name, setName] = UseState('')
    const [email, setEmail] = UseState('')
    const [role, setRole] = UseState('')


    const alert = UseAlert()
    const dispatch = UseDispatch()
    const history = UseHistory()

    const { error, isUpdated } = UseSelector(state => state.user)
    const { user } = UseSelector(state => state.userDetails)

    const userId = match.params.id

    UseEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (isUpdated) {
            alert.success('User updated successfully')

            history.push('/admin/users')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }
    }, [dispatch, error, history, isUpdated, user, alert])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('role', role)

        dispatch(updateUserAdmin(user._id, formData))
    }

    return (
        <>
            <MetaData title={`Update User`} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit = {submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="name" id="name_field" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input type="email" id="email_field" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>
                                    <select id="role_field" className="form-control" name="role" value={role} onChange={(e) => setRole(e.target.value)} >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="mt-4 mb-3 btn update-btn btn-block">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
