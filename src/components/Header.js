import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header className={ styles.header__container }>
        <div className={ styles.header__title }>
          {' '}
          <h1>TrybeWallet</h1>
          {' '}
        </div>

        <div className={ styles.header__infos }>
          <div className={ styles.totalValue__container }>
            <span data-testid="total-field">{totalValue.toFixed(2)}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
          <div className={ styles.email__container }>
            <p data-testid="email-field">{email}</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
  totalValue: globalState.wallet.expenses.reduce((sum, item) => sum
  + (+item.value * item.exchangeRates[item.currency].ask), 0),
});

export default connect(mapStateToProps)(Header);
