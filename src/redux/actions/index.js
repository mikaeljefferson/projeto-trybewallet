export const ADD_LOGIN_USER = 'ADD_LOGIN_USER';

export const addPersonalInfo = (value) => ({
  type: ADD_LOGIN_USER,
  payload: value,
});

export function getCurrencies() {
  return async (dispatch) => {
    try {
      const result = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await result.json();
      const currencies = Object.entries(data).map((item) => item[0])
        .filter((item) => item !== 'USDT');
      dispatch(sucessRequest(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

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
