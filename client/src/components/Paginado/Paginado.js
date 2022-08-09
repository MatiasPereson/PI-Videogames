import React from "react";

import '../Paginado/Paginado.css'

export default function Paginado({ videogamesXpagina, allVideogames, paginado, currentPage }) {
    const pageNumber = []

    //Math.ceil() redondea para arriba
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesXpagina); i++) {
        pageNumber.push(i);
    }
    const renderPage = pageNumber.map((number) => { //mapea el arreglo y me devuelve un li por cada item
        return (
            <li className="number" key={number} >
                <button id={currentPage === number ? "linkActive" : "link"} href="/#" onClick={() => paginado(number)} >{number}</button>
            </li>
        )
    })
    return (
        <nav className="container">
            <ul className="paginas">
                {
                    pageNumber &&
                    renderPage
                }
            </ul>
        </nav >
    )
}