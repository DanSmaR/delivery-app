import PropTypes from 'prop-types';
import React from 'react';
import DeliveryForm from '../components/DeliveryForm';
import Navbar from '../components/Navbar';
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
      totalPrice: getTotalPrice(selectedProductsList).replace(',', '.'),
      products: selectedProductsList.map((product) => ({
        id: product.id, quantity: product.quantity })),
    };
    await this.postOrder(order);
  };

  postOrder = async (order) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || { token: '' };
    try {
      const result = await instance
        .post('/customer/orders', order, { headers: { Authorization: token } });
      if (result) {
        console.log({ result });
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
        <main className="main">
          <section className="checkout">
            <h1>Finalizar Pedido</h1>
            <ProductsTable
              selectedProductsList={ selectedProductsList }
              checkout
              onDeleteItem={ this.handleDeleteCartItem }
            />
            <TotalPriceInfo
              dataTestId="customer_checkout__element-order-total-price"
            >
              { getTotalPrice(selectedProductsList) }
            </TotalPriceInfo>
          </section>
          <section className="delivery">
            <span className="delivery-details">
              <h2 className="delivery-header">Detalhes e Endereço para Entrega</h2>
              <DeliveryForm
                sellersList={ sellers }
                sellerId={ +sellerId }
                deliveryAddress={ deliveryAddress }
                deliveryNumber={ deliveryNumber }
                onInputChange={ this.handleInputChange }
                onOrderSubmit={ this.handleOrderSubmit }
                onCheckButtonIsDisabled={ this.handleCheckButtonIsDisabled }
              />
            </span>
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
