// Coloque aqui suas actions
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_API_ERROR = 'GET_ERROR';
export const GET_EMAIL = 'GET_EMAIL';
export const SAVE_WALLET_FORM = 'SAVE_WALLET_FORM';
export const RESPONSE_API_FULL = 'RESPONSE_API_FULL';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const requestApi = () => ({ type: REQUEST_API });
export const saveWallet = (expenses) => ({ type: SAVE_WALLET_FORM, expenses,
});
export const deleteExpenseAction = (id) => ({ type: DELETE_EXPENSE, id });
export const responseApi = (currencies) => ({ type: RESPONSE_API, currencies });
export const getError = (error) => ({ type: GET_API_ERROR, error });
export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
});

export const fetchApi = (isExchangeRates = false, expenses) => async (dispatch) => {
  dispatch(requestApi());
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const result = await response.json();
    if (isExchangeRates) {
      dispatch(saveWallet({ state: { ...expenses }, exchangeRates: result }));
    } else {
      const resultWithoutUSDT = Object.keys(result).filter(
        (currency) => currency !== 'USDT',
      );
      dispatch(responseApi(resultWithoutUSDT));
    }
  } catch (error) {
    console.log(error);
    dispatch(getError(error.message));
  }
};
