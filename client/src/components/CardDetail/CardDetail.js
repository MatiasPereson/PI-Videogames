import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogameByID } from "../../actions";
//import { Link } from 'react-router-dom';
import { cleanDetail } from "../../actions";

import Loader from "../Loader/Loader";
import NavBar from "../NavBar/NavBar";

import style from '../CardDetail/CardDetail.module.css'

export default function CardDetail(props) {



    const dispatch = useDispatch()
    const { id } = props.match.params
    //console.log(props)

    useEffect(() => {
        dispatch(getVideogameByID(id))
        return () => {
            dispatch(cleanDetail())
        }
    }, [dispatch, id])

    const details = useSelector(state => state.details)
    console.log(details)


    return (
        <div>
            {
                details.length !== 0 ?
                    <div>
                        <NavBar />
                        <div className={style.detail}>

                            <div className={style.fotodetail}>
                                <img src={details.img} alt="" />
                            </div>

                            <div className={style.info}>
                                <h1>
                                    Nombre: {details.name}
                                </h1>
                                <p> Creada por Matias: {details.creadoPorMatias}</p>
                                <p> ID: {details.id}</p>
                                <p> Lanzamiento: {details.released}</p>
                                Rating: {details.rating}
                                <br></br>
                                <br></br>
                                Generos: {details.genres?.map(g => {
                                    return (
                                        <div>{g.name}</div>
                                    )
                                })}
                                <br></br>
                                Plataformas: {details.platforms?.map(p => {
                                    return (
                                        <div>{p}</div>
                                    )
                                })}
                                <br></br>
                                Descripcion:
                                <br></br>
                                <br></br>
                                {details.description}
                                <br></br>
                            </div>
                        </div>
                    </div> : <Loader />
            } </div>
    )
}