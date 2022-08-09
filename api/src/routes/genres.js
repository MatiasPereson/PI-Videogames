const express = require('express');
const router = express.Router();
const allGenres = require('../controllers/getGenres')

router.get('/', async (req, res) => {
    const genres = await allGenres()
    try {
        return res.status(200).json(genres)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;