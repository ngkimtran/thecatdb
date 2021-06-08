import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const url = 'https://api.thecatapi.com/v1/images/search?breed_ids='
const header = {
    method: 'get',
    headers: { 
        'x-api-key': process.env.REACT_APP_X_API_KEY,
        'Content-Type': 'application/json'
    }
}

const Cat = ({ id, name, description, origin, temperament }) => {
    
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        const getImage = async () => {
            try {
                const response = await fetch(`${url}${id}`, header);
                const data = await response.json();
        
                setImage(data[0].url)
            } catch (error) {
                console.log(error);
            }
        }

        getImage();
    }, [id]);

    
        return (
            <article className="cat">
                <div className="img-container">
                    {image!== undefined && <img src={image} alt={name} />}
                </div>
                <div className="cat-footer">
                    <h3>{name}</h3>
                    <h4>{origin}</h4>
                    <p>{description}</p>
                    <h5>{temperament}</h5>
                    <Link to={`/cat/${id}`} className="btn btn-primary btn-details">details</Link>
                </div>
            </article>
        )
    
}

export default Cat
