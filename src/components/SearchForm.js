import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context.js'

const SearchForm = () => {
    const { setSearchTerm } = useGlobalContext();
    const searchValue = useRef('');

    const searchCat = () => {
        setSearchTerm(searchValue.current.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        searchValue.current.focus();
    }, []);

    return (
        <section className="section search">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-control">
                    <label htmlFor="name">search your favorite cat</label>
                    <input type="text" id="name" ref={searchValue} onChange={searchCat} />
                </div>
            </form>
        </section>
    )
}

export default SearchForm
