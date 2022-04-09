import axios from 'axios';

import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, GET_USER_BY_ID, UPDATE_USER } from '../reducers/types';
import { API_BASE_URL } from '../../Constants';

export const getUsers = () => dispatch => {
    debugger
    dispatch(getUsersLoading());
    axios.get(`${API_BASE_URL}/api/users`)
        .then(res => {
            console.log("get user")
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(error => console.log('Fetching Users Error: ', error))
};

export const addUser = user => dispatch => {
    axios
        .post(`${API_BASE_URL}/api/users`, user)
        .then(res =>
            dispatch({
                type: ADD_USER,
                payload: res.data
            }))
        .catch(error => console.log(`User ${user.loginName} Not Added Successfully`, error))
}

export const updateUser = (id, userData) => dispatch => {
    axios
        .put(`${API_BASE_URL}/api/users/${id}`, userData)
        .then(res =>
            dispatch({
                type: UPDATE_USER,
                payload: res.data.user
            }))
        .catch(error => console.log(`User Not Updated Successfully`, error))
}

export const deleteUser = id => dispatch => {
    axios
        .delete(`${API_BASE_URL}/api/users/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_USER,
                payload: id
            })
        );
};

export const getUsersLoading = () => {
    return {
        type: USERS_LOADING
    }
}