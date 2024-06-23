import {
  ERROR_RECEIVE_USER,
  ERROR_SIGN_IN,
  RECEIVE_USER,
  REQUEST_SIGN_IN,
  REQUEST_USER,
  SUCCESS_SIGN_IN,
} from '../constants/actionTypes';

const initialState = {
  authorities: [],
  name: '',
  email: '',
  errors: [],
  id: '',
  isAuthorized: false,
  isFailedSignIn: false,
  isFailedSignUp: false,
  isFetchingSignIn: false,
  isFetchingSignUp: false,
  isFetchingUser: false,
  lastName: '',
  login: '',
};


export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_SIGN_IN: {
      return {
        ...state,
       // errors: convertErrors(action.payload),
        isFailedSignIn: true,
        isFetchingSignIn: false,
      };
    }



    case RECEIVE_USER:
    case SUCCESS_SIGN_IN: {
      const user = action.payload;

      return {
        ...state,
        authorities: user.authorities || initialState.authorities,
        email: user.email || initialState.email,
        name: user.name || initialState.name,
        id: user.id || initialState.id,
        isAuthorized: true,
        isFetchingSignIn: false,
        isFetchingUser: false,
        lastName: user.lastName || initialState.lastName,
        login: user.login || initialState.login,
      };
    }



    case ERROR_RECEIVE_USER: {
      return initialState;
    }

    case REQUEST_SIGN_IN: {
      return {
        ...state,
        errors: initialState.errors,
        isFailedSignIn: false,
        isFetchingSignIn: true,
      }
    }

    case REQUEST_USER: {
      return {
        ...state,
        isFetchingUser: true,
      };
    }

    default: {
      return state;
    }
  }
}
