import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

class OrderActions extends React.Component {
  handleChangeStatusById = async (status) => {
    const { onChangeStatusById, id } = this.props;
    onChangeStatusById(status, id);
  };

  renderSellerActions = () => {
    const { status } = this.props;
    return (
      <>
        <span>
          <Button
            className="btn"
            dataTestId="seller_order_details__button-preparing-check"
            onAction={ () => this.handleChangeStatusById('Preparando') }
            onCheckIsDisabled={ () => status !== 'Pendente' }
          >
            Preparar Pedido
          </Button>
        </span>
        <span>
          <Button
            className="btn"
            dataTestId="seller_order_details__button-dispatch-check"
            onAction={ () => this.handleChangeStatusById('Em Trânsito') }
            onCheckIsDisabled={ () => status !== 'Preparando' }
          >
            Saiu para Entrega
          </Button>
        </span>
      </>
    );
  };

  renderCustomerAction = () => {
    const { status } = this.props;
    return (
      <span>
        <Button
          className="btn"
          dataTestId="customer_order_details__button-delivery-check"
          onAction={ () => this.handleChangeStatusById('Entregue') }
          onCheckIsDisabled={ () => status !== 'Em Trânsito' }
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
