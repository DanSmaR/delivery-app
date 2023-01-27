import React from 'react';
import PropTypes from 'prop-types';
import ProductsTable from '../components/ProductsTable';
import TotalPriceInfo from '../components/TotalPriceInfo';
import Navbar from '../components/Navbar';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import OrderActions from '../components/OrderActions';
import { requestData } from '../helpers/instance';

class OrderDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      order: {
        id: 0,
        saleDate: '',
        status: '',
        sellerName: '',
        totalPrice: '0.00',
        products: [],
      },
      pathname: '',
      isSeller: false,
    };
  }

  componentDidMount() {
    const {
      match: { params: { id } },
      history: { location: { pathname } },
    } = this.props;
    const helperPathname = (pathname.includes('seller')) ? 'seller' : 'customer';
    this.setState({
      pathname: helperPathname,
      isSeller: helperPathname === 'seller',
    });
    this.fetchOrderById(`customer/orders/${id}`);
  }

  fetchOrderById = async (endpoint) => requestData(endpoint)
    .then((response) => this.setState({
      order: {
        id: response.id,
        saleDate: response.saleDate,
        status: response.status,
        sellerName: response.seller.name,
        totalPrice: response.totalPrice,
        products: response.products.map((product) => ({
          id: product.id,
          description: product.name,
          price: product.price,
          quantity: product.SaleProduct.quantity,
        })),
      },
    }), (error) => console.log(error));

  render() {
    const { order: {
      id, saleDate, status, sellerName, totalPrice, products,
    }, isSeller, pathname } = this.state;
    return (
      <>
        <header>
          <Navbar history={ this.props } />
        </header>
        <main>
          <section>
            <h1>Detalhe do Pedido</h1>
            <p>
              <OrderDetailsHeader
                status={ status }
                saleDate={ saleDate }
                sellerName={ sellerName }
                id={ id }
                isSeller={ isSeller }
                pathname={ pathname }
              />
              <OrderActions
                isSeller={ isSeller }
                pathname={ pathname }
                status={ status }
                id={ id }
              />
            </p>
            <ProductsTable
              selectedProductsList={ products }
            />
            <TotalPriceInfo>
              { totalPrice }
            </TotalPriceInfo>
          </section>
        </main>
      </>
    );
  }
}

OrderDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default OrderDetails;
