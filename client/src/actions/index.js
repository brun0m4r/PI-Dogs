import axios from 'axios';

export const GET_DOGS = 'GET_DOGS';
export const TEMPERAMENTS_DOGS = 'TEMPERAMENTS_DOGS';
export const CREATED_OR_NOT = 'CREATED_OR_NOT';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const ORDER_NAME = 'ORDER_NAME';
export const ORDER_WEIGHT_MIN = 'ORDER_WEIGHT_MIN';
export const POST_NEW_breed = 'POST_NEW_breed';
export const DETAILS = 'DETAILS';
export const ORDER_WEIGHT_MAX = 'ORDER_WEIGHT_MAX';
export const SEARCH_NAME = 'SEARCH_NAME';
export const DELETE_BREED = 'DELETE_BREED';

export const getDogs = () => dispatch => {
    return fetch('http://localhost:3001/dogs')
    .then(response =>  response.json())
    .then(json => dispatch({type: GET_DOGS, payload: json}))
};

export const getTemperaments = () => async dispatch => {
    const temperaments = await axios.get('http://localhost:3001/temperament')
    return dispatch({
        type: GET_TEMPERAMENTS,
        payload: temperaments.data
    });
};

export const temperamentsDogs = payload => {
    return {
        type: TEMPERAMENTS_DOGS,
        payload
    };
};


export const createdOrNot = (payload) => {
    return {
        type: CREATED_OR_NOT,
        payload
    };
};

export const orderByName = payload => {
    return {
        type: ORDER_NAME,
        payload
    };
};

export const orderByWeight = payload => {
    return {
        type: ORDER_WEIGHT_MIN,
        payload
    };
};

export const orderByWeightMax = payload => {
    return {
        type: ORDER_WEIGHT_MAX,
        payload
    }
}

export const postNewbreed = payload => async dispatch => {
    const response = await axios.post('http://localhost:3001/dogs', payload);
    return response;
};

export const breedDetail = id => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: DETAILS,
            payload: response.data,
        })
    } catch(error) {
        document.write(error);
    }
}

export const getNameDog = name => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: SEARCH_NAME,
            payload: response.data,
        });
    } catch (error) {
        return {
            type: SEARCH_NAME,
            payload: error,
        }
    }
};

export const deleteBreed = payload => async dispatch => {
    return await axios.delete('http://localhost:3001/dogs', {data: payload});
};