import { ADD_USER, DELETE_USER, GET_USER_BY_ID, GET_USERS, USERS_LOADING, UPDATE_USER } from './types';

const initialState = {
    users: [],
    loading: false
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
                users: [action.payload, ...state.users]
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload) //in mongo id => _id
            };
        case GET_USER_BY_ID:
            return {
                ...state,
                users: state.users.filter(user => user._id === action.payload)
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default usersReducer;