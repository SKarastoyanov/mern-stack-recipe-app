import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { getUsers } from '../../state/actions/userActions';
import UserItem from '../UserItem/UserItem'
import './style.css'

const UsersCollections = () => {
    const dispatch = useDispatch();
    const { users: usersList, loading } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    if (!usersList || loading) {
        return null
    }

    return (
        <div className='users-view-container'>
            <div className='list-group' id='myList' role='tablist'>
                {
                    usersList.length > 0 ? (
                    usersList.map(user => (
                        <UserItem key={user._id} user={user} />
                    ))) :
                    <p>no users yet</p>
                }
            </div>
            <Outlet />
        </div>
    )
}

UsersCollections.propTypes = {}

export default UsersCollections