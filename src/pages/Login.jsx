import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.disableButton();
    });
  };

  disableButton = () => {
    const { password, email } = this.state;
    const minPasswordLength = 6;
    const formatEmail = email.includes('.com');
    if (password.length >= minPasswordLength && formatEmail) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled, email, password } = this.state;
    return (
      <main>
        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor="emailLogin"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={ this.onInputChange }
              value={ email }
              data-testid="email-input"
              required
            />
            <label htmlFor="passwordLogin">
              <input
                type="password"
                name="password"
                placeholder="Senha"
                onChange={ this.onInputChange }
                value={ password }
                data-testid="password-input"
                minLength={ 6 }
                required
              />
            </label>
            <button disabled={ isButtonDisabled } type="submit">Entrar</button>
          </label>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
