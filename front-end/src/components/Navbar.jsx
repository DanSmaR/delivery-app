import PropTypes, { object } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      pathName: '',
    };
  }

  componentDidMount() {
    this.definePathName();
  }

  definePathName = () => {
    const { history: { location: { pathname } } } = this.props;

    this.setState({ pathName: pathname });
  };

  customerProducts = () => (
    <nav>
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
        Ciclano da Silva
      </span>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );

  customerOrders = () => (
    <nav>
      <Link
        to="customer/products"
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
        Ciclano da Silva
      </span>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );

  render() {
    const { pathName } = this.state;
    return (
      <div>
        { pathName === '/customer/products' && this.customerProducts()}
        { pathName === '/customer/orders' && this.customerOrders()}
      </div>
    );
  }
}

Navbar.propTypes = {
  history: PropTypes.shape(object.PropTypes).isRequired,
};

export default Navbar;
