import React, { useState, useEffect, useContext, useCallback } from 'react'

const url = 'https://api.thecatapi.com/v1/breeds/search?q='
const header = {
    method: 'get',
    headers: { 
        'x-api-key': process.env.REACT_APP_X_API_KEY,
        'Content-Type': 'application/json'
    }
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('a');
    const [cats, setCats] = useState([]);
    const [filterParam, setFilterParam] = useState('all');
    const [level, setLevel] = useState(1);

    if(searchTerm === '') {
        setSearchTerm('a');
    }

    const fetchCats = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${url}${searchTerm}`, header);
            const data = await response.json();

            if (data) {
                const newCats = data.map((item) => {
                    const {
                        id,
                        name,
                        description,
                        origin,
                        temperament,
                    // personality 
                        adaptability,
                        affection_level,
                        child_friendly,
                        dog_friendly,
                        energy_level,
                        grooming,
                        health_issues,
                        intelligence,
                        shedding_level,
                        social_needs,
                        stranger_friendly,
                        vocalisation
                    } = item;

                    return {
                        id,
                        name,
                        description,
                        origin,
                        temperament,
                        adaptability,
                        affection_level,
                        child_friendly,
                        dog_friendly,
                        energy_level,
                        grooming,
                        health_issues,
                        intelligence,
                        shedding_level,
                        social_needs,
                        stranger_friendly,
                        vocalisation
                    }
                })
                if (filterParam === 'all') {
                    setCats(newCats);
                }
                else {
                    setCats(newCats.filter((cat) => {
                        return cat[filterParam] === Number(level)
                    }
                    ))
                }
            } else {
                setCats([]);
            }
            
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [filterParam, level, searchTerm]);

    useEffect(() => {
        fetchCats();
    }, [filterParam, searchTerm, fetchCats]);

    return (
        <AppContext.Provider value={{loading, cats, level, filterParam, setSearchTerm, setFilterParam, setLevel}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }