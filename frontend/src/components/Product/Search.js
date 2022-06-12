import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        }
        else {
            navigate(`/products`)
        }
    }

    return (
        <div className='container searchContainer'>
            <form onSubmit={searchSubmitHandler}>
                <input className='searchField' type="text"
                    placeholder='Search a Product..'
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className='searchBtn' type='submit'>Search</button>
            </form>
            
        </div>
    )
}

export default Search