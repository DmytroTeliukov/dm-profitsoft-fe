import {
    RECEIVE_CATEGORIES,
    REQUEST_FETCH_CATEGORIES,
    ERROR_FETCH_CATEGORIES,
} from '../constants/actionTypes';

const initialState = {
    categories: [],
    messageError: [],
};


export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES: {
            return {
                ...state,
                categories: action.payload.categories,
            }
        }
        case REQUEST_FETCH_CATEGORIES: {
            return {
                ...state,
            }
        }
        case ERROR_FETCH_CATEGORIES: {
            return {
                ...state,
                messageError: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}