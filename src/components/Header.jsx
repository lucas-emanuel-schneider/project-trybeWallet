import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    const initialTotalField = 0;
    const initialCurrency = 'BRL';
    return (
      <div>
        <p data-testid="email-field">{`Email:${email}`}</p>
        <p data-testid="total-field">{ initialTotalField }</p>
        <p data-testid="header-currency-field">{ initialCurrency }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
