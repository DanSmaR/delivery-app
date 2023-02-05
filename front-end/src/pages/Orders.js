import PropTypes from 'prop-types';
import React from 'react';
import Navbar from '../components/Navbar';
import Order from '../components/Order';
import instance from '../helpers/instance';

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
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { orders } = this.state;
    const { history } = this.props;
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
                  history={ history }
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
