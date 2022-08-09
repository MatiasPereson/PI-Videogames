const axios = require("axios");
const { Videogame, Genres, Platform } = require("../db");
const { API_KEY } = process.env;

const url = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getApiGames = async () => {
    const urls = [url]
    const promXpages = []
    let info
    let resp
    for (let i = 2; i <= 5; i++) {
        urls.push(url + '&page=' + i)
    }
    for (let i = 0; i < 5; i++) {
        promXpages.push(axios.get(urls[i]))
    }
    info = await Promise.all(promXpages)
    resp = info.map(e => e.data.results)

    //RESPUESTA FINAL
    return resp.flat().map(e => {
        return ({
            id: e.id,
            name: e.name,
            img: e.background_image,
            genres: e.genres.map(gen => {
                return {
                    id: gen.id,
                    name: gen.name
                }
            }),
            rating: e.rating,
            platforms: e.parent_platforms.map(elem => {
                return {
                    id: elem.platform.id,
                    name: elem.platform.name
                }
            })
        })
    })
}

const getDBGames = async () => {
    return await Videogame.findAll({
        include: [{
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
        }]
    })
}

const getAllVideogames = async () => {
    const apiGames = await getApiGames();
    const dbGames = await getDBGames();
    const allGames = apiGames.concat(dbGames);
    return allGames
}

module.exports = {
    getAllVideogames,
    getApiGames
};