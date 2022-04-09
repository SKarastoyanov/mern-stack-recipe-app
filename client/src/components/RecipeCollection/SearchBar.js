import axios from 'axios';
import { useForm } from 'react-hook-form';

import { API_BASE_URL } from '../../Constants';
import './style.css'

const SearchBar = ({ setSearchResults }) => {
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            input: ''
        }
    })

    const submitForm = (data) => {
        const input = data.input.trim();
        axios.get(`${API_BASE_URL}/api/recipes?title=${input}`)
            .then(res => {
                setSearchResults(res.data)
            })
            .catch(error => console.log('Fetching Recipes Error: ', error))
    }

    return (
        <div className='main'>
            <div id='search-field'>
                <div className='search-by-name'>
                    <p>You can search by typing keyword in search field</p>
                </div>
                <div className='search'>
                    <div className='navbar navbar-light bg-light'>
                        <form className='form-inline' onSubmit={handleSubmit(submitForm)}>
                            <input
                                className='form-control mr-sm-2'
                                type='search'
                                placeholder='Search in recipes'
                                aria-label='Search'
                                {...register('input')}
                            />
                            {/* <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button> */}
                        </form>
                    </div>
                </div>
                <div className='search-by-ingredients'>
                    <p>Or if you have some ingredients and are wondering how to use them,
                        type them here one by one and press enter after each one.</p>
                </div>
            </div>
        </div>
    )
}

export default SearchBar