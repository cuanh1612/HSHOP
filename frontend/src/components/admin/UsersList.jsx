import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearError, deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'

export default function UsersList({history}) {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, users } = useSelector(state => state.allUsers)
    const {isDeleted} = useSelector(state => state.user) 

    useEffect(() => {

        dispatch(allUsers())
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if(isDeleted){
            alert.success('User deleted successfully')
            history.push('/admin/users')
            dispatch({type: DELETE_USER_RESET})
        }
        
    }, [dispatch, alert, error, isDeleted, history])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                    <>
                        <Link to={`/admin/user/${user._id}`} className="px-2 py-1 btn btn-primary">
                            <i className="fas fa-pencil-alt"></i>
                        </Link>
                        <button className="px-2 py-1 ml-2 btn btn-danger" onClick = {() => deleteUserHandler(user._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        })

        return data
    }
    
    return (
        <>
            <MetaData title={"All Users"} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <>
                        <h1 className='my-5'>All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </>
                </div>
            </div>
        </>
    )
}
