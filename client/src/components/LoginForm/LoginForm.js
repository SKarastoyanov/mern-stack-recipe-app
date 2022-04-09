import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './style.css'
import { API_BASE_URL, PATHS } from '../../Constants';


const LoginForm = ({ setMessages }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            loginName: '',
            password: ''
        }
    })

    const submitLoginForm = (data) => {
         axios.post(`${API_BASE_URL}/api/login`, data)
            .then(loggedUser => {
                let user = {
                    id: loggedUser.data.id,
                    firstName: loggedUser.data.firstName,
                    lastName: loggedUser.data.lastName,
                    loginName: loggedUser.data.loginName,
                    img: loggedUser.data.img,
                    gender: loggedUser.data.gender,
                    role: loggedUser.data.role,
                    status: loggedUser.data.status,
                    introduction: loggedUser.data.introduction,
                    ownRecipes: loggedUser.data.ownRecipes,
                    favourites: loggedUser.data.favourites,
                    registrationDate: loggedUser.data.registrationDate,
                    modified: loggedUser.data.modified
                };

                window.localStorage.setItem('user', JSON.stringify(user));
                const event = new Event('localStorageAuthEvent')
                window.dispatchEvent(event);
                setMessages(`${user.loginName} logged in successfully!`);
                navigate(PATHS.HOME);

            }).catch(error => console.log(error.error))
    }

    return (
        <form className='login-form' onSubmit={handleSubmit(submitLoginForm)}>
            <div className='login-form-container'>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Login name'
                        {...register('loginName', { required: true, maxLength: 15 })} />
                    <label htmlFor='floatingInput'>Login name</label>
                    <p>{errors.loginName?.message}</p>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        {...register('password', { required: true })} />
                    <label id='passHelp' htmlFor='floatingInput'>Password</label>
                </div>
                <div className='Form-button-panel'>
                    <button
                        disabled={!isDirty}
                        className='btn btn-success'
                        type='submit'
                        name='submit'
                    > Login
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm