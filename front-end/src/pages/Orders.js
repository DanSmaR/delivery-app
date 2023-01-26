import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import instance from '../helpers/instance';
import Order from '../components/Order';

export default class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const userSales = await instance
      .get('customer/orders', { headers: { Authorization: token } });
    const result = userSales.data
      .map((sale) => (
        {
          id: sale.id,
          totalPrice: sale.totalPrice,
          address: `${sale.deliveryAddress}, ${sale.deliveryNumber}`,
          saleDate: sale.saleDate,
          status: sale.status,
        }
      ));
    this.setState({
      orders: result,
    });
  };

  render() {
    const { orders } = this.state;
    return (
      <div>
        <Navbar history={ this.props } />
        {
          (orders.length > 0) ? (
            <main>
              {
                orders.map((order, i) => (<Order
                  key={ i }
                  order={ order }
                  history={ this.props }
                />))
              }
            </main>
          ) : <h3>Sem pedidos cadastrados</h3>
        }
      </div>
    );
  }
}

Orders.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
