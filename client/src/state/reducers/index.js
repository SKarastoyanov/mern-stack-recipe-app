import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import recipesReducer from './recipesReducer'

export default combineReducers({
    users: usersReducer,
    recepes: recipesReducer
});