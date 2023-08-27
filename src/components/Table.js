import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';
import styles from './table.module.css';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch, tableInfos } = this.props;
    dispatch(deleteExpense(id, tableInfos));
  };

  handleEdition = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { tableInfos } = this.props;
    return (
      <table>
        <thead />
        <tbody className={ styles.body__table }>
          {tableInfos.map((curr) => (
            <tr key={ curr.id }>
              <td>{curr.description}</td>
              <td>{curr.tag}</td>
              <td>{curr.method}</td>
              <td>{(+curr.value).toFixed(2)}</td>
              <td>{curr.exchangeRates[curr.currency].name}</td>
              <td>{(+curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
              <td>{(+curr.value * curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  onClick={ () => this.handleEdition(curr.id) }
                  data-testid="edit-btn"
                >
                  Editar

                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleDelete(curr.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (globalState) => ({
  tableInfos: globalState.wallet.expenses,
});

Table.propTypes = {
  tableInfos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
