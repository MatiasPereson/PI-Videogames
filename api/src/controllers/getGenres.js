const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;

const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const allGenres = async () => {
    const info = (await axios.get(url)).data.results
    const genres = info.map(e => e.name)
    genres.map(g => {
        Genres.findOrCreate({
            where: { name: g }
        })
    })
    return Genres.findAll()
}

module.exports = allGenres;