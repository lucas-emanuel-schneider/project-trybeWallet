import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveWallet, fetchApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    paymentMethod: 'Dinheiro',
    category: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { value, currency, paymentMethod, category, description } = this.state;
    dispatch(saveWallet({ value, currency, paymentMethod, category, description }));
  };

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, paymentMethod, category, description } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
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
              name="paymentMethod"
              onChange={ this.onInputChange }
              data-testid="method-input"
              value={ paymentMethod }
            >
              <option name="paymentMethod" value="cash">
                Dinheiro
              </option>
              <option name="paymentMethod" value="credit">
                Cartão de crédito
              </option>
              <option name="paymentMethod" value="debit">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria :
            <select
              name="category"
              onChange={ this.onInputChange }
              data-testid="tag-input"
              value={ category }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
