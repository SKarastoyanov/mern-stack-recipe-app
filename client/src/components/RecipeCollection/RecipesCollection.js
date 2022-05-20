import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';

import { API_BASE_URL } from '../../Constants';
import Recipe from '../Recipe/Recipe';
import './style.css'

const RecipesCollection = () => {
    const [recipes, setRecipes] = useState(null);

    //prevent page reloading at pressing Enter button
    document.getElementById('searchForm')?.addEventListener('submit', (e) => { e.preventDefault() }, false);

    const getRecipes = () => {
        axios.get(`${API_BASE_URL}/api/recipes`)
            .then(res => {
                setRecipes(res.data)
            })
            .catch(error => console.log('Fetching Recipes Error: ', error))
    }

    const handleTextCange = (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();
        axios.get(`${API_BASE_URL}/api/recipes`)
            .then((res) => {
                if (res.data && searchTerm.length > 2) {
                    const searchResults = res.data.filter(recipe => recipe.title.toLowerCase().includes(searchTerm))
                    if (searchResults.length > 0) {
                        document.getElementById('results').textContent = `${searchResults.length} recipes meet your search criteria.`;
                        setRecipes(searchResults)
                    } else {
                        document.getElementById('results').textContent = 'No recipe found. Change your search criteria.';
                    }
                } else {
                    setRecipes(res.data);
                    document.getElementById('results').textContent = '';
                }
            })
            .catch(error => console.log('Fetching Recipes Error: ', error))
    }

    useEffect(() => {
        getRecipes();
    }, [])

    if (!recipes) {
        return null
    }

    return (
        <div id='recipe-collection-container'>
            <div id='search-field'>
                <div>What do you want to cook?</div>
                <form id='searchForm' action='/recipes' method='GET' className='form-inline'>
                    <div id='search' className='form-group d-flex flex-column align-items-center'>
                        <input
                            id='userInput'
                            type='text'
                            name='search'
                            placeholder={`search in ${recipes.length} recipes`}
                            className='form-control'
                            onChange={handleTextCange}
                        />
                    </div>
                </form>
            </div>
            <div id='results' className='d-flex flex-column align-items-center'></div>
            <div className='d-flex flex-column align-items-center RecipeCollection-container' >
                {
                    recipes.sort((a, b) => (a.created < b.created ? 1 : -1)).map(recipe => (
                        <Recipe key={recipe._id} recipe={recipe} />))
                }
            </div>
            <Outlet />
        </div>
    );
}

RecipesCollection.propTypes = {}

export default RecipesCollection