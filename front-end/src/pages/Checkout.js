import React from 'react';
import PropTypes from 'prop-types';
import DeliveryForm from '../components/DeliveryForm';
import ProductsTable from '../components/ProductsTable';
import TotalPriceInfo from '../components/TotalPriceInfo';
import instance, { requestData } from '../helpers/instance';
import getTotalPrice from '../utils/getTotalPrice';
import validateOrder from '../utils/validateOrder';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedProductsList: JSON.parse(localStorage.getItem('cart')) || [],
      user: JSON.parse(localStorage.getItem('user')) || '',
      sellers: [],
      sellerId: '',
      deliveryAddress: '',
      deliveryNumber: '',
    };
  }

  componentDidMount() {
    this.fetchSellers('users/sellers');
  }

  componentDidUpdate() {
    const { cartItems } = this.state;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  fetchSellers = async (endpoint) => requestData(endpoint)
    .then((response) => this.setState({
      sellers: response,
    }), (error) => console.log(error));

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

    const {
      user, sellerId, deliveryAddress, deliveryNumber, selectedProductsList,
    } = this.state;

    const roundedTotalPrice = getTotalPrice(selectedProductsList);

    if (!roundedTotalPrice) return;

    const order = {
      userId: user.id,
      sellerId,
      deliveryAddress,
      deliveryNumber,
      totalPrice: roundedTotalPrice,
      products: selectedProductsList.map((product) => ({
        productId: product.id, quantity: product.quantity })),
    };

    if (!validateOrder(order)) return;
    return this.postOrder(order);
  };

  postOrder = async (order) => {
    const result = await instance.post('customer/orders', order).catch((err) => {
      console.error(err);
      alert('Erro ao cadastrar venda');
    });

    if (result) {
      const { history } = this.props;
      history.push(`/customer/orders/${result.id}`);
    }
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
          <TotalPriceInfo>
            { getTotalPrice(selectedProductsList) }
          </TotalPriceInfo>
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

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Checkout;
