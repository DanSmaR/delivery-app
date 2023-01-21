import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link
            to="customer/products"
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
          <span>Ciclano da Silva</span>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
