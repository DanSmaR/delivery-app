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
        id: 1,
        description: 'Skol Lata 250ml',
        quantity: 20,
        price: '2.20',
      }],
      sellers: [],
      sellerId: 0,
      deliveryAddress: '',
      deliveryNumber: '',
    };
  }

  componentDidMount() {
    this.fetchSellers('user?role=seller');
  }

  handleUpdateSelectedProducts() {
    const { selectedProductsList } = this.state;
    localStorage.setItem('cart', JSON.stringify(selectedProductsList));
  }

  fetchSellers = async (endpoint) => requestData(endpoint)
    .then((response) => this.setState({
      sellers: response,
      sellerId: response[0].id,
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

  handleOrderSubmit = async (e) => {
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
        id: product.id, quantity: product.quantity })),
    };
    await this.postOrder(order);
  };

  postOrder = async (order) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || { token: '' };
    try {
      const result = await instance
        .post('customer/orders', order, { headers: { Authorization: token } });
      if (result) {
        const { history } = this.props;
        history.push(`/customer/orders/${result.data.id}`);
      }
    } catch (err) {
      console.error(`error: ${err}`);
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
