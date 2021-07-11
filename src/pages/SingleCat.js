import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

const url = 'https://api.thecatapi.com/v1/images/search?breed_ids='
const header = {
    method: 'get',
    headers: { 
        'x-api-key': process.env.REACT_APP_X_API_KEY,
        'Content-Type': 'application/json'
    }
}

const SingleCat = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [cat, setCat] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${url}${id}`, header);
                const data = await response.json();

                if(data[0].breeds) {
                    const { 
                        name, 
                        description,
                        origin, 
                        temperament, 
                        life_span, 
                        wikipedia_url
                    } = data[0].breeds[0];

                    const newCat = {
                        name, 
                        description,
                        origin, 
                        temperament, 
                        life_span, 
                        wikipedia_url
                    };

                    setCat(newCat);
                    setImages(data);
                } else {
                    setCat(null);
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        getCat();
    }, [id]);

    if(loading) {
        return <Loading />
    }
    if(!cat) {
        return (
            <section className="section cat-section">
                <h2 className="section-title">no cat to display</h2>
                <Link to="/thecatdb/" className="btn btn-primary">back home</Link>
            </section>
        )
    }
    else {
        const {
            name, 
            description,
            origin, 
            temperament, 
            life_span, 
            wikipedia_url
        } = cat;
        console.log(images);
        return (
            <section className="section cat-section">
                <Link to="/thecatdb/" className="btn btn-primary">back home</Link>

                <h2 className="section-title">{name}</h2>
                <div className="breed">
                    {images.map((item, index) => 
                        <img key={index} src={item.url} alt={name} />
                    )}

                    <div className="breed-info">
                        <p>
                            <span className="breed-data">name:</span>
                            {name}
                        </p>
                        <p>
                            <span className="breed-data">origin:</span>
                            {origin}
                        </p>
                        <p>
                            <span className="breed-data">description:</span>
                            {description}
                        </p>  
                        <p>
                            <span className="breed-data">life span:</span>
                            {life_span}
                        </p>
                        <p>
                            <span className="breed-data">temperament:</span>
                            {temperament}
                        </p>
                        <button className="btn btn-primary btn-details">
                            <a href={wikipedia_url} target="_blank" rel="noreferrer">wikipedia</a>
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}

export default SingleCat
