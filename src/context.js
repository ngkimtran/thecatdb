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
                        temperament
                    } = item;

                    return {
                        id,
                        name,
                        description,
                        origin,
                        temperament
                    }
                })
                setCats(newCats);
            } else {
                setCats([]);
            }
            
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchCats();
    }, [searchTerm, fetchCats]);

    return (
        <AppContext.Provider value={{loading, cats, setSearchTerm}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }