import React from 'react'
import { useGlobalContext } from '../context'
import Loading from './Loading'
import Cat from './Cat'

const CatList = () => {
    const { cats, loading } = useGlobalContext();

    if (loading) {
        return <Loading />
    }
    if (cats.length < 1) {
        return (
            <h2 className="section-title">
                no cats found.
            </h2>
        )
    }

    return (
        <section className="section">
            <h2 className="section-title">cats</h2>
            <div className="cats-center">
                {cats.map((item) => {
                    return <Cat key={item.id} {...item} />
                })}
            </div>
        </section>
    )
}

export default CatList
