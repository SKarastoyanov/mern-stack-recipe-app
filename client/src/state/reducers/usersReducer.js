import { ADD_USER, DELETE_USER, GET_USERS, USERS_LOADING, UPDATE_USER, GET_USER_BY_ID, LOGIN, LOGOUT, UPDATE_PROP, } from './types';

const initialState = {
    users: [],
    loading: false,
    loggedUser: null,
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.reduce((acc, cur) => {
                    debugger
                    if (cur._id === action.payload._id) {
                        return acc.push(action.payload)
                    }
                    return acc.push(cur);
                }, [])
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        case GET_USER_BY_ID:
            return {
                ...state,
                users: state.users.filter(user => user._id === action.payload._id),
            };
        case LOGIN:
            return {
                ...state,
                loggedUser: action.payload
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case LOGOUT:
            return {
                ...state,
                loggedUser: null
            }
        default:
            return state;
    }
}

export default usersReducer;