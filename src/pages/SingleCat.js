import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'

const url = 'https://api.thecatapi.com/v1/breeds/'
const image_url = 'https://api.thecatapi.com/v1/images/'
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
    const [image, setImage] = useState(null);
    

    useEffect(() => {
        const getCat = async () => {
            setLoading(true);

            try {
                const response = await fetch(`${url}${id}`, header);
                const data = await response.json();
                
                if(data) {
                    const { 
                        name, 
                        description,
                        origin, 
                        temperament, 
                        life_span, 
                        wikipedia_url,
                        reference_image_id
                    } = data;

                    const newCat = {
                        name, 
                        description,
                        origin, 
                        temperament, 
                        life_span, 
                        wikipedia_url,
                    };

                    const image_response = await fetch(`${image_url}${reference_image_id}`, header);
                    const image_data = await image_response.json();

                    setCat(newCat);
                    setImage(image_data);
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
        return (
            <section className="section cat-section">
                <Link to="/" className="btn btn-primary">back home</Link>

                <h2 className="section-title">{name}</h2>
                <div className="breed">
                    <img src={image.url} alt={image.breeds[0].name} />

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
