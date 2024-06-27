import axios from 'misc/requests';
import config from 'config';
import storage, { keys } from 'misc/storage';
import {
  RECEIVE_USER,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_USER,
} from '../constants/actionTypes';

const receiveUser = (user) => ({
  payload: user,
  type: RECEIVE_USER,
});

const requestUser = () => ({
  type: REQUEST_USER,
});
const requestSignIn = () => ({
  type: REQUEST_SIGN_IN,
});
const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const getUser = () => {
  const {
    BACK_END_SERVICE,
  } = config;
  axios.defaults.withCredentials = true;
  return axios.get(`${BACK_END_SERVICE}/api/profile`);
};

const signIn = () => {
  const {
    BACK_END_SERVICE,
  } = config;
  window.location.href = `${BACK_END_SERVICE}/oauth/authenticate`;
  return axios.get(`${BACK_END_SERVICE}/oauth/authenticate`);
};

const fetchSignIn = () => (dispatch) => {
  dispatch(requestSignIn());
  return signIn()
};

const fetchSignOut = () => (dispatch) => {
  storage.removeItem(keys.TOKEN);
  storage.removeItem(keys.TOKEN_EXPIRATION);
  storage.removeItem('USER'); // TODO: Mocked code
  dispatch(requestSignOut());
};

const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return getUser()

    .then(user => dispatch(receiveUser(user)))
    .catch(() => dispatch(fetchSignOut()));
};

const exportFunctions = {
  fetchSignIn,
  fetchSignOut,
  fetchUser,
};

export default exportFunctions;
