import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class DeliveryForm extends React.Component {
  handleOrderSubmit = (e) => {
    const { onOrderSubmit } = this.props;
    onOrderSubmit(e);
  };

  handleInputChange = (e) => {
    const { onInputChange } = this.props;
    onInputChange(e);
  };

  render() {
    const {
      sellersList, sellerId, deliveryAddress, deliveryNumber, onCheckButtonIsDisabled,
    } = this.props;
    return (
      <form onSubmit={ this.handleOrderSubmit }>
        <p>
          <label htmlFor="seller-options">
            P. Vendedora Responsável:
            {' '}
            <select
              value={ sellerId }
              name="sellerId"
              id="seller-options"
              onChange={ this.handleInputChange }
              data-testid="customer_checkout__select-seller"
              required
            >
              {
                sellersList.length !== 0 && sellersList.map((seller) => (
                  <option
                    key={ seller.id }
                    value={ seller.id }
                  >
                    { seller.name }
                  </option>
                ))
              }
            </select>
          </label>
        </p>
        <p>
          <label htmlFor="address">
            Endereço
            <input
              value={ deliveryAddress }
              name="deliveryAddress"
              id="address"
              type="text"
              data-testid="customer_checkout__input-address"
              onChange={ this.handleInputChange }
              required
            />
          </label>
        </p>
        <p>
          <label htmlFor="address-number">
            Número
            {' '}
            <input
              value={ deliveryNumber }
              name="deliveryNumber"
              id="address-number"
              type="number"
              data-testid="customer_checkout__input-address"
              onChange={ this.handleInputChange }
              required
              min="1"
            />
          </label>
        </p>
        <p>
          <Button
            submit
            dataTestId="customer_checkout__input-address-number"
            onAction={ () => {} }
            onCheckIsDisabled={ onCheckButtonIsDisabled }
          >
            Finalizar Pedido
          </Button>
        </p>
      </form>
    );
  }
}

DeliveryForm.propTypes = {
  sellersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  sellerId: PropTypes.string.isRequired,
  onOrderSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckButtonIsDisabled: PropTypes.func.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default DeliveryForm;
