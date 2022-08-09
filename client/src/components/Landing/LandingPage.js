import React from "react";
import { Link } from "react-router-dom";

import '../Landing/Landing.css'

export default function LandingPage() {
    return (
        <div className='fotolanding'>
            <div id="portada">
                <h1>Bienvenido a mi PI de VIDEOGAMES</h1>
                <Link to='/home'>
                    <button className="button" id="button">Acceder</button>
                </Link>
                <br></br>
            </div>
        </div>
    )
}