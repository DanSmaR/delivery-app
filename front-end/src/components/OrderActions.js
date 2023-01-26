import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import instance from '../helpers/instance';

class OrderActions extends React.Component {
  constructor() {
    super();
    this.state = {
      status: '',
    };
  }

  componentDidMount() {
    const { status } = this.props;
    this.setState({
      status,
    });
  }

  changeStatusById = async (status) => {
    const { id } = this.props;
    await instance.put(`/orders/${id}`, { status });
    this.setState({
      status,
    });
  };

  renderSellerActions = () => {
    const { status } = this.state;
    const prepared = (status !== 'Pendente');
    const sent = (status !== 'Preparando');
    return (
      <>
        <span>
          <Button
            dataTestId="seller_order_details__button-preparing-check"
            onAction={ () => this.changeStatusById('Preparando') }
            onCheckIsDisabled={ () => prepared }
          >
            Preparar Pedido
          </Button>
        </span>
        <span>
          <Button
            dataTestId="seller_order_details__button-dispatch-check"
            onAction={ () => this.changeStatusById('Em Trânsito') }
            onCheckIsDisabled={ () => sent }
          >
            Saiu para Entrega
          </Button>
        </span>
      </>
    );
  };

  renderCustomerAction = () => {
    const { status } = this.state;
    const hasArrived = (status !== 'Em Trânsito');
    return (
      <span>
        <Button
          dataTestId="customer_order_details__button-delivery-check"
          onAction={ () => this.changeStatusById('Entregue') }
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
  status: PropTypes.string.isRequired,
};

OrderActions.defaultProps = {
};

export default OrderActions;
