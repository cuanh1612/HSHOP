import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS, 
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

import axios from 'axios'
axios.defaults.withCredentials = true

//Login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch ({
            type: LOGIN_REQUEST
        })
        const {data} = await axios.post(process.env.REACT_APP_URL_SERVER + '/api/v1/login', {email: email, password: password})

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch ({
            type: REGISTER_USER_REQUEST
        })

        const congig = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const {data} = await axios.post(process.env.REACT_APP_URL_SERVER + '/api/v1/register', userData, congig)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch ({
            type: LOAD_USER_REQUEST
        })

        const {data} = await axios.get(process.env.REACT_APP_URL_SERVER + '/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update profile user
export const updateUser = (userData) => async (dispatch) => {
    try {
        dispatch ({
            type: UPDATE_PROFILE_REQUEST
        })

        const congig = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const {data} = await axios.put(process.env.REACT_APP_URL_SERVER + '/api/v1/me/update', userData, congig)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update password user
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch ({
            type: UPDATE_PASSWORD_REQUEST
        })

        const congig = {
            Headers: {
                'content-type': 'application/json'
            }
        }
        const {data} = await axios.put(process.env.REACT_APP_URL_SERVER + '/api/v1/password/update', passwords, congig)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch ({
            type: FORGOT_PASSWORD_REQUEST
        })

        const congig = {
            Headers: {
                'content-type': 'application/json'
            }
        }
        const {data} = await axios.post(process.env.REACT_APP_URL_SERVER + '/api/v1/password/forgot', email, congig)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch ({
            type: NEW_PASSWORD_REQUEST
        })

        const congig = {
            Headers: {
                'content-type': 'application/json'
            }
        }
        const {data} = await axios.put(process.env.REACT_APP_URL_SERVER + `/api/v1/password/reset/${token}`, passwords, congig)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

//Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get(process.env.REACT_APP_URL_SERVER + '/api/v1/logout')

        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all user (admin)
export const allUsers = () => async (dispatch) => {
    try {
        dispatch ({
            type: ALL_USERS_REQUEST
        })

        const {data} = await axios.get(process.env.REACT_APP_URL_SERVER + '/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update user (admin)
export const updateUserAdmin = (id, userData) => async (dispatch) => {
    try {
        dispatch ({
            type: UPDATE_USER_REQUEST
        })

        const congig = {
            Headers: {
                'content-type': 'application/json'
            }
        }
        const {data} = await axios.put(process.env.REACT_APP_URL_SERVER + `/api/v1/admin/user/${id}`, userData, congig)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get user details (admin)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch ({
            type: USER_DETAILS_REQUEST
        })

        const {data} = await axios.get(process.env.REACT_APP_URL_SERVER + `/api/v1/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete user (admin)
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch ({
            type: DELETE_USER_REQUEST
        })

        const {data} = await axios.delete(process.env.REACT_APP_URL_SERVER + `/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
