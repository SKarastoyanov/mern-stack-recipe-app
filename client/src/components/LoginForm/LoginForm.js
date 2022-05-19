import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './style.css'
import { API_BASE_URL, PATHS } from '../../Constants';
import { useDispatch } from 'react-redux';
import { logUser } from '../../state/actions/userActions';


const LoginForm = ({ setMessages }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            loginName: '',
            password: ''
        }
    })

    const submitLoginForm = (data) => {
         axios.post(`${API_BASE_URL}/api/login`, data)
            .then(res => {
                const user = {
                    _id: res.data._id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    loginName: res.data.loginName,
                    img: res.data.img,
                    gender: res.data.gender,
                    role: res.data.role,
                    status: res.data.status,
                    introduction: res.data.introduction,
                    ownRecipes: res.data.ownRecipes,
                    favourites: res.data.favourites,
                    registrationDate: res.data.registrationDate,
                    modified: res.data.modified
                };

                dispatch(logUser(user));
                window.localStorage.setItem('user', JSON.stringify(user));
                const event = new Event('localStorageAuthEvent')
                window.dispatchEvent(event);
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
                        autoComplete='loginName'
                        {...register('loginName', { required: true, maxLength: 15 })} />
                    <label htmlFor='floatingInput'>Login name</label>
                    <p>{errors.loginName?.message}</p>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        autoComplete='password'
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