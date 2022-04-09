import React, { useState } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL, PATHS } from '../../Constants';
import './style.css';


const recipeFields = {
    chefId: 'chefId',
    title: 'title',
    content: 'content',
    cookingTime: 'cookingTime',
    ingredients: 'ingredients',
    imageUrl: 'imageUrl',
    description: 'description',
    tags: 'tags',
    created: 'created',
    modified: 'modified'
}

const newRecipe = {
    [recipeFields.chefId]: '624e9107098c719671cbb156', //to be fixed
    [recipeFields.title]: '',
    [recipeFields.content]: '',
    [recipeFields.cookingTime]: '60',   //to be fixed
    [recipeFields.ingredients]: '',
    [recipeFields.imageUrl]: '',
    [recipeFields.description]: '',
    [recipeFields.tags]: '',
    [recipeFields.created]: new Date(),
    [recipeFields.modified]: new Date()
}

const RecipeForm = ({ recipeToEdit, setMessages }) => {
    const [recipeState, setRecipeState] = useState(recipeToEdit || newRecipe);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!recipeToEdit) {
            axios
            .post(`${API_BASE_URL}/api/recipes`, recipeState)
            .then(navigate(PATHS.RECIPE_COLLECTION))
            .catch(error => console.log('Recipe Creation Unsuccessful: ', error))
            setMessages(`Recipe ${recipeState.title} updated successfully!`)
        } else {
            axios.put(`${API_BASE_URL}/api/recipes/${recipeState._id}`, recipeState)
            .then(navigate(PATHS.RECIPE_COLLECTION))
            .catch(error => console.log('Recipe Update Unsuccessful: ', error))
            setMessages(`Recipe ${recipeState.title} added successfully!`)
        }
    }

    const handleReset = (event) => {
        event.preventDefault();
        setRecipeState({ ...newRecipe })
    }

    const onRecipeChange = (event, recipeField) => {
        const target = event.target;
        setRecipeState(prevState => ({
            ...prevState,
            [recipeField]: target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <div id='recipe-form-container' className='d-flex flex-column recipe-form-container align-items-center'>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='RecipeTitle'
                        placeholder='Recipe Title'
                        aria-describedby='basic-addon1'
                        min='3'
                        max='80'
                        value={recipeState.title}
                        onChange={(event) => onRecipeChange(event, recipeFields.title)}
                        required />
                    <label htmlFor='floatingInput'>Recipe Title</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        aria-label='RecipeTitle'
                        placeholder='Short Description'
                        aria-describedby='basic-addon1'
                        data-length='256'
                        value={recipeState.content}
                        onChange={(value) => onRecipeChange(value, recipeFields.content)}
                        required />
                    <label htmlFor='floatingInput'>Short Description</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='range'
                        className='form-range'
                        min='0'
                        max='120'
                        step='5'
                        id='customRange3'
                        value={recipeState.cookingTime}
                        onChange={(value) => onRecipeChange(value, recipeFields.cookingTime)
                        }
                        required
                    />
                </div>
                <label id='cookingTimeValue' htmlFor='customRange3' className='form-label'>Cooking Time: {recipeState.cookingTime || 60}min</label>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Add Ingredients Separeted By Coma'
                        aria-label='ingredients'
                        aria-describedby='basic-addon1'
                        value={recipeState.ingredients}
                        onChange={(value) => onRecipeChange(value, recipeFields.ingredients)}
                        required />
                    <label htmlFor='floatingInput'>Add Ingredients Separeted By Coma</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Add image Url of your dish'
                        aria-label='Image URL'
                        aria-describedby='basic-addon1'
                        value={recipeState.imageUrl}
                        onChange={(value) => onRecipeChange(value, recipeFields.imageUrl)}
                        required />
                    <label htmlFor='floatingInput'>Add Image URL</label>
                </div>

                <div className='form-floating mb-3'>
                    <textarea
                        className='form-control'
                        placeholder='Describe how to prepare the dish...'
                        id='floatingTextarea2'
                        style={{ height: '100px' }}
                        value={recipeState.description}
                        onChange={(value) => onRecipeChange(value, recipeFields.description)}
                        required></textarea>
                    <label htmlFor='floatingInput'>Describe how to prepare the dish...</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Add tags separeted by coma'
                        aria-describedby='basic-addon1'
                        value={recipeState.tags}
                        onChange={(value) => onRecipeChange(value, recipeFields.tags)}
                        required />
                    <label htmlFor='floatingInput'>Add tags separeted by coma</label>
                </div>
                <div className='RecipeForm-button-panel'>
                    <button id='recipe-form-btn' className='btn btn-success' type='submit' name='submit'>Submit</button>
                    <button id='recipe-form-btn' className='btn btn btn-danger' type='reset' name='reset'>Reset</button>
                </div>
            </div>
        </form >
    )
}

RecipeForm.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number,
        chefId: PropTypes.number,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        cookingTime: PropTypes.number.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageUrl: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        created: PropTypes.instanceOf(Date),
        modified: PropTypes.instanceOf(Date)
    })
}

export default RecipeForm