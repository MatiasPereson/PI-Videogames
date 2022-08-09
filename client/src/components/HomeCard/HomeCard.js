import React from 'react';

import '../HomeCard/HomeCard.css'

export default function HomeCard({ name, img, genres }) {

    return (
        <div className='card'>

            <div className='foto'>
                <img id="homeimg" src={img} alt="" />
            </div>

            <div className='info'>
                <h2>
                    Nombre: {name}
                </h2>
                <h4> Generos: {genres}</h4>
            </div>

        </div>
    )
}