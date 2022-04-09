import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Recipe = ({ recipe, setCurrentRecipe }) => {
  const setRecipe = () => {
    setCurrentRecipe(recipe._id)
  }
  
  return (
    <Link to={recipe._id} onClick={setRecipe} className='collection-item-container'>
      <div className='recipe-container'>
        <div className='recipe-img-container'>
          <img src={recipe.imageUrl} className='recipe-img' alt='dish' />
        </div>
        <div className='recipe-text-content'>
          <p>{recipe.title}</p>
          <p>{recipe.content}</p>
          <p className='created'>{new Date(recipe.created).toGMTString()}</p>
        </div>
      </div>
    </Link>
  )
}

Recipe.propTypes = {}

export default Recipe
