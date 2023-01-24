import React from 'react';
import DeliveryForm from '../components/DeliveryForm';
import ProductsTable from '../components/ProductsTable';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedProductsList: JSON.parse(localStorage.getItem('cart')) || [],
      sellers: [],
      sellerId: '',
      deliveryAddress: '',
      deliveryNumber: '',
    };
  }

  componentDidUpdate() {
    const { cartItems } = this.state;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleDeleteCartItem = (itemId, cartList) => {
    this.setState({
      selectedProductsList: cartList.filter((item) => item.id !== itemId),
    });
  };

  handleOrderSubmit = (e) => {
    e.preventDefault();
    const order = {
      sellerId,
      deliveryAddress,
      deliveryNumber,
    };
  };

  render() {
    const {
      selectedProductsList,
      sellers, sellerId, deliveryAddress, deliveryNumber } = this.state;
    return (
      <main>
        <section>
          <h1>Finalizar Pedido</h1>
          <ProductsTable
            selectedProductsList={ selectedProductsList }
            checkout
            onDeleteItem={ this.handleDeleteCartItem }
          />
        </section>
        <section>
          <h2>Detalhes e Endereço para Entrega</h2>
          <DeliveryForm
            sellersList={ sellers }
            sellerId={ sellerId }
            deliveryAddress={ deliveryAddress }
            deliveryNumber={ deliveryNumber }
            onInputChange={ this.handleInputChange }
            onOrderSubmit={ this.handleOrderSubmit }
          />
        </section>
      </main>
    );
  }
}

export default Checkout;
