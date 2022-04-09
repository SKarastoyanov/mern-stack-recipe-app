import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import axios from 'axios';

import Recipe from '../Recipe/Recipe'
import { API_BASE_URL, PATHS } from '../../Constants';
import './style.css'

const ProfileView = ({ setUserToEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationParts = location.pathname.split('/');
  const userId = locationParts[locationParts.length - 1]
  const [selectedUser, setSelectedUser] = useState(null);
  const [collectionToView, setCollectionToView] = useState([])

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/users/${userId}`)
      .then((res) => {
        const user = res.data;
        setSelectedUser(user)
        setCollectionToView(user.ownRecipes)
      })
      .catch(error => console.log('Fetching UsersById Error: ', error))
  }, [])

  if (!selectedUser) {
    return null
  }

  const recipeItem = document.querySelectorAll('.recipe-container');

  const showFavCollection = (event) => {
    event.preventDefault()
    setCollectionToView(selectedUser.favourites);
    recipeItem.forEach(element => element.style.background = 'white');
  }

  const showOwnCollection = (event) => {
    event.preventDefault();
    setCollectionToView(selectedUser.ownRecipes)
    recipeItem.forEach(element => element.style.background = '#d9fad2');
  }

  const deleteSelectedUser = (event) => {
    event.stopPropagation()
    axios.delete(`${API_BASE_URL}/api/users/${userId}`)
      .then(navigate(PATHS.HOME)
      )
      .catch(error => console.log('User Delete not successful', error))
  }

  const onEditUser = (event) => {
    event.preventDefault();
    setUserToEdit(selectedUser)
    navigate(PATHS.EDIT_USER)
  }

  return (
    <div className='profile-view-container'>
      <SplitPane split='vertical' minSize={200} defaultSize={400} maxSize={400}>
        <div className='profile-left-side'>
          <img src={selectedUser.img} className='profile-img-large' alt='user' />
          <p><strong>Name: </strong>{selectedUser.firstName} {selectedUser.lastName}</p>
          <p><strong>Login Name: </strong>{selectedUser.loginName}</p>
          <p><strong>Gender: </strong>{selectedUser.gender}</p>
          <p><strong>Role: </strong>{selectedUser.role}</p>
          <p><strong>Status: </strong>{selectedUser.userStatus}</p>
          <p><strong>Introduction: </strong>{selectedUser.introduction}</p>
          <p><strong>Registration date: </strong>{selectedUser.registrationDate}</p>
          <p><strong>Modified: </strong>{selectedUser.modified}</p>
          <div id='button-container'>
            <button
              className='btn btn-success'
              type='edit'
              name='edit'
              onClick={onEditUser}>
              Edit Profile
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={deleteSelectedUser}
            >Delete Profile
            </button>
          </div>
        </div>
        <SplitPane id='split-horisontal' split='horizontal'>
          <div id='profile-view-buttons'>
            <button
              id='collection-button'
              className='own-button btn btn-outline-success'
              type='button'
              onClick={showOwnCollection}>{`Own Recipes (${selectedUser.ownRecipes.length})`}</button>
            <button
              id='collection-button'
              className='fav-button btn btn-outline-success'
              type='button'
              onClick={showFavCollection}>{`Favourites Recipes (${selectedUser.favourites.length})`}</button>
          </div>
          <div id='recipes-container' className='d-flex flex-column align-items-center' >
            {
              collectionToView.length > 0 ? collectionToView.map(recipe => (
                <Recipe key={recipe._id} recipe={recipe} />)) : `You haven't added any recipes yet`
            }
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  )
}

export default ProfileView;