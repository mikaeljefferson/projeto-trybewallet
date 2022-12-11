import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: 0,
      descriptionInput: '',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
      currency: 'USD',

    };
  }

  toOptions = (options) => options.map((option) => (
    <option key={ option } value={ option }>
      {option}
    </option>
  ));

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { currencies } = this.props;
    const {
      valueInput,
      descriptionInput,
      methodInput,
      tagInput,
      currency,
    } = this.state;
    return (
      <div>
        <form />
        Valor:
        <input
          id="value-input"
          name="valueInput"
          data-testid="value-input"
          type="number"
          onChange={ this.inputChange }
          value={ valueInput }
        />

        Descrição:
        <input
          id="description-input"
          name="descriptionInput"
          data-testid="description-input"
          type="text"
          onChange={ this.inputChange }
          value={ descriptionInput }
        />

        <select
          name="currency"
          value={ currency }
          onChange={ this.inputChange }
          data-testid="currency-input"
        >
          {this.toOptions(currencies)}
        </select>
        <select
          onChange={ this.inputChange }
          value={ methodInput }
          name="methodInput"
          id="method-input"
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          onChange={ this.inputChange }
          value={ tagInput }
          name="tagInput"
          id="tag-input"
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>

    );
  }
}
WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
