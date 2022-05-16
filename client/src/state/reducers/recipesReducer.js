import { ADD_RECIPE, DELETE_RECIPE, GET_RECIPES, GET_RECIPES_BY_ID, RECIPES_LOADING, GET_OWN_RECIPES } from './types';

const initialState = {
    recipes: [],
    loading: false
};

const recipesReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            };
        case GET_RECIPES_BY_ID:
            return {
                ...state,
                users: state.recipes.filter(recipe => recipe._id === action.payload)
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [action.payload, ...state.users]
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.users.filter(user => user.id !== action.payload.id)
            };
        case RECIPES_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default recipesReducer;