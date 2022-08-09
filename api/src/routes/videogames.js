const express = require('express');
const router = express.Router();
const { Videogame, Genres, Platform } = require('../db.js')

const { getAllVideogames } = require('../controllers/getVideogames')


//ALL VIDEOGAMES AND QUERY 
router.get('/', async (req, res) => {
    const { name } = req.query
    const all = await getAllVideogames()
    try {
        if (Object.keys(req.query).length === 0) {// si quiero todos los videojuegos
            return res.status(200).json(all)
        }
        if (!req.query.hasOwnProperty('name')) {// si la query no se llama 'name' no hago nada
            return res.status(404).json('Debe ingresar name como query')
        }
        if (!name) {// si no llega nada por query
            return res.status(404).json('Debe ingresar un videojuego por query')
        }

        //cuando ya verifique que la query es correcta hago el filtrado...
        let filtrados = all.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        if (!filtrados.length) {
            return res.status(404).json('No se encontro ningun videojuego')
        } else if (filtrados.length > 15) {
            return res.status(200).json(filtrados)//.slice(0, 15))
        } else {
            return res.status(200).json(filtrados)
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { name, description, released, rating, genres, platforms, img, inDB } = req.body

    //console.log(genres)
    try {
        const gameCreated = await Videogame.create({
            name, description, released, rating, img, inDB
        });

        const genreDB = await Genres.findAll({
            where: {
                name: genres
            }
        });

        const platformDB = await Platform.findAll({
            where: {
                name: platforms
            }
        })


        await gameCreated.addGenre(genreDB);
        await gameCreated.addPlatform(platformDB)

        return res.status(200).json(gameCreated)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;