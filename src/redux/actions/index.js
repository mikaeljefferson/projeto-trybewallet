export const ADD_LOGIN_USER = 'ADD_LOGIN_USER';
export const SEARCH_CURRENCIES = 'SEARCH_CURRENCIES';
export const addPersonalInfo = (value) => ({
  type: ADD_LOGIN_USER,
  payload: value,
});
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const objKeys = (obj) => Object.keys(obj);
export const searchCurrencies = (currencies) => ({
  type: SEARCH_CURRENCIES,
  payload: objKeys(currencies).filter((currency) => currency !== 'USDT'),
});

export const currencyApi = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(searchCurrencies(data)))
    .catch((error) => console.log(error));
};
export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});

export const saveExpensesForm = (expenseInfos) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => { delete data.USDT; return data; })
    .then((data) => dispatch(saveExpenses({ ...expenseInfos, exchangeRates: data })))
    .catch((error) => console.log(error));
};

export const deleteAndUpdateExpense = (payload) => ({
  type: 'DELETE_AND_UPDATE_EXPENSE',
  payload,
});
