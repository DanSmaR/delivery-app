import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import instance from '../helpers/instance';
import emailValidate from '../utils/email.validate';
import passwordValidate from '../utils/password.validate';

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.isComponentMounted = false;
    this.state = {
      name: '',
      email: '',
      password: '',
      role: 'customer',
      message: '',
      disabled: true,
      pathName: '',
    };
  }

  componentDidMount() {
    this.isMounted = true;
    this.definePathName();
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  get isMounted() {
    return this.isComponentMounted;
  }

  set isMounted(bool) {
    this.isComponentMounted = bool;
  }

  definePathName = () => {
    const { history: { location: { pathname } } } = this.props;

    this.setState({ pathName: pathname });
  };

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
    const { pathName } = this.state;
    const { getUsers } = this.props;
    let token = '';

    if (pathName.includes('admin')) {
      const user = JSON.parse(localStorage.getItem('user'));
      token = user.token;
    }

    try {
      const result = await instance
        .post('register', body, { headers: { Authorization: token } });
      getUsers();

      if (result && pathName.includes('register')) {
        const { history } = this.props;
        localStorage.setItem('user', JSON.stringify(result.data.user));
        history.push('/customer/products');
      }

      if (this.isMounted) {
        this.setState({
          name: '',
          email: '',
          password: '',
          role: 'customer',
          disabled: true,
        });
      }
    } catch (error) {
      this.setState({
        message: error.request.statusText,
      });
    }
  };

  render() {
    const { name, email, password, role, message, disabled, pathName } = this.state;
    const testIdByPathname = (pathName.includes('admin'))
      ? 'admin_manage' : 'common_register';
    const invalidRegisterSuffix = (pathName.includes('admin'))
      ? '__element-invalid-register' : '__element-invalid_register';
    const messageText = (message === '') ? <> </>
      : (
        <p data-testid={ `${testIdByPathname}${invalidRegisterSuffix}` }>
          { message }
        </p>
      );
    return (
      <div>
        {
          messageText
        }
        <form className="register-forms">
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="text"
              name="name"
              data-testid={ `${testIdByPathname}__input-name` }
              placeholder="Seu nome"
              value={ name }
              onChange={ (e) => this.handleInputChange(e) }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              data-testid={ `${testIdByPathname}__input-email` }
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
              data-testid={ `${testIdByPathname}__input-password` }
              placeholder="******"
              value={ password }
              onChange={ (e) => this.handleInputChange(e) }
            />
          </label>
          {
            (pathName.includes('admin'))
              ? (
                <label htmlFor="role">
                  Tipo
                  <select
                    id="role"
                    name="role"
                    data-testid="admin_manage__select-role"
                    defaultValue="customer"
                    onChange={ (e) => {
                      this.setState({
                        role: e.target.value,
                      });
                    } }
                  >
                    <optgroup label="Tipo de usuário">
                      <option value="customer">Cliente</option>
                      <option value="seller">Vendedor</option>
                      <option value="administrator">Administrador</option>
                    </optgroup>
                  </select>
                </label>
              )
              : (<> </>)
          }
          <button
            type="button"
            data-testid={ `${testIdByPathname}__button-register` }
            className="btn-register"
            disabled={ disabled }
            onClick={ () => this.insertRegister({ name, email, password, role }) }
          >
            CADASTRAR
          </button>
        </form>
      </div>
    );
  }
}

RegistrationForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  getUsers: PropTypes.func,
};

RegistrationForm.defaultProps = {
  getUsers: () => {},
};

export default RegistrationForm;
