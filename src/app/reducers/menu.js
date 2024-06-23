import {
    ERROR_DELETE_DISH,
    ERROR_CREATE_DISH,
    ERROR_UPDATE_DISH,
    RECEIVE_DISHES,
    RECEIVE_DISH,
    REQUEST_FETCH_DISHES,
    SUCCESS_DELETE_DISH,
    SUCCESS_CREATE_DISH,
    SUCCESS_UPDATE_DISH,
} from "../constants/actionTypes"


const initialState = {
    dishes: [],
    dish: {name: '',
        description: '',
        price: 0,
        weight: 0,
        calories: 0,
        category: { id: '', name: '' },
        ingredients: [],
        cuisines: [],
        dietarySpecifics: []},
    filter: {
        categoryId: 0,
        minPrice: undefined,
        maxPrice: undefined
    },
    messageErrors: [],
    totalPages: 1,
    isFetchingDishes: false,
    isFailedDeletingDish: false,
    isFailedCreatingDish: false,
    isFailedUpdatingDish: false,
    isFailedFetchingDish: false,
    isFailedFetchingDishes: false,
};

const convertErrors = errors => errors.map(error => ({
    code: error.code,
    description: error.description,
}));

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_DELETE_DISH: {
            return {
                ...state,
                messageErrors: convertErrors(action.payload),
                isFailedDeletingDish: true,
            };
        }
        case ERROR_CREATE_DISH: {
            return {
                ...state,
                messageErrors: convertErrors(action.payload),
                isFailedCreatingDish: true,
            };
        }
        case ERROR_UPDATE_DISH: {
            return {
                ...state,
                messageErrors: convertErrors(action.payload),
                isFailedCreatingDish: true,
            };
        }

        case RECEIVE_DISHES: {
            const { list, totalPages } = action.payload;

            return {
                ...state,
                isFetchingDishes: false,
                dishes: list,
                totalPages: totalPages,
            }
        }

        case SUCCESS_DELETE_DISH: {
            return {
                ...state,
                messageErrors: initialState.messageErrors,
                isFailedDeletingDish: false,
            }
        }

        case SUCCESS_CREATE_DISH: {
            return {
                ...state,
                messageErrors: initialState.messageErrors,
                isFailedCreateDish: false,
            }
        }

        case SUCCESS_UPDATE_DISH: {
            console.log("Success reducer")
            return {
                ...state,
                isFailedUpdatingDish: false,
            }
        }

        case RECEIVE_DISH: {
            const {dish} = action.payload

            return {
                ...state,
                dish: dish,
            }
        }

        case REQUEST_FETCH_DISHES: {
            return {
                ...state,
                filter: action.payload,
                isFetchingDishes: true,
            }
        }

        default: {
            return state;
        }
    }
}