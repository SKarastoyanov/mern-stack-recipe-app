import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';

import { API_BASE_URL } from '../../Constants';
import Recipe from '../Recipe/Recipe';
import SearchBar from './SearchBar';
import './style.css'

const RecipesCollection = () => {
    const [recipes, setRecipes] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const params = useParams();

    const getRecipes = () => {
        if (searchResults) {
            console.log(searchResults)
            setRecipes(searchResults)
        } else {
            axios.get(`${API_BASE_URL}/api/recipes`)
            .then(res => {
                setRecipes(res.data)
            })
            .catch(error => console.log('Fetching Recipes Error: ', error))
        }
    }

    useEffect(() => {
        getRecipes();
    }, [searchResults])

    if (!recipes) {
        return null
    }

    return (
        <div id='recipe-collection-container'>
            <SearchBar setSearchResults={setSearchResults}/>
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