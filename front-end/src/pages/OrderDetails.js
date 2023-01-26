import React from 'react';
import PropTypes from 'prop-types';
import ProductsTable from '../components/ProductsTable';
import TotalPriceInfo from '../components/TotalPriceInfo';
import Navbar from '../components/Navbar';
import OrderDetailsHeader from '../components/OrderDetailsHeader';
import OrderActions from '../components/OrderActions';

class OrderDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      order: {
        saleDate: '2023-01-26T14:04:16.287Z',
        status: 'Pendente',
        id: 9,
        sellerName: 'Fulana Pereira',
        totalPrice: 44,
        products: [{
          id: 1,
          description: 'Skol Lata 250ml',
          price: 2.20,
          quantity: 2,
        }, {
          id: 2,
          description: 'Heineken 600ml',
          price: 7.50,
          quantity: 3,
        }],
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
    console.log(pathname);
    this.setState({
      pathname,
      isSeller: pathname === '/seller',
    });
    this.fetchOrderById(`customer/orders/${id}`);
  }

  fetchOrderById = async (endpoint) => requestData(endpoint)
    .then((response) => this.setState({
      order: response,
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
