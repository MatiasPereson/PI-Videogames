import {
    GET_ALL_VIDEOGAMES,
    GET_GENRES,
    GET_VIDEOGAME_BY_ID,
    GET_VIDEOGAMES_BY_NAME,
    GET_PLATFORMS,
    FILTER_BY_API_DB,
    FILTER_BY_AZ,
    FILTER_BY_GENRES,
    FILTER_BY_RATING,
    CREATE_VIDEOGAME,
    CLEAN_DETAIL,
    CLEAN_SEARCH,
    CLEAN_VIDEOGAMES,
    CLEAN_FILTER
} from '../actions'

const inicialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    details: [],
    search: [],
    filter: [],
    platforms: []
}

export default function rootReducer(state = inicialState, action) {
    const search = state.search;
    const videogames = state.videogames;
    const filter = state.filter
    const all = state.allVideogames;
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload,
                videogames: action.payload
            }

        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                details: action.payload
            }

        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: action.payload,
                search: action.payload
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            }

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }

        case CLEAN_VIDEOGAMES:
            return {
                ...state,
                videogames: []
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                details: [],
                search: []
            }

        case CLEAN_SEARCH:
            return {
                ...state,
                search: []
            }

        case CLEAN_FILTER:
            return {
                ...state,
                search
            }
        case CREATE_VIDEOGAME:
            return {
                ...state,
                //post: action.payload
            }

        case FILTER_BY_AZ:


            const ordenamiento = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
            return {
                ...state,
                videogames: ordenamiento,
            }

        case FILTER_BY_RATING:
            const orderByRating = action.payload === 'desc' ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    return 0;
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    return 0;
                })
            return {
                ...state,
                videogames: orderByRating
            }

        case FILTER_BY_API_DB:

            //if (!videogames.length) { return { ...state } }

            // if (filter.length) {
            //     const filtroDelFiltro =
            //         action.payload === 'db'
            //             ? filter.filter(e => e.inDB)
            //             : filter.filter(e => !e.inDB)
            //     return {
            //         ...state,
            //         videogames: action.payload === 'todos' ? filter : filtroDelFiltro
            //     }
            // }

            if (search.length) {
                const filtroSearch2 =
                    action.payload === 'db'
                        ? search.filter(e => e.inDB)
                        : search.filter(e => !e.inDB)
                return {
                    ...state,
                    videogames: action.payload === 'todos' ? search : filtroSearch2
                }
            }

            const procedencia =
                action.payload === 'db' ? all.filter(e => e.inDB) : all.filter(e => !e.inDB)
            const filtro = action.payload === 'todos' ? all : procedencia
            return {
                ...state,
                videogames: action.payload === 'todos' ? all : procedencia,
                filter: filtro
            }

        case FILTER_BY_GENRES:

            //validador
            const genFilter = (arr) => {
                let aux = arr.filter(e => e.name === action.payload)
                if (aux.length > 0) {
                    return true
                } else {
                    return false
                }
            }
            //if (!videogames.length) { return { ...state } }

            if (search.length) {
                const filtroSearch =
                    action.payload === 'all'
                        ? search
                        : search.filter(e => genFilter(e.genres))
                return {
                    ...state,
                    videogames: filtroSearch
                }
            }

            if (!filter.length) {
                const vdGenres =
                    action.payload === 'all'
                        ? all
                        : all.filter(e => genFilter(e.genres))
                return {
                    ...state,
                    videogames: vdGenres
                }
            }

            if (filter.length) {
                const vdFilter =
                    action.payload === 'all'
                        ? filter
                        : filter.filter(e => genFilter(e.genres))
                return {
                    ...state,
                    videogames: vdFilter
                }
            }

        default: return { ...state }
    }
}