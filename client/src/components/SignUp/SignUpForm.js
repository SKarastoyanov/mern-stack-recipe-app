import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import { PATHS, ROLES, STATUS } from '../../Constants';
import { addUser, updateUser } from '../../state/actions/userActions';
import './style.css'


const newUser = {
    userId: '',
    firstName: '',
    lastName: '',
    loginName: '',
    password: '',
    gender: '',
    role: ROLES.SOUS_CHEF,
    img: '',
    introduction: '',
    userStatus: STATUS.ACTIVE,
    ownRecipes: [],
    favourites: [],
    registrationDate: new Date(),
    modified: new Date()
}


const SignUpForm = ({ userToEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userState, setUserState] = useState(userToEdit || newUser);
    const [isPassCorrect, setIsPassCorrect] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors, isDirty, isValid }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            loginName: '',
            password: '',
            gender: 'Select',
            role: ROLES.SOUS_CHEF,
            img: '',
            introduction: '',
            userStatus: STATUS.ACTIVE,
            ownRecipes: [],
            favourites: [],
            registrationDate: new Date(),
            modified: new Date()
        }
    });

    console.log('userToEdit in SP: ', userToEdit)

    const setFormValues = (userToEdit) => {
        setIsPassCorrect(true);
        setValue('firstName', userToEdit.firstName, { shouldDirty: true, shouldValidate: true });
        setValue('lastName', userToEdit.lastName, { shouldDirty: true, shouldValidate: true });
        setValue('loginName', userToEdit.loginName, { shouldDirty: true, shouldValidate: true });
        setValue('password', userToEdit.password, { shouldDirty: true, shouldValidate: true });
        setValue('gender', userToEdit.gender, { shouldDirty: true, shouldValidate: true });
        setValue('role', userToEdit.role, { shouldDirty: true, shouldValidate: true });
        setValue('img', userToEdit.img, { shouldDirty: true, shouldValidate: true });
        setValue('introduction', userToEdit.introduction, { shouldDirty: true, shouldValidate: true });
    }

    const submitForm = (data) => {
        if (!userToEdit) {
            data.img === '' && data.gender === 'Male' ?
                data.img = require('../../assets/male-avatar.jpg') :
                data.img = require('../../assets/female-avatar.jpg')
            dispatch(addUser(data));
            navigate(PATHS.LOGIN_FORM);
        } else {
            dispatch(updateUser(userToEdit._id, data))
            navigate(PATHS.RECIPE_COLLECTION);
        }
    };

    const handleReset = () => {
        setUserState({ ...newUser });
        setIsPassCorrect(false);
    }

    const validatePassword = (event) => {
        const userValue = event.target.value;

        const checkPasswordValidation = (value) => {

            if (value === '') {
                setIsPassCorrect(false)
                return 'Password';
            }

            const isWhitespace = /^(?=.*\s)/;
            if (isWhitespace.test(value)) {
                setIsPassCorrect(false)
                return 'Password must not contain Whitespaces.';
            }

            const isContainsUppercase = /^(?=.*[A-Z])/;
            if (!isContainsUppercase.test(value)) {
                setIsPassCorrect(false)
                return 'Password must have at least one Uppercase Character.';
            }

            const isContainsLowercase = /^(?=.*[a-z])/;
            if (!isContainsLowercase.test(value)) {
                setIsPassCorrect(false)
                return 'Password must have at least one Lowercase Character.';
            }

            const isContainsNumber = /^(?=.*[0-9])/;
            if (!isContainsNumber.test(value)) {
                setIsPassCorrect(false)
                return 'Password must contain at least one Digit.';
            }

            const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;''<>,.?/_₹])/;
            if (!isContainsSymbol.test(value)) {
                setIsPassCorrect(false)
                return 'Password must contain at least one Special Symbol.';
            }

            const isValidLength = /^.{8,}$/;
            if (!isValidLength.test(value)) {
                setIsPassCorrect(false)
                return 'Password must be at least 8 Characters Long.';
            }

            if (value !== '') {
                setIsPassCorrect(true)
                return 'Password Correct!'
            }

        }

        document.getElementById('passHelp').textContent = checkPasswordValidation(userValue)
    };

    useEffect(() => {
        if (userToEdit) {
            setFormValues(userToEdit)
        }
    }, [])

    return (
        <form onSubmit={handleSubmit(submitForm)} onReset={handleReset}>
            <div className='sign-up-form-container'>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='First Name'
                        {...register('firstName', { required: true, maxLength: 20 })} />
                    <label htmlFor='floatingInput'>First Name</label>
                    <p>{errors.firstName?.message}</p>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Last Name'
                        {...register('lastName', { required: true, maxLength: 20 })} />
                    <label htmlFor='floatingInput'>Last Name</label>
                    <p>{errors.lastName?.message}</p>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Login name'
                        {...register('loginName', { required: true, pattern: /^[A-Za-z]+$/i, maxLength: 15 })} />
                    <label htmlFor='floatingInput'>Login name</label>
                    <p>{errors.loginName?.message}</p>
                </div>
                <div className='form-floating mb-3'>
                    <input id='passInput'
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        {...register('password', { required: true })}
                        onChange={validatePassword} />
                    <label id='passHelp' htmlFor='floatingInput'>Password</label>
                </div>
                <div className='form-floating mb-3'>
                    <select
                        id='gender'
                        className='form-control'
                        {...register('gender',
                            { required: true })}>
                        <option value='Select'>Select</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                    <label htmlFor='floatingInput'>Gender</label>
                </div>
                <div className='form-floating mb-3'>
                    <select
                        id='role'
                        className='form-control'
                        {...register('role',
                            { required: true })}>
                        <option value='Select'>Select</option>
                        <option value='Chef'>Chef</option>
                        <option value='Sous Chef'>Sous Chef</option>
                    </select>
                    <label htmlFor='floatingInput'>Role</label>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='url'
                        className='form-control'
                        placeholder='Picture'
                        {...register('img')} />
                    <label htmlFor='floatingInput'>Add picture</label>
                    <p>{errors.img?.message}</p>
                </div>
                <div className='form-floating mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Describe Yourself'
                        {...register('introduction', { required: true, maxLength: 512 })} />
                    <label htmlFor='floatingInput'>Describe Yourself</label>
                    <p>{errors.introduction?.message}</p>
                </div>
                <div className='Form-button-panel'>
                    <button
                        disabled={!isDirty || !isValid || !isPassCorrect}
                        className='sing-up-btn btn btn-success'
                        type='submit'
                        name='submit'
                    > Submit
                    </button>
                    <button
                        className='sing-up-btn btn btn-danger'
                        type='reset'
                        name='reset'
                    >Reset
                    </button>
                </div>
            </div>
        </form>
    )
}
SignUpForm.propTypes = {
    user: PropTypes.shape({
        userId: PropTypes.number,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        loginName: PropTypes.string.isRequired,
        passwod: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        role: PropTypes.oneOf([ROLES.CHEF, ROLES.SOUS_CHEF]),
        img: PropTypes.string.isRequired,
        introduction: PropTypes.string.isRequired,
        userStatus: PropTypes.oneOf([STATUS.ACTIVE, STATUS.SUSPENDED]),
        registrationDate: PropTypes.instanceOf(Date),
        modified: PropTypes.instanceOf(Date)
    })
}

export default SignUpForm