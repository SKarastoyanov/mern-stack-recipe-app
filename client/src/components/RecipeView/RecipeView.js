import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SplitPane from 'react-split-pane'

import { API_BASE_URL, PATHS } from '../../Constants'
import './style.css'

const RecipeView = ({ setRecipeToEdit }) => {
    debugger
    const location = useLocation();
    const locationParts = location.pathname.split('/');
    const recipeId = locationParts[locationParts.length - 1]

    const [recipe, setRecipe] = useState(null)
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const onDeleteRecipe = (event) => {
        event.stopPropagation()
        axios.delete(`${API_BASE_URL}/api/recipes/${recipeId}`)
            .then(navigate(PATHS.RECIPE_COLLECTION, {deleted: true})
            )
            .catch(error => console.log('Recipe Delete not successful', error))
    }

    const onEditRecipe = (event) => {
        event.preventDefault();
        setRecipeToEdit(recipe);
        navigate(PATHS.EDIT_RECIPE);
    }

    const addToFavourites = (event) => {
        event.preventDefault();

        let favButtonText = document.getElementById('favourites');
        if (favButtonText.textContent === 'Add to Favourites') {
            userData.favourites.push(recipe);
            favButtonText.textContent = 'Remove from Favourites';
        } else {
            for (var i = 0; i < userData.favourites.length; i++) {
                if (userData.favourites[i]._id === recipe._id) {
                    userData.favourites.splice(i, 1);
                }
            }

            favButtonText.textContent = 'Add to Favourites';
        }

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(userData));
    }



    const isAlreadiFavorite = () => {
        if (Object.keys(userData).length > 0) {
            const favRecipe = userData.favourites.find(element => element.id === recipe._id)
            if (favRecipe !== undefined) {
                document.getElementById('favourites').textContent = 'Remove from Favourites'
            }
        }
    }

    isAlreadiFavorite();

    const addComment = () => {
        const child =
            < figure >
                <blockquote className='blockquote'>
                    <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className='blockquote-footer'>
                    Someone famous in <cite title='Source Title'>Source Title{new Date()}</cite>
                </figcaption>
                <button
                    id='del-comment-btn'
                    type='button'
                    className='btn btn-outline-danger btn-sm'
                    hidden
                >Delete
                </button>
            </figure >

        const comments = document.getElementById('comments');
        comments.append(child)
    }

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/recipes/${recipeId}`)
            .then((res) => {
                const recipeData = res.data;
                setRecipe(recipeData)
                setUserData(JSON.parse(localStorage.getItem('user'))); //get user from local storage
            })
            .catch(error => console.log('Fetching recipe by id: ', error))
    }, [])

    if (!recipe) {
        return null
    }

    return (
        <div className='recipe-view-container'>
            <SplitPane split='vertical' minSize={200} defaultSize={370} maxSize={800}>
                <div className='profile-view-left'>
                    <img id='recipe-img' className='rounded' src={recipe.imageUrl} alt='dish' />
                    <div className='row'>
                        <div><strong>Cooking Time: </strong>{recipe.cookingTime} min</div>
                    </div>
                    <ul id='ingredients-ul'><strong>Ingredients:</strong>
                        {
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}><input id='check' type='checkbox' /> {ingredient}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='profile-view-right'>
                    <div className='row'>
                        <h1>{recipe.title}</h1>
                    </div>
                    <div className='row'>
                        <h4>{recipe.content}</h4>
                    </div>
                    <div>{recipe.description}</div>
                    <div id='tags'><strong>Tags: </strong>{recipe.tags.join(', ')}</div>
                    <div id='comments-container'>
                        <a className='comments-link' href='#' >Comments:</a>
                        <a className='add-comment-link' href='#' onClick={addComment}>Add comment</a>
                        <div id='comments'>
                            <figure>
                                <blockquote className='blockquote'>
                                    <p>A well-known quote, contained in a blockquote element.</p>
                                </blockquote>
                                <figcaption className='blockquote-footer'>
                                    Someone famous in <cite title='Source Title'>Source Title</cite>
                                </figcaption>
                                <button
                                    id='del-comment-btn'
                                    type='button'
                                    className='btn btn-outline-danger btn-sm'
                                    hidden
                                >Delete
                                </button>
                            </figure>
                        </div>
                    </div>
                    <div id='date-container'>
                        <div id='date'><strong>Last modified: </strong>{recipe.modified ? new Date(recipe.modified).toGMTString() : new Date(recipe.created).toGMTString()}</div>
                        <div id='date'><strong>Date of creation: </strong>{new Date(recipe.created).toGMTString()}</div>
                    </div>
                    <div className='float-end'>
                        <div className='button-panel'>
                            <div>
                                <button
                                    className='btn btn-success'
                                    type='edit'
                                    name='edit'
                                    onClick={onEditRecipe}>
                                    Edit Recipe
                                </button>
                            </div>
                            <div>
                                <button
                                    id='favourites'
                                    className='btn btn-warning'
                                    type='edit'
                                    name='edit'
                                    onClick={addToFavourites}>
                                    Add to Favourites
                                </button>
                            </div>
                            <div>
                                <button
                                    className='btn btn-danger'
                                    type='delete'
                                    name='delete'
                                    onClick={onDeleteRecipe}
                                >Delete Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SplitPane>
        </div>
    )
}

RecipeView.propTypes = {}

export default RecipeView