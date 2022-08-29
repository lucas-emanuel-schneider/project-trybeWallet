// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case GET_EMAIL: return {
    ...state,
    email: action.email,
  };
  default: return state;
  }
};

export default user;
