import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './wallet.module.css';
import { saveExpensesForm } from '../redux/actions';

const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const CATEGORIES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
  }

  toOptions = (options) => options.map((option) => (
    <option key={ option } value={ option }>
      {option}
    </option>
  ));

  handleSubmit = (event) => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, idToEdit } = this.props;
    event.preventDefault();
    const expensesInfos = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(saveExpensesForm(expensesInfos));
    this.setState({
      value: '',
      description: '',
      method: '',
      tag: '',
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form className={ styles.form__container } onSubmit={ this.handleSubmit }>

          <input
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            placeholder="valor"
          />
          <input
            name="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            placeholder="descricao"
          />
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {this.toOptions(currencies)}
          </select>
          <select
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            {this.toOptions(METHODS)}
          </select>
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            {this.toOptions(CATEGORIES)}
          </select>
          <button
            className={ styles.butonWallet }
            type="submit"
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
