// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_USER:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
