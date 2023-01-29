import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class OrderActions extends React.Component {
  handleChangeStatusById = async (status) => {
    const { onChangeStatusById, id } = this.props;
    onChangeStatusById(status, id);
  };

  renderSellerActions = () => {
    const { status } = this.props;
    const prepared = (status !== 'Pendente');
    const sent = (status !== 'Preparando');
    return (
      <>
        <span>
          <Button
            dataTestId="seller_order_details__button-preparing-check"
            onAction={ () => this.handleChangeStatusById('Preparando') }
            onCheckIsDisabled={ () => prepared }
          >
            Preparar Pedido
          </Button>
        </span>
        <span>
          <Button
            dataTestId="seller_order_details__button-dispatch-check"
            onAction={ () => this.handleChangeStatusById('Em Trânsito') }
            onCheckIsDisabled={ () => sent }
          >
            Saiu para Entrega
          </Button>
        </span>
      </>
    );
  };

  renderCustomerAction = () => {
    const { status } = this.props;
    const hasArrived = (status !== 'Em Trânsito');
    return (
      <span>
        <Button
          dataTestId="customer_order_details__button-delivery-check"
          onAction={ () => this.handleChangeStatusById('Entregue') }
          onCheckIsDisabled={ () => hasArrived }
        >
          Marcar como Entregue
        </Button>
      </span>
    );
  };

  render() {
    const { isSeller } = this.props;
    return (
      isSeller ? this.renderSellerActions() : this.renderCustomerAction()
    );
  }
}

OrderActions.propTypes = {
  isSeller: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onChangeStatusById: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

OrderActions.defaultProps = {
};

export default OrderActions;
