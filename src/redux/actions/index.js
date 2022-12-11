export const ADD_LOGIN_USER = 'ADD_LOGIN_USER';
export const SEARCH_CURRENCIES = 'SEARCH_CURRENCIES';
export const addPersonalInfo = (value) => ({
  type: ADD_LOGIN_USER,
  payload: value,
});

// export function getCurrencies() {
//   return async (dispatch) => {
//     try {
//       const result = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await result.json();
//       const currencies = Object.entries(data).map((item) => item[0])
//         .filter((item) => item !== 'USDT');
//       dispatch(sucessRequest(currencies));
//     } catch (error) {
//       dispatch(failedRequest(error));
//     }
//   };
// }
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

export const saveExpense = ({
  valueInput,
  descriptionInput,
  currencyInput,
  methodInput,
  tagInput,
  expenses,
}) => (
  async (dispatch) => {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const expense = [{
        id: expenses.length,
        value: valueInput,
        description: descriptionInput,
        currency: currencyInput,
        method: methodInput,
        tag: tagInput,
        exchangeRates: data,
      }];
      dispatch(sucessRequestSaveExpense(expense));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  }
);

export const deleteAndUpdateExpense = (payload) => ({
  type: 'DELETE_AND_UPDATE_EXPENSE',
  payload,
});
