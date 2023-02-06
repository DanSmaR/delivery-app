import PropTypes from 'prop-types';
import React from 'react';
import instance from '../helpers/instance';
import deliveryLogo from '../images/logo-delivery.png';
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
      <main className="main-full">
        <div className="login">
          <span className="logo">Boteco Delivery</span>
          <img className="rocksGlass" src={ deliveryLogo } alt="delivery-moto" />
          <form className="forms">
            <label htmlFor="email" className="forms-child">
              Login
              <input
                id="email"
                className="input"
                type="email"
                name="email"
                data-testid="common_login__input-email"
                placeholder="email@email.com"
                value={ email }
                onChange={ (e) => this.handleInputChange(e) }
              />
            </label>
            <label htmlFor="password" className="forms-child">
              Senha
              <input
                id="password"
                type="password"
                className="input"
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
              className="forms-child btn"
              disabled={ disabled }
              onClick={ () => this.insertLogin({ email, password }) }
            >
              LOGIN
            </button>
            <button
              type="button"
              data-testid="common_login__button-register"
              className="forms-child btn"
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
      </main>
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
