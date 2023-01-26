import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      pathName: '',
      user: JSON.parse(localStorage.getItem('user')) || '',
    };
  }

  componentDidMount() {
    this.definePathName();
  }

  definePathName = () => {
    const { history: { location: { pathname } } } = this.props;

    this.setState({ pathName: pathname });
  };

  customerProducts = (name) => (
    <>
      <span data-testid="customer_products__element-navbar-link-products">Produtos</span>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
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

  customerOrders = (name) => (
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
        { name }
      </span>
      <Link
        to="/login"
        onClick={ () => localStorage.removeItem('user') }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </>
  );

  defaultNav = (name) => (
    <>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
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

  renderNav = (pathName, userName) => {
    let navbar;
    switch (pathName) {
    case '/customer/products':
      navbar = this.customerProducts(userName);
      break;
    case '/customer/orders':
      navbar = this.customerOrders(userName);
      break;
    default:
      navbar = this.defaultNav(userName);
      break;
    }
    return navbar;
  };

  render() {
    const { pathName, user: { name } } = this.state;
    return (
      <nav className="nav">
        { this.renderNav(pathName, name) }
      </nav>
    );
  }
}

export default Navbar;

Navbar.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};
