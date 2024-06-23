import axios from 'misc/requests';
import config from 'config';
import {
    RECEIVE_CATEGORIES,
    REQUEST_FETCH_CATEGORIES,
    ERROR_FETCH_CATEGORIES,
} from '../constants/actionTypes';

const receiveCategories = (categories) => ({
    payload: {categories},
    type: RECEIVE_CATEGORIES,
});

const requestCategories = () => ({
    type: REQUEST_FETCH_CATEGORIES,
});

const errorFetchCategories = (errors) => ({
    payload: errors,
    type: ERROR_FETCH_CATEGORIES,
});

const fetchCategories = () => {
    const {BACK_END_SERVICE} = config;
    return axios.get(`${BACK_END_SERVICE}/api/categories`);
};

export const fetchCategoriesData = () => (dispatch) => {
    dispatch(requestCategories());
    return fetchCategories()
        .then((response) => {
            dispatch(receiveCategories(response));
        })
        .catch((error) => {
            dispatch(errorFetchCategories(error));
        });
};

const exportFunctions = {
    fetchCategoriesData
};

export default exportFunctions;