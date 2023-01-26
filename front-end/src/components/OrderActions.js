import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class OrderActions extends React.Component {
  renderSellerActions = () => (
    <>
      <span>
        <Button
          dataTestId="seller_order_details__button-preparing-check"
        >
          Preparar Pedido
        </Button>
      </span>
      <span>
        <Button
          dataTestId="seller_order_details__button-dispatch-check"
        >
          Saiu para Entrega
        </Button>
      </span>
    </>
  );

  renderCustomerAction = () => (
    <span>
      <Button
        dataTestId="customer_order_details__button-delivery-check"
      >
        Marcar como Entregue
      </Button>
    </span>
  );

  render() {
    const { isSeller } = this.props;
    return (
      isSeller ? this.renderSellerActions() : this.renderCustomerAction()
    );
  }
}

OrderActions.propTypes = {
  isSeller: PropTypes.bool.isRequired,
};

OrderActions.defaultProps = {
};

export default OrderActions;
