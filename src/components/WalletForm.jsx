import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, saveEditedExpenses } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, editor, expenses, idToEdit } = this.props;
    if (editor) {
      const { value, currency, method, tag, description } = this.state;
      expenses.forEach((expense) => {
        if (expense.id === idToEdit) {
          expense.value = value;
          expense.currency = currency;
          expense.method = method;
          expense.tag = tag;
          expense.description = description;
        }
      });
      dispatch(saveEditedExpenses(expenses));
      this.setState({ ...INITIAL_STATE });
    } else {
      dispatch(fetchApi(true, this.state));
      this.setState({ ...INITIAL_STATE });
    }
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              onChange={ this.onInputChange }
              data-testid="value-input"
              placeholder="valor da despesa"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              id="description"
              type="text"
              placeholder="descrição da despesa"
              data-testid="description-input"
              value={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              onChange={ this.onInputChange }
              data-testid="currency-input"
              value={ currency }
            >
              {
                (currencies && currencies.length) ? currencies.map((item) => (
                  <option
                    key={ item }
                    name="currencies"
                    value={ item }
                  >
                    { item }
                  </option>
                )) : null
              }
            </select>
          </label>
          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              name="method"
              id="paymentMethod"
              onChange={ this.onInputChange }
              data-testid="method-input"
              value={ method }
            >
              <option name="method" value="Dinheiro">
                Dinheiro
              </option>
              <option name="method" value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option name="method" value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria :
            <select
              name="tag"
              id="tag"
              onChange={ this.onInputChange }
              data-testid="tag-input"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {
            (editor)
              ? (<button type="submit" data-testid="edit-btn">Editar despesa</button>)
              : (<button type="submit">Adicionar despesa</button>)
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
