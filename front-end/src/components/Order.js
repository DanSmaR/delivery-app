import PropTypes from 'prop-types';
import React from 'react';

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
    history.push(url);
  };

  render() {
    const { order } = this.props;
    const { seller } = this.state;
    const { id, status, saleDate, totalPrice, address } = order;
    const person = (seller) ? 'seller' : 'customer';
    const formattedSaleDate = new Date(saleDate).toLocaleDateString('pt-BR');

    return (
      <div className="cards-section">
        <button
          type="button"
          onClick={ () => this.nextPage(id) }
          className="order cards-main-color card-order"
        >
          <section>
            <h2 className="h2-header">Pedido</h2>
            <div data-testid={ `${person}_orders__element-order-id-${id}` }>
              { id }
            </div>
          </section>
          <section data-testid={ `${person}_orders__element-delivery-status-${id}` }>
            { status }
          </section>
          <section>
            <div data-testid={ `${person}_orders__element-order-date-${id}` }>
              { formattedSaleDate }
            </div>
            <span>
              R$:
              {' '}
              <span data-testid={ `${person}_orders__element-card-price-${id}` }>
                { totalPrice.replace('.', ',') }
              </span>
            </span>
          </section>

          {
            (seller) ? (
              <div data-testid={ `${person}_orders__element-card-address-${id}` }>
                { address }
              </div>
            ) : (<> </>)
          }
        </button>
      </div>
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
