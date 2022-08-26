import axios from 'axios'
import API_URL from '../config/enviroment'

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID'
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_GENRES = 'GET_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const FILTER_BY_RATING = 'FILTER_BY_RATING'
export const FILTER_BY_AZ = 'FILTER_BY_AZ'
export const FILTER_BY_API_DB = 'FILTER_BY_API_DB'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const CLEAN_SEARCH = 'CLEAN_SEARCH'
export const CLEAN_VIDEOGAMES = 'CLEAN_VIDEOGAMES'
export const CLEAN_FILTER = 'CLEAN_FILTER'


export const getAllVideogames = () => dispatch => {
    return fetch(`${API_URL}/videogames`)
        .then(responsive => responsive.json())
        .then(videogames => dispatch({ type: GET_ALL_VIDEOGAMES, payload: videogames }))
}

export const getVideogameByID = (id) => dispatch => {
    return fetch(`${API_URL}/videogame/${id}`)
        .then(responsive => responsive.json())
        .then(videogame => dispatch({ type: GET_VIDEOGAME_BY_ID, payload: videogame }))
};

export const getVideogamesByName = (name) => dispatch => {
    return fetch(`${API_URL}/videogames?name=${name}`)
        .then(responsive => responsive.json())
        .then(videogames => dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: videogames }))
};

export const getGenres = () => dispatch => {
    return fetch(`${API_URL}/genres`)
        .then(responsive => responsive.json())
        .then(genres => dispatch({ type: GET_GENRES, payload: genres }))
};

export const getPlatforms = () => dispatch => {
    return fetch(`${API_URL}/platforms`)
        .then(responsive => responsive.json())
        .then(platforms => dispatch({ type: GET_PLATFORMS, payload: platforms }))
}

export const createVideogame = (payload) => {
    return async function (dispatch) {
        const json = await axios.post(`${API_URL}/videogames`, payload)
        return dispatch({
            type: CREATE_VIDEOGAME,
            payload: json.data
        })
    }
};

//cleaners
export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
}

export const cleanSearch = () => {
    return {
        type: CLEAN_SEARCH
    }
}

export const cleanVideogames = () => {
    return {
        type: CLEAN_VIDEOGAMES
    }
}

export const cleanFilter = () => {
    return {
        type: CLEAN_FILTER
    }
}

//filtros
export function filterByRating(payload) {
    return {
        type: FILTER_BY_RATING,
        payload,
    };
}

export function filterByAZ(payload) {
    return {
        type: FILTER_BY_AZ,
        payload,
    };
}

export function filterByApiOrDb(payload) {
    return {
        type: FILTER_BY_API_DB,
        payload,
    };
}

export function filterByGenres(payload) {
    return {
        type: FILTER_BY_GENRES,
        payload,
    };
}