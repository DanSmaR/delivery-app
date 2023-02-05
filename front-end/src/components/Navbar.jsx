import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      pathName: '',
      user: '',
    };
  }

  componentDidMount() {
    this.definePathName();
    this.getUser();
  }

  definePathName = () => {
    const { history: { location: { pathname } } } = this.props;

    this.setState({ pathName: pathname });
  };

  getUser = () => {
    const getUsers = localStorage.getItem('user');
    const userJSON = JSON.parse(getUsers);
    this.setState({ user: userJSON });
  };

  pedidos = (className) => (
    <span
      className={ `${className}` }
      data-testid="customer_products__element-navbar-link-orders"
    >
      Meus Pedidos
    </span>
  );

  produtos = (className) => (
    <span
      className={ `${className}` }
      data-testid="customer_products__element-navbar-link-products"
    >
      Produtos
    </span>
  );

  nameExit = (user) => (
    <>
      <span
        className="nav-name"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user }
      </span>
      <Link
        className="clear-decoration nav-exit"
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => {
          localStorage.clear();
        } }
      >
        Sair
      </Link>
    </>
  );

  productsNavbar = () => {
    const { user } = this.state;

    return (
      <>
        <div className="nav-child">
          { this.produtos('expose') }
          <Link
            className="clear-decoration"
            to={ `/${user.role}/orders` }
          >
            { this.pedidos('nav-div') }
          </Link>
        </div>
        <div className="nav-child">
          { this.nameExit(user.name)}
        </div>
      </>
    );
  };

  ordersNavbar = () => {
    const { user } = this.state;

    return (
      <>
        <div className="nav-child">
          <Link
            className="clear-decoration"
            to="/customer/products"
          >
            { this.produtos('nav-div') }
          </Link>
          { this.pedidos('expose') }
        </div>
        <div className="nav-child">
          { this.nameExit(user.name)}
        </div>
      </>
    );
  };

  defaultNav = () => {
    const { user } = this.state;

    return (

      <>
        <div className="nav-child">
          <Link
            className="clear-decoration nav-child"
            to="/customer/products"
          >
            { this.produtos('expose') }

          </Link>
          <Link
            className="clear-decoration"
            to={ `/${user.role}/orders` }
          >
            { this.pedidos('nav-div') }
          </Link>
        </div>
        <div className="nav-child">
          { this.nameExit(user.name)}
        </div>
      </>
    );
  };

  adminNavbar = () => {
    const { user } = this.state;
    return (
      <>
        <div className="nav-child">
          <span
            className="expose"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Gerenciar Usuários
          </span>
        </div>
        <div className="nav-child">
          { this.nameExit(user.name)}
        </div>
      </>
    );
  };

  renderNav = (pathName) => {
    let navbar;
    switch (pathName) {
    case '/customer/products':
      navbar = this.productsNavbar();
      break;
    case '/customer/orders':
    case '/seller/orders':
      navbar = this.ordersNavbar();
      break;
    case '/admin/manage':
      navbar = this.adminNavbar();
      break;
    default:
      navbar = this.defaultNav();
      break;
    }
    return navbar;
  };

  render() {
    const { pathName } = this.state;
    return (
      <nav className="nav">
        { this.renderNav(pathName) }
      </nav>
    );
  }
}

export default Navbar;

Navbar.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};
