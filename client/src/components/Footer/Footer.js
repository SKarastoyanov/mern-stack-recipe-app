import React from 'react'

import { Link } from 'react-router-dom'
import { PATHS } from '../../Constants'
import './style.css'


const Footer = (props) => {
  return (
    <div id='footer-container' className='d-flex justify-content-between' >
      <div className='text-muted border-top footer-info-item nav-link px-2'>&copy; 2021 Company, Inc</div>
      <div className='footer-logo-item'>
        <a href='/' className='logo-container'>
          <img src='./img/footer-logo.png' className='footer-logo flex-shrink-0' alt='logo' />
        </a>
      </div>
      <div className='footer-links-item'>
        <ul className='nav justify-content-end border-top'>
          <li className='nav-item'><Link className='nav-link px-2 text-muted' to={PATHS.HOME}>Home</Link></li>
          <li className='nav-item'><Link className='nav-link px-2 text-muted' to={PATHS.RECIPE_COLLECTION}>Recipes Collection</Link></li>
          <li className='nav-item'><Link className='nav-link px-2 text-muted' to={PATHS.ADD_RECIPE}>Add Recipe</Link></li>
          <li className='nav-item'><Link className='nav-link px-2 text-muted' to={PATHS.ABOUT}>About</Link></li>
        </ul>
      </div>
    </div>
  )
}

Footer.propTypes = {}

export default Footer
