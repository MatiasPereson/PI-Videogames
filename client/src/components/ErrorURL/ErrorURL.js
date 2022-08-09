import React from 'react'
import { Link } from 'react-router-dom';

//import style from './Error404.module.css'

function ErrorURL() {

    const handleClick = (e) => {
        e.preventDefault();
        window.location.replace("http://localhost:3000");
    }
    return (
        <div >
            <h1>404 NOT FOUND</h1>
            <h2>Al parecer a ingresado una URL incorrecta</h2>
            <Link to="/home" onClick={e => handleClick(e)}>
                <button >Ir hacia la Landing Page</button>
            </Link>
        </div>
    )
}
export default ErrorURL;