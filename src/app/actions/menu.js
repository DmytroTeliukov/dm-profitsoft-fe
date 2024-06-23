import axios from 'misc/requests';
import config from 'config';
import {
    ERROR_DELETE_DISH,
    ERROR_FETCH_DISHES,
    ERROR_CREATE_DISH,
    ERROR_FETCH_DISH,
    ERROR_UPDATE_DISH,
    RECEIVE_DISHES,
    RECEIVE_DISH,
    REQUEST_DELETE_DISH,
    REQUEST_FETCH_DISHES,
    REQUEST_CREATE_DISH,
    REQUEST_FETCH_DISH,
    REQUEST_UPDATE_DISH,
    SUCCESS_DELETE_DISH,
    SUCCESS_CREATE_DISH,
    SUCCESS_UPDATE_DISH,
} from '../constants/actionTypes';

const receiveDishes = ({list, totalPages}) => ({
    payload: {list: list, totalPages: totalPages},
    type: RECEIVE_DISHES,
});

const requestDishes = () => ({
    type: REQUEST_FETCH_DISHES,
});

const errorFetchDishes = (errors) => ({
    payload: errors,
    type: ERROR_FETCH_DISHES,
});

const requestDeleteDish = () => ({
    type: REQUEST_DELETE_DISH,
});

const errorDeleteDish = (errors) => ({
    payload: errors,
    type: ERROR_DELETE_DISH,
});

const successDeleteDish = (dishId) => ({
    payload: dishId,
    type: SUCCESS_DELETE_DISH,
});

const receiveDish = (dish) => ({
    payload: {dish: dish},
    type: RECEIVE_DISH,
});

const requestDish = () => ({
    type: REQUEST_FETCH_DISH,
});

const errorFetchDish = (error) => ({
    payload: error,
    type: ERROR_FETCH_DISH,
});

const requestCreateDish = () => ({
    type: REQUEST_CREATE_DISH,
});

const errorCreateDish = (error) => ({
    payload: error,
    type: ERROR_CREATE_DISH,
});

const successCreateDish = (dish) => ({
    payload: dish,
    type: SUCCESS_CREATE_DISH,
});

const requestUpdateDish = () => ({
    type: REQUEST_UPDATE_DISH,
});

const errorUpdateDish = (error) => ({
    payload: error,
    type: ERROR_UPDATE_DISH,
});

const successUpdateDish = () => ({
    type: SUCCESS_UPDATE_DISH,
});


const createDish = (dishData) => {
    const {BACK_END_SERVICE} = config;
    return axios.post(`${BACK_END_SERVICE}/api/dishes`, {
        name: dishData.name,
        description: dishData.description,
        categoryId: dishData.categoryId,
        weight: dishData.weight,
        calories: dishData.calories,
        price: dishData.price,
        ingredients: dishData.ingredients,
        dietarySpecifics: dishData.dietarySpecifics,
        cuisines: dishData.cuisines
    });
};

const fetchDishes = (categoryId, minPrice, maxPrice, page, size) => {
    const {BACK_END_SERVICE} = config;
    return axios.post(`${BACK_END_SERVICE}/api/dishes/_list`, {
        categoryId,
        minPrice,
        maxPrice,
        page,
        size
    });
};

const deleteDish = (dishId) => {
    const {BACK_END_SERVICE} = config;
    return axios.delete(`${BACK_END_SERVICE}/api/dishes/${dishId}`);
};

const fetchDishById = (dishId) => {
    const {BACK_END_SERVICE} = config;
    return axios.get(`${BACK_END_SERVICE}/api/dishes/${dishId}`);
};

const updateDishById = (dishId, dishData) => {
    const {BACK_END_SERVICE} = config;
    return axios.put(`${BACK_END_SERVICE}/api/dishes/${dishId}`, {
        name: dishData.name,
        description: dishData.description,
        weight: dishData.weight,
        calories: dishData.calories,
        price: dishData.price,
        ingredients: dishData.ingredients,
        dietarySpecifics: dishData.dietarySpecifics,
        cuisines: dishData.cuisines
    });
};

export const fetchDishesData = (categoryId,
                                minPrice,
                                maxPrice,
                                page,
                                size) => (dispatch) => {
    dispatch(requestDishes());
    return fetchDishes(categoryId,
        minPrice,
        maxPrice,
        page,
        size)
        .then((response) => {
            dispatch(receiveDishes(response));
        })
        .catch((error) => {
            dispatch(errorFetchDishes(error))
        });

};


export const createDishData = (dishData) => (dispatch) => {
    dispatch(requestCreateDish());
    return createDish(dishData)
        .then((response) => {
            dispatch(successCreateDish(response.data));
        })
        .catch((error) => {
            dispatch(errorCreateDish(error))
        });
};

export const fetchDishData = (dishId) => (dispatch) => {
    dispatch(requestDish());
    return fetchDishById(dishId)
        .then((response) => {
            dispatch(receiveDish(response));
        })
        .catch((error) => {
            dispatch(errorFetchDish(error));
        });
};

export const updateDishData = (dishId, dishData) => (dispatch) => {
    dispatch(requestUpdateDish());
    return updateDishById(dishId, dishData)
        .then(() => {
            dispatch(successUpdateDish());
        })
        .catch((error) => {
            dispatch(errorUpdateDish(error))
        });
};


export const deleteDishById = (dishId) => (dispatch) => {
    dispatch(requestDeleteDish());
    return deleteDish(dishId)
        .then(() => {
            dispatch(successDeleteDish(dishId));
        })
        .catch((error) => {
            dispatch(errorDeleteDish(error));
        });
};

const exportFunctions = {
    fetchDishesData,
    deleteDishById,
    createDishData,
    fetchDishData,
    updateDishData,
};

export default exportFunctions;
