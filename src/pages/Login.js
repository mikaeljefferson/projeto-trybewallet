import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addPersonalInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    password: '',
    isButtonDisabled: true,
  };

  validateButton = () => {
    const NUM_MIN_BUTTON = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const { password } = this.state;
    const { email } = this.props;
    if (regexEmail.test(email) && password.length >= NUM_MIN_BUTTON) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  render() {
    const { password, isButtonDisabled } = this.state;
    const { dispatch, email } = this.props;

    return (
      <div>
        <input
          onChange={ ({ target: { value } }) => dispatch(addPersonalInfo(value)) }
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
        />

        <input
          onChange={ this.handleChange }
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isButtonDisabled }
          >
            Entrar

          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Login);
