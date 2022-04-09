
import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const UserItem = ({ user }) => {

    return (
        <Link id='user-item-link' key={user._id} to={user._id}>
            <div
                className='list-group-item'
                role='tab'>
                <div id='items'><strong>Name: </strong>{user.firstName} {user.lastName}</div>
                <div id='items'><strong>Login name: </strong>{user.loginName}</div>
                <div id='items'><strong>Status: </strong>{user.userStatus}</div>
                <div id='items'><strong>Own recipes: </strong>{user.ownRecipes.length}</div>
            </div>
        </Link>
    )
}

UserItem.propTypes = {}


export default UserItem