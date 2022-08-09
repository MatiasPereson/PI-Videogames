const post = async (genres) => {
    let genresDB;
    let allGenres;
    allGenres = genres.map(g => {
        genresDB = await Genres.findAll({
            where: { name: g }
        })
        await vdCreado.addGenres(genresDB)
    })

}

module.exports = post;