import React from 'react';
import { Link } from 'react-router-dom';

class nav extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link
            to="/products"
            datatestid="customer_products__element-navbar-link-products"
          >
            Produtos

          </Link>
          <Link
            to="/myproducts"
            datatestid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos

          </Link>
          <Link
            to="/nameuser"
            datatestid="customer_products__element-navbar-user-full-name"
          >
            Cicrano da Silva

          </Link>
          <Link
            to="/logout"
            datatestid="customer_products__element-navbar-link-logout"
          >
            Sair
          </Link>
        </nav>
      </div>
    );
  }
}

export default nav;
