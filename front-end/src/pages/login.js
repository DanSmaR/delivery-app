import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      invalid: true,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    if (history.location.pathname !== '/login') {
      history.push('/login');
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  };

  inputRolesValidation = () => {
    const { email, password } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minLetters = 5;
    if (
      email.length > 0
      && regex.test(email)
      && password.length > minLetters
    ) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  };

  render() {
    const { email, password, invalid } = this.state;
    return (
      <div className="App">
        <span className="logo">TRYBE</span>
        <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
          Glass
        </object>
        <forms className="login-forms">
          <label htmlFor="email">
            Login
            <input
              type="email"
              name="email"
              data-testid="common_login__input-email"
              placeholder="email@email.com"
              value={ email }
              onChange={ (e) => this.handleInputChange(e) }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              name="password"
              data-testid="common_login__input-password"
              placeholder="******"
              value={ password }
              onChange={ (e) => this.handleInputChange(e) }
            />
          </label>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ invalid }
            className="btn-login"
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            className="btn-without-login"
          >
            Ainda não tenho conta
          </button>
        </forms>
        <p data-testid="common_login__element-invalid-email">
          {
            (invalid) ? 'Email ou senha invalidos' : ''
          }
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Login;
