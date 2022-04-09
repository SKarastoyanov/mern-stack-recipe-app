import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { PATHS } from '../../Constants';
import { getUserById } from '../../state/actions/userActions';
import './style.css';

const Header = ({ loggedUser, setMessages }) => {
    const dispatch = useDispatch();

    const setUserToView = () => {
        // dispatch(getUserById(loggedUser._id));
    }

    const handleLogout = () => {
        setMessages(`Bon appetit ${loggedUser.loginName}!`);
        console.log('handleLogout')
        window.localStorage.removeItem('user')
        const authEvent = new Event('localStorageAuthEvent')
        window.dispatchEvent(authEvent)
    }

    return (
        <div className='header-container'>
            <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start'>
                <a href='/' className='logo-container'>
                    <img src='./img/app-logo-removebg-preview.png' className='logo flex-shrink-0' alt='logo' />
                </a>

                <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
                    <li><Link className='nav-link px-2 link-success' to={PATHS.HOME}>Home</Link></li>
                    <li>
                        <Link
                            className='nav-link px-2 link-success'
                            to={PATHS.RECIPE_COLLECTION}>
                            Recipes Collection
                        </Link>
                    </li>
                    <li><Link className='nav-link px-2 link-success' to={PATHS.ADD_RECIPE}>Add Recipe</Link></li>
                    <li><Link className='nav-link px-2 link-success' to={PATHS.USERS}>All Users</Link></li>
                    <li><Link className='nav-link px-2 link-success' to={PATHS.ABOUT}>About</Link></li>
                </ul>
                <div className='login-button-container text-end'>
                    <Link to={PATHS.LOGIN_FORM}>
                        <button
                            id='header-button'
                            type='button'
                            className='btn border-2 btn-outline-success me-2'
                            onClick={loggedUser ? handleLogout : null}
                        >
                            {loggedUser ? 'logout' : 'Login'}
                        </button>
                    </Link>
                    {loggedUser ?
                        <Link
                            to={PATHS.PROFILE_VIEW}
                            onClick={setUserToView}>
                            <img
                                src={loggedUser.img}
                                className='profile-img rounded-circle'
                                alt='user'
                            /></Link> :
                        <Link
                            to={PATHS.SIGN_UP_FORM}>
                            <button id='header-button' type='button' className='btn border-2 btn-outline-warning'
                            >Sign-up
                            </button>
                        </Link>}
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {}

export default Header
