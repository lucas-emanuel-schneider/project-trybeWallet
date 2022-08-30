import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  getTotalValue = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, currentValue) => (
      Number(acc) + (
        Number(currentValue.value)
          * Number(currentValue.exchangeRates[currentValue.currency].ask))
    ), 0).toFixed(2) || 0;
  };

  render() {
    const { email } = this.props;
    const initialCurrency = 'BRL';
    return (
      <div>
        <p data-testid="email-field">{`Email:${email}`}</p>
        <p
          data-testid="total-field"
        >
          { this.getTotalValue() }
        </p>
        <p data-testid="header-currency-field">{ initialCurrency }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
