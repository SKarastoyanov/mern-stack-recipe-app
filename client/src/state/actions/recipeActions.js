import axios from 'axios';

import { API_BASE_URL } from '../../Constants';
import { ADD_RECIPE, DELETE_RECIPE, GET_RECIPES, RECIPES_LOADING, GET_RECIPES_BY_ID } from '../reducers/types';

export const getRecipes = () => dispatch => {
    dispatch(setRecipesLoading());
    axios.get(`${API_BASE_URL}/api/recipes`)
        .then(res => {
            dispatch({
                type: GET_RECIPES,
                payload: res.data
            })
        })
        .catch(error => console.log('Fetching Recipes Error: ', error))
};

export const getRecipesById = id => dispatch => {
    dispatch(setRecipesLoading());
    axios.get(`${API_BASE_URL}/api/recipes/${id}`)
        .then(res => {
            dispatch({
                type: GET_RECIPES_BY_ID,
                payload: id
            })
        }
        );
};

export const addRecipe = recipe => dispatch => {
    axios
        .post(`${API_BASE_URL}/api/recipes`, recipe)
        .then(res =>
            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            }))
        .catch(error => console.log(`User ${recipe.title} not added successfully`, error))
}

export const deleteRecipe = id => dispatch => {
    axios
        .delete(`${API_BASE_URL}/api/recipes/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_RECIPE,
                payload: id
            })
        );
};

export const setRecipesLoading = () => {
    return {
        type: RECIPES_LOADING
    }
}