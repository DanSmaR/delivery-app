import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export default class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      seller: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { location } = history;
    if (location.pathname.includes('seller')) {
      this.setState({
        seller: true,
      });
    }
  }

  nextPage = (id) => {
    const { seller } = this.state;
    const { history } = this.props;
    const url = (seller) ? `/seller/orders/${id}` : `/customer/orders/${id}`;
    console.log(typeof history.push);
    console.log(history);
    history.push(url);
  };

  render() {
    const { order } = this.props;
    const { seller } = this.state;
    const { id, status, saleDate, totalPrice, address } = order;
    const person = (seller) ? 'seller' : 'customer';

    return (
      <button type="button" onClick={ () => this.nextPage(id) } className="order">
        <section>
          <div>Pedido</div>
          <div data-testid={ `${person}_orders__element-order-id-${id}` }>
            { id }
          </div>
        </section>
        <div>
          <section data-testid={ `${person}_orders__element-delivery-status-${id}` }>
            { status }
          </section>
          <section>
            <div data-testid={ `${person}_orders__element-order-date-${id}` }>
              { saleDate }
            </div>
            <div data-testid={ `${person}_orders__element-card-price-${id}` }>
              { totalPrice }
            </div>
          </section>
        </div>
        {
          (seller) ? (
            <div data-testid={ `${person}_orders__element-card-address-${id}` }>
              { address }
            </div>
          ) : (<> </>)
        }
      </button>
    );
  }
}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
