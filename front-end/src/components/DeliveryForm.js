import PropTypes from 'prop-types';
import React from 'react';
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
      <form
        className="forms-full"
        onSubmit={ this.handleOrderSubmit }
      >
        <label className="forms-child label-vend" htmlFor="seller-options">
          P. Vendedora Responsável:
          {' '}
          <select
            className="select"
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
                  className="option"
                  key={ seller.id }
                  value={ seller.id }
                >
                  { seller.name }
                </option>
              ))
            }
          </select>
        </label>
        <label className="forms-child label-add" htmlFor="address">
          Endereço
          <input
            className="input"
            value={ deliveryAddress }
            name="deliveryAddress"
            id="address"
            type="text"
            data-testid="customer_checkout__input-address"
            onChange={ this.handleInputChange }
            required
          />
        </label>
        <label htmlFor="address-number" className="forms-child label-add-num">
          Número
          {' '}
          <input
            className="input"
            value={ deliveryNumber }
            name="deliveryNumber"
            id="address-number"
            type="number"
            data-testid="customer_checkout__input-address-number"
            onChange={ this.handleInputChange }
            required
            min="1"
          />
        </label>
        <Button
          className="btn forms-child btn-finish"
          submit
          dataTestId="customer_checkout__button-submit-order"
          onCheckIsDisabled={ onCheckButtonIsDisabled }
        >
          Finalizar Pedido
        </Button>
      </form>
    );
  }
}

DeliveryForm.propTypes = {
  sellersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  sellerId: PropTypes.number.isRequired,
  onOrderSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCheckButtonIsDisabled: PropTypes.func.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
};

export default DeliveryForm;
