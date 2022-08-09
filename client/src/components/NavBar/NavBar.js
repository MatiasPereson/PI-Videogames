import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAllVideogames, cleanSearch } from "../../actions/index";

import SearchBar from "../SearchBar/SearchBar";

//css
import '../NavBar/NavBar.css'


export default function NavBar() {

    const dispatch = useDispatch()
    const history = useHistory()

    function reset() {
        document.getElementById("orderAZ").selectedIndex = "default";
        document.getElementById("ordenProcedencia").selectedIndex = "default";
        document.getElementById("filtroGeneros").selectedIndex = "default";
        document.getElementById("filtroRating").selectedIndex = "default";
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(cleanSearch())
        dispatch(getAllVideogames());
        window.location = "http://localhost:3000/home"
        reset()
    }
    return (
        <header className="header">
            <div>
                <NavLink exact to="/home" className="link" activeClassName="active" onClick={(e) => handleClick(e)}>Home</NavLink>
            </div>
            <div>
                <NavLink exact to="/create" className="link" activeClassName="active">Crea tu propio videojuego</NavLink>
            </div>
            <div>
                <SearchBar />
            </div>
        </header>
    )
}