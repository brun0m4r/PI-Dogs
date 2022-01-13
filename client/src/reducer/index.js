import { CREATED_OR_NOT, GET_DOGS, GET_TEMPERAMENTS, ORDER_NAME, ORDER_WEIGHT_MIN, TEMPERAMENTS_DOGS, ORDER_WEIGHT_MAX, DETAILS, SEARCH_NAME } from "../actions";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        case CREATED_OR_NOT:
            const createdOrNot = action.payload === 'Created' ? state.allDogs?.filter(d => d.createdInDB === true) : state.allDogs?.filter(d => !d.createdInDB);
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : createdOrNot
            }
        case TEMPERAMENTS_DOGS:
            const { allDogs } = state;
            const temperament = action.payload === 'All' ? allDogs : allDogs.filter(d => d.temperament?.includes(action.payload));
            return {
                ...state,
                dogs: temperament
            }
        case ORDER_NAME:
            let ordered = action.payload === 'asc'
            ? state.dogs.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0;
            })
            :state.dogs.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: ordered,
            };
        case ORDER_WEIGHT_MIN:
            let weight = action.payload === 'asc'
            ? state.dogs.sort((a, b) => {
                if(a.weight_min > b.weight_min) return -1;
                if(b.weight_min > a.weight_min) return 1;
                return 0;
            })
            : state.dogs.sort((a, b) => {
                if(a.weight_min > b.weight_min) return 1;
                if(b.weight_min > a.weight_min) return -1;
                return 0;
            });

            return {
                ...state,
                dogs: action.payload === '...' ? state.allDogs : weight,
            }
        case ORDER_WEIGHT_MAX:
            const max = action.payload === 'asc'
            ? state.dogs.sort((a, b) => {
                if(a.weight_max > b.weight_max) return -1;
                if(b.weight_max > a.weight_max) return 1;
                return 0;
            })
            : state.dogs.sort((a, b) => {
                if(a.weight_max > b.weight_max) return 1;
                if(b.weight_max > a.weight_max) return -1;
                return 0;
            });
            return {
                ...state,
                dogs: max,
            }
        case DETAILS:
            return {
                ...state,
                details: action.payload,
            }
        case SEARCH_NAME:
            return {
                ...state,
                dogs: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;