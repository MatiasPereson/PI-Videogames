var express = require('express');
var router = express.Router();
const axios = require('axios');
const { Videogame, Genres, Platform } = require('../db.js')
const { API_KEY } = process.env;
//const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;

const getByID = async (id) => {
    try {
        let resApi
        let gamedb
        let videogame
        //console.log(typeof(id))
        if (!isNaN(id)) {
            resApi = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
            //console.log(resApi)
            videogame = {
                id: resApi.id,
                name: resApi.name,
                released: resApi.released,
                rating: resApi.rating,
                genres: resApi.genres.map(gen => {
                    return {
                        name: gen.name
                    }
                }),
                platforms: resApi.parent_platforms.map(plat => {
                    return plat.platform.name;
                }),
                img: resApi.background_image,
                description: resApi.description_raw,
            }
            return videogame
        } else {
            gamedb = await Videogame.findByPk(id, {
                include: [
                    {
                        model: Genres,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Platform,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
            let infoDB = {
                id: gamedb.id,
                name: gamedb.name,
                img: gamedb.img,
                genres: gamedb.genres.map(gen => {
                    return {
                        name: gen.name
                    }
                }),
                description: gamedb.description,
                released: gamedb.released,
                rating: gamedb.rating,
                platforms: gamedb.platforms.map(plat => {
                    return plat.name;
                }),
                creadoPorMatias: gamedb.creadoPorMatias
            }
            return infoDB
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = getByID;