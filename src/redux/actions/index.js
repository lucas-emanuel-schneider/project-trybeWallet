// Coloque aqui suas actions
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_API_ERROR = 'GET_ERROR';
export const GET_EMAIL = 'GET_EMAIL';
export const SAVE_WALLET_FORM = 'SAVE_WALLET_FORM';

export const requestApi = () => ({ type: REQUEST_API });
export const saveWallet = (expense) => ({ type: SAVE_WALLET_FORM, expense,
});
export const responseApi = (currencies) => ({ type: RESPONSE_API, currencies });
export const getError = (error) => ({ type: GET_API_ERROR, error });
export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
});

export const fetchApi = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const result = await response.json();
    const resultWithoutUSDT = Object.keys(result).filter(
      (currency) => currency !== 'USDT',
    );
    dispatch(responseApi(resultWithoutUSDT));
  } catch (error) {
    dispatch(getError(error.message));
  }
};
