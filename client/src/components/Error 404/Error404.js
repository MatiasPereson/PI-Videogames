import React from 'react'
import { Link, useHistory } from 'react-router-dom';

//import style from './Error404.module.css'

function Error404() {

    const handleClick = (e) => {
        e.preventDefault();
        window.location.replace("http://localhost:3000/home");
    }
    return (
        <div >
            <h1>404 NOT FOUND</h1>
            <h2>No se encontro lo que intentaba buscar</h2>
            <Link to="/home" onClick={e => handleClick(e)}>
                <button >Volver al home</button>
            </Link>
        </div>
    )
}
export default Error404;