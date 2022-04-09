import { useForm } from 'react-hook-form'
import './style.css'

const LoginForm = ({ onSubmitLogin }) => {
    const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            loginName: '',
            password: ''
        }
    })

    const submitLoginForm = (data) => {
        // console.log(data)
        onSubmitLogin(data);
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
                        {...register('password', { required: true })}/>
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