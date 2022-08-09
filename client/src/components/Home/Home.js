import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HomeCard from "../HomeCard/HomeCard"
//import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Paginado from "../Paginado/Paginado";
import Loader from "../Loader/Loader";
import Error404 from "../Error 404/Error404"

//css
import '../Home/Home.css'

import {
    getAllVideogames,
    getGenres,
    filterByApiOrDb,
    filterByAZ,
    filterByGenres,
    filterByRating,
    cleanFilter
} from '../../actions'

export default function Home() {

    //dispatch
    const dispatch = useDispatch()

    //estados globales
    const videogames = useSelector(state => state.videogames)
    const genres = useSelector(state => state.genres)

    //estados locales
    const [order, setOrder] = useState('')
    const [renderPage, setRenderPage] = useState();

    //paginado
    const [currentPage, setCurrentPage] = useState(1)   //renderiza la primera pagina
    const [videogamesXpagina, setVideogamesXpagina] = useState(15) //muestra 15 videojuegos por pagina
    const lastVideogame = currentPage * videogamesXpagina //setear el valor del ultimo videojuego de la pagina renderizada
    const firstVideogame = lastVideogame - videogamesXpagina//setear el valor del primer videojuego de la pagina renderizada
    const currentVideogames = videogames.slice(firstVideogame, lastVideogame)// dividir por paginas
    const paginado = (pgNumber) => { setCurrentPage(pgNumber) }

    //ciclo de vida
    useEffect(() => {
        dispatch(getGenres())
        dispatch(cleanFilter())
        setRenderPage(videogames);
        setCurrentPage(1);
    }, [dispatch, videogames])

    //handlers
    const handleFilterByAZ = (e) => {
        e.preventDefault()
        dispatch(filterByAZ(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado Alfabeticamente ${e.target.value}`)
    }

    const handleFilterByRating = (e) => {
        e.preventDefault()
        dispatch(filterByRating(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado Rating ${e.target.value}`)
    }

    const handleFilterByGenres = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByGenres(e.target.value))
    }

    const handleFilterByApiOrDb = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByApiOrDb(e.target.value))
    }

    //render
    return (
        <div>
            {videogames && videogames !== "No se encontro ningun videojuego" ?
                <div>
                    <NavBar></NavBar>
                    <div className="filtros">

                        <select id="orderAZ" onChange={e => handleFilterByAZ(e)}>
                            <option defaultValue="Orden alfabetico" value="default" selected="selected" hidden>-Seleccionar orden-</option>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>

                        <select id="ordenProcedencia" onChange={e => handleFilterByApiOrDb(e)}>
                            <option defaultValue="Procedencia" value="default" selected="selected" hidden>-Seleccionar procedencia-</option>
                            <option value='todos'>Todos</option>
                            <option value='db'>DataBase</option>
                            <option value='api'>API</option>
                        </select>

                        <select id="filtroGeneros" onChange={e => handleFilterByGenres(e)}>
                            <option defaultValue="Generos" value="default" selected="selected" hidden>-Seleccionar generos-</option>
                            <option value='all'>Todos</option>
                            {
                                genres?.map(gen => {
                                    return (
                                        <option key={gen.id} value={gen.name}>{gen.name}</option>
                                    )
                                })
                            }
                        </select>

                        <select id="filtroRating" onChange={e => handleFilterByRating(e)}>
                            <option defaultValue="Rating" value="default" selected="selected" hidden>-Seleccionar rating-</option>
                            <option value='asc'>Ascendente</option>
                            <option value='desc'>Descendente</option>
                        </select>

                    </div>
                    <Paginado
                        videogamesXpagina={videogamesXpagina}
                        allVideogames={videogames.length}
                        paginado={paginado}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    {
                        currentVideogames && currentVideogames.length ?
                            <div className="cards">
                                {
                                    currentVideogames.map(game => {
                                        return (
                                            <div key={game.id}>
                                                <Link to={`/home/${game.id}`}>
                                                    <HomeCard
                                                        key={game.id}
                                                        img={game.img}
                                                        name={game.name}
                                                        genres={game.genres.map(gen => gen.name).join(", ")}
                                                    />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : <Loader />
                    }
                </div> : <Error404 />
            }
        </div>
    )
}