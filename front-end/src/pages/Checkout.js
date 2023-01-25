import React from 'react';
import PropTypes from 'prop-types';
import DeliveryForm from '../components/DeliveryForm';
import ProductsTable from '../components/ProductsTable';
import TotalPriceInfo from '../components/TotalPriceInfo';
import instance, { requestData } from '../helpers/instance';
import getTotalPrice from '../utils/getTotalPrice';
import validateOrder from '../utils/validateOrder';
import Navbar from '../components/Navbar';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedProductsList: JSON.parse(localStorage.getItem('cart')) || [{
        id: '1',
        description: 'produto',
        quantity: 20,
        price: 3,
      }],
      sellers: [{ id: '1', name: 'Veia' }],
      sellerId: '1',
      deliveryAddress: '1',
      deliveryNumber: '1',
    };
  }

  componentDidMount() {
    this.fetchSellers('users/sellers');
  }

  handleUpdateSelectedProducts() {
    const { selectedProductsList } = this.state;
    localStorage.setItem('cart', JSON.stringify(selectedProductsList));
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
    }, this.handleUpdateSelectedProducts);
  };

  handleCheckButtonIsDisabled = () => !validateOrder(this.state);

  handleOrderSubmit = (e) => {
    e.preventDefault();

    const {
      sellerId, deliveryAddress, deliveryNumber, selectedProductsList,
    } = this.state;

    const order = {
      sellerId,
      deliveryAddress,
      deliveryNumber,
      totalPrice: getTotalPrice(selectedProductsList),
      products: selectedProductsList.map((product) => ({
        productId: product.id, quantity: product.quantity })),
    };

    return this.postOrder(order);
  };

  postOrder = async (order) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || '';
    const result = await instance
      .post('customer/orders', order, { headers: { Authorization: token } })
      .catch((err) => {
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
      <>
        <header>
          <Navbar history={ this.props } />
        </header>
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
              onCheckButtonIsDisabled={ this.handleCheckButtonIsDisabled }
            />
          </section>
        </main>
      </>
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
