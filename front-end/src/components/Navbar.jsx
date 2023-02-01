import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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

  productsNavbar = () => {
    const { user } = this.state;

    return (
      <>
        <span
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos

        </span>
        <Link
          to={ `/${user.role}/orders` }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </span>
        <Link
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
  };

  ordersNavbar = () => {
    const { user } = this.state;

    return (
      <>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <span
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </span>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </span>
        <Link
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
  };

  defaultNav = () => {
    const { user } = this.state;

    return (

      <>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to={ `/${user.role}/orders` }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </span>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair
        </Link>
      </>
    );
  };

  adminNavbar = () => {
    const { user } = this.state;
    return (
      <>
        <span
          data-testid="customer_products__element-navbar-link-orders"
        >
          Gerenciar Usuários
        </span>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </span>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair
        </Link>
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
