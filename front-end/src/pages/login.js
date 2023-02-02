import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';
import instance from '../helpers/instance';
import rockGlass from '../images/rockGlass.svg';
import emailValidate from '../utils/email.validate';
import passwordValidate from '../utils/password.validate';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      message: '',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { role } = JSON.parse(localStorage.getItem('user')) || { role: '' };
    if (role === 'customer') {
      history.push('/customer/products');
    } else if (history.location.pathname !== '/login') {
      history.push('/login');
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRules());
  };

  inputRules = async () => {
    const { email, password } = this.state;
    const emailV = emailValidate(email);
    const passwordV = passwordValidate(password);
    if (emailV && passwordV) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  insertLogin = async (body) => {
    try {
      const result = await instance.post('login', body);
      if (result) {
        const { history } = this.props;
        const { data, data: { role } } = result;
        localStorage.setItem('user', JSON.stringify(data));
        switch (role) {
        case 'seller':
          history.push('/seller/orders');
          break;
        case 'administrator':
          history.push('/admin/manage');
          break;
        default:
          history.push('/customer/products');
          break;
        }
      }
    } catch (error) {
      this.setState({
        message: error.request.statusText,
      });
    }
  };

  render() {
    const { email, password, message, disabled } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <span className="logo">TRYBE</span>
        <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
          Glass
        </object>
        <form className="login-forms">
          <label htmlFor="email">
            Login
            <input
              id="email"
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
              id="password"
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
            className="btn-login"
            disabled={ disabled }
            onClick={ () => this.insertLogin({ email, password }) }
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            className="btn-without-login"
            onClick={ () => history.push('register') }
          >
            Ainda não tenho conta
          </button>
        </form>
        {
          (message === '') ? <> </>
            : (
              <p data-testid="common_login__element-invalid-email">
                { message }
              </p>
            )
        }
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
