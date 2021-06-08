import React from 'react'

import CatList from '../components/CatList'
import SearchForm from '../components/SearchForm'

const Home = () => {
    return (
        <main>
            <SearchForm />
            <CatList />
        </main>
    )
}

export default Home
