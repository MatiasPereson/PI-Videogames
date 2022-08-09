import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogamesByName, cleanVideogames } from "../../actions";
import { useHistory } from "react-router-dom";

import Loader from "../Loader/Loader";


export default function SearchBar() {

    //dispatch
    const dispatch = useDispatch()

    //estados
    const history = useHistory()
    const [name, setName] = useState('')
    const [loader, setLoader] = useState(false)
    const search = useSelector(state => state.search)

    //ciclo de vida
    useEffect(() => {
        setLoader(false)
        console.log('hola')
    }, [search])

    //handlers
    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoader(true)
        dispatch(cleanVideogames())
        dispatch(getVideogamesByName(name))
        handlerReset()
    }

    function handlerReset() {
        document.getElementById("orderAZ").selectedIndex = "default";
        document.getElementById("ordenProcedencia").selectedIndex = "default";
        document.getElementById("filtroGeneros").selectedIndex = "default";
        document.getElementById("filtroRating").selectedIndex = "default";
    }

    //render
    return (
        <div>
            <div className="search">
                <input
                    className="inputSearch"
                    onChange={(e) => handleInputChange(e)}
                    type='search'
                    placeholder="Busque un videojuego..."
                    onKeyPress={(e => {
                        if (e.key === 'Enter') {
                            dispatch(cleanVideogames())
                            dispatch(getVideogamesByName(name))
                            handlerReset()
                            setLoader(true)
                        }
                    })}
                />
                <button classname="btn" type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
            <div>
                {loader === true ? <Loader /> : null}
            </div>
        </div>
    )
}