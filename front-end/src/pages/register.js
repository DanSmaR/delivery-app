import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import instance from '../helpers/instance';
import emailValidate from '../utils/email.validate';
import passwordValidate from '../utils/password.validate';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
      disabled: true,
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRules());
  };

  inputRules = async () => {
    const { email, password, name } = this.state;
    const emailV = emailValidate(email);
    const passwordV = passwordValidate(password);
    const minNameLength = 12;
    if (emailV && passwordV && name.length >= minNameLength) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  insertRegister = async (body) => {
    const result = await instance.post('register', body).catch((err) => {
      this.setState({
        message: err.request.statusText,
      });
    });

    if (result) {
      const { history } = this.props;
      localStorage.setItem('user', JSON.stringify(result.data.message));
      history.push('/customer/products');
    }
  };

  render() {
    const { name, email, password, message, disabled } = this.state;
    return (
      <div className="App">
        <span className="logo">Cadastro</span>
        <forms className="register-forms">
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              data-testid="common_register__input-name"
              placeholder="Seu nome"
              value={ name }
              onChange={ (e) => this.handleInputChange(e) }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              data-testid="common_register__input-email"
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
              data-testid="common_register__input-password"
              placeholder="******"
              value={ password }
              onChange={ (e) => this.handleInputChange(e) }
            />
          </label>
          <button
            type="button"
            data-testid="common_register__button-register"
            className="btn-register"
            disabled={ disabled }
            onClick={ () => this.insertRegister({ name, email, password }) }
          >
            CADASTRAR
          </button>
        </forms>
        {
          (message === '') ? <> </>
            : (
              <p data-testid="common_register__element-invalid_register">
                { message }
              </p>
            )
        }
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Register;
