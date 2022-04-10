
import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const UserItem = ({ user }) => {

    // if (!user) {
    //     return null;
    // }

    return (
        <Link id='user-item-link' key={user._id} to={user._id}>
            <div
                className='list-group-item'
                role='tab'>
                <div id='items'><strong>Name:&nbsp;</strong>{user.firstName} {user.lastName}</div>
                <div id='items'><strong>Login name:&nbsp;</strong>{user.loginName}</div>
                <div id='items'><strong>Status:&nbsp;</strong>{user.userStatus}</div>
                <div id='items'><strong>Own recipes:&nbsp;</strong>{user.ownRecipes?.length || '0'}</div>
            </div>
        </Link>
    )
}

UserItem.propTypes = {}


export default UserItem