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
import {mockCategories, mockDishes} from "../constants/mockdata";

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

const successUpdateDish = (dish) => ({
    payload: {dish: dish},
    type: SUCCESS_UPDATE_DISH,
});


const createDish = (dishData) => {
    const { DISHES_SERVICE } = config;
    return axios.post(`${DISHES_SERVICE}/api/dishes`, {
        name: dishData.name,
        description: dishData.description,
        categoryId: dishData.categoryId,
        weight: dishData.weight,
        calories: dishData.calories,
        price: dishData.price,
        ingredients: dishData.ingredients,
        dietarySpecifics: dishData.dietarySpecifics,
        cuisines: dishData.cuisines});
};

const fetchDishes = (categoryId, minPrice, maxPrice, page, size) => {
    const { DISHES_SERVICE } = config;
    return axios.post(`${DISHES_SERVICE}/api/dishes/_list`, {
        categoryId,
        minPrice,
        maxPrice,
        page,
        size
    });
};

const deleteDish = (dishId) => {
    const { DISHES_SERVICE } = config;
    return axios.delete(`${DISHES_SERVICE}/api/dishes/${dishId}`);
};

const fetchDishById = (dishId) => {
    const { DISHES_SERVICE } = config;
    return axios.get(`${DISHES_SERVICE}/api/dishes/${dishId}`);
};

const updateDishById = (dishId, dishData) => {
    const { DISHES_SERVICE } = config;
    return axios.put(`${DISHES_SERVICE}/api/dishes/${dishId}`, {
        name: dishData.name,
        description: dishData.description,
        categoryId: dishData.categoryId,
        weight: dishData.weight,
        calories: dishData.calories,
        price: dishData.price,
        ingredients: dishData.ingredients,
        dietarySpecifics: dishData.dietarySpecifics,
        cuisines: dishData.cuisines});
};

export const fetchDishesData = (categoryId,
                                minPrice,
                                maxPrice,
                                page,
                                size) => (dispatch) => {
    dispatch(requestDishes());
        // TODO Mocked '.catch()' section
        return fetchDishes(categoryId,
            minPrice,
            maxPrice,
            page,
            size)
            .then((response) => {
                dispatch(receiveDishes(response));
            })
            .catch((error) => {
                // dispatch(errorFetchDishes(error));
                const response = paginateMockDishes(categoryId,
                    minPrice,
                    maxPrice,
                    page,
                    size);

                dispatch(receiveDishes(response));
            });

};


export const createDishData = (dishData) => (dispatch) => {
    dispatch(requestCreateDish());
// TODO Mocked '.catch()' section
    return createDish(dishData)
        .then((response) => {
            dispatch(successCreateDish(response.data));
        })
        .catch((error) => {

            const maxId = Math.max(...mockDishes.map(dish => dish.id));

            const nextId = maxId + 1;
            console.log("Create")
            console.log({
                id: nextId,
                name: dishData.name,
                description: dishData.description,
                category: mockCategories[dishData.categoryId - 1],
                weight: dishData.weight,
                calories: dishData.calories,
                price: dishData.price,
                ingredients: dishData.ingredients,
                dietarySpecifics: dishData.dietarySpecifics,
                cuisines: dishData.cuisines
            })
            mockDishes.push({
                id: nextId,
                name: dishData.name,
                description: dishData.description,
                category: mockCategories[dishData.categoryId - 1],
                weight: Number(dishData.weight),
                calories: Number(dishData.calories),
                price: Number(dishData.price),
                ingredients: dishData.ingredients,
                dietarySpecifics: dishData.dietarySpecifics,
                cuisines: dishData.cuisines
            });

            dispatch(successCreateDish())
            // dispatch(errorCreateDish(error));
        });
};

export const fetchDishData = (dishId) => (dispatch) => {
    dispatch(requestDish());
    // TODO Mocked '.catch()' section
    return fetchDishById(dishId)
        .then((response) => {
            dispatch(receiveDish(response));
        })
        .catch((error) => {
            // dispatch(errorFetchDish(error));
            let foundDish = mockDishes.find((dish) => {
                return dish.id === Number(dishId)
            })
            if (foundDish) {
                dispatch(receiveDish(foundDish))
            } else {
                dispatch(errorFetchDish(error))
            }
        });
};

export const updateDishData = (dishId, dishData) => (dispatch) => {
    dispatch(requestUpdateDish());
    // TODO Mocked '.catch()' section
    return updateDishById(dishId, dishData)
        .then((response) => {
            console.log(response)
            dispatch(successUpdateDish({
                id: Number(dishId),
                name: dishData.name,
                description: dishData.description,
                category: mockCategories[dishData.categoryId - 1],
                weight: Number(dishData.weight),
                calories: Number(dishData.calories),
                price: Number(dishData.price),
                ingredients: dishData.ingredients,
                dietarySpecifics: dishData.dietarySpecifics,
                cuisines: dishData.cuisines
            }));
        })
        .catch((error) => {
            // dispatch(errorUpdateDish(error));

            let foundDishIdx = mockDishes.findIndex((dish) => {
                return dish.id === Number(dishId)
            })

            if (foundDishIdx !== -1) {
                const updatedDishData = {
                    id: Number(dishId),
                    name: dishData.name,
                    description: dishData.description,
                    category: mockCategories[dishData.categoryId - 1],
                    weight: Number(dishData.weight),
                    calories: Number(dishData.calories),
                    price: Number(dishData.price),
                    ingredients: dishData.ingredients,
                    dietarySpecifics: dishData.dietarySpecifics,
                    cuisines: dishData.cuisines
                }
                mockDishes[foundDishIdx] = updatedDishData
                dispatch(successUpdateDish(updatedDishData))
            } else {
                dispatch(errorUpdateDish(error))
            }
        });
};


export const deleteDishById = (dishId) => (dispatch) => {
    dispatch(requestDeleteDish());
    // TODO Mocked '.catch()' section
    return deleteDish(dishId)
        .then(() => {
            dispatch(successDeleteDish(dishId));
        })
        .catch((error) => {
            const dishToDeleteIndex = mockDishes.findIndex(dish => dish.id === dishId);
            if (dishToDeleteIndex !== null) {
                mockDishes.splice(dishToDeleteIndex, 1); // Remove 1 element at the specified index
                dispatch(successDeleteDish(dishId));
            } else {
                dispatch(errorDeleteDish(error))
            }
        });
};


// Function for paginating mock dishes
function paginateMockDishes(categoryId, minPrice, maxPrice, page, size) {
    let filteredDishes = mockDishes;

    page += 1

    if (categoryId) {
        filteredDishes = filteredDishes.filter(dish => dish.category.id === categoryId);
    }
    if (minPrice !== undefined) {
        filteredDishes = filteredDishes.filter(dish => dish.price >= minPrice);
    }
    if (maxPrice !== undefined) {
        filteredDishes = filteredDishes.filter(dish => dish.price <= maxPrice);
    }

    const totalItems = filteredDishes.length;
    const totalPages = Math.ceil(totalItems / size);
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedDishes = filteredDishes.slice(startIndex, endIndex);


    return {
        list: paginatedDishes,
        totalPages: totalPages
    };
}


const exportFunctions = {
    fetchDishesData,
    deleteDishById,
    createDishData,
    fetchDishData,
    updateDishData,
};

export default exportFunctions;
