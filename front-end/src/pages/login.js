import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';
import instance from '../helpers/instance';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      message: '',
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
    });
  };

  insertLogin = async (body) => {
    const token = await instance.post('login', body).catch((err) => {
      this.setState({
        message: err.request.statusText,
      });
    });
    console.log(token);
  };

  render() {
    const { email, password, message } = this.state;
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
            className="btn-login"
            onClick={ () => this.insertLogin({ email, password }) }
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
