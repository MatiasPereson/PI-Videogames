const express = require('express');
const router = express.Router();
const { Videogame } = require('../db.js')

const getByID = require('../controllers/getByID')


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const videogame = await getByID(id);
    //console.log(videogame)
    if (!videogame) {
        return res.status(400).json('Videojuego no encontrado');
    }
    return res.status(200).json(videogame);
});

module.exports = router;