// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_API,
  SAVE_WALLET_FORM,
  RESPONSE_API,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
  case REQUEST_API: return {
    ...state,
    isFetching: true,
  };
  case RESPONSE_API:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case SAVE_WALLET_FORM: return {
    ...state,
    expenses: [...state.expenses, {
      id:
      state.expenses.length === 0 ? 0 : state.expenses[state.expenses.length - 1].id + 1,
      ...action.expenses.state,
      exchangeRates: action.expenses.exchangeRates,
    }],
    isFetching: false,
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: state.expenses.filter((expense) => expense.id !== action.id),
  };
  case EDIT_EXPENSE: return {
    ...state,
    idToEdit: action.id,
    editor: true,
  };
  case SAVE_EDITED_EXPENSE: return {
    ...state,
    expenses: [...action.expensesEdited],
    isFetching: false,
    editor: false,
  };
  default: return state;
  }
};

export default wallet;
