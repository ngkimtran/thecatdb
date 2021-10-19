import React, { useRef, useEffect } from 'react'
import { useGlobalContext } from '../context.js'


const SearchForm = () => {
    const { filterParam, level, setSearchTerm, setFilterParam, setLevel } = useGlobalContext();
    const searchValue = useRef('');

    useEffect(() => {
        searchValue.current.focus();
    }, []);

    const searchCat = () => {
        setSearchTerm(searchValue.current.value);
    }

    const handleFilter = (e) => {
        setFilterParam(e.target.value)
    }

    const handleLevel = (e) => {
        setLevel(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className="section search">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-control">
                    <label htmlFor="name">search your favorite cat</label>
                    <input type="text" id="name" ref={searchValue} onChange={searchCat} />
                </div>
            </form>
            
            <div className="filter-wrapper" >
                <select onChange={handleFilter} className="filter-form" >
                    <optgroup>
                        <option value="all">Filter</option>
                        <option value="adaptability">Adaptability</option>
                        <option value="affection_level">Affection Level</option>
                        <option value="child_friendly">Child Friendly</option>
                        <option value="dog_friendly">Dog Friendly</option>
                        <option value="energy_level">Energy Level</option>
                        <option value="grooming">Grooming</option>
                        <option value="health_issues">Health Issues</option>
                        <option value="intelligence">Intelligence</option>
                        <option value="shedding_level">Shedding Level</option>
                        <option value="social_needs">Social Needs</option>
                        <option value="stranger_friendly">Stranger Friendly</option>
                        <option value="vocalisation">Vocalisation</option>
                    </optgroup>
                </select>

                <div className={`filter-level ${filterParam === 'all' ? 'disabled' : ''} `}>
                    <label htmlFor="level">Level</label>
                    <div>
                        <input type="range" id="level" min="1" max="5" value={level} onChange={handleLevel}  />
                        <span>{level}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchForm
