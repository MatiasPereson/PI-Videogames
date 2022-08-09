const express = require('express');
const router = express.Router();
const getApiPlatforms = require('../controllers/getPlatforms')

router.get('/', async (req, res) => {
    const platforms = await getApiPlatforms()
    try {
        return res.status(200).json(platforms)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;