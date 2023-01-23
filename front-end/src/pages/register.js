import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import instance from '../helpers/instance';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      message: '',
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  insertregister = async (body) => {
    const token = await instance.post('register', body).catch((err) => {
      this.setState({
        message: err.request.statusText,
      });
    });
    console.log('token: ', token);
  };

  render() {
    const { name, email, password, message } = this.state;
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
            onClick={ () => this.insertregister({ name, email, password }) }
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
