import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

class ProductTableLine extends React.Component {
  handleDeleteItem = (id, list) => {
    const { onDeleteItem } = this.props;
    onDeleteItem(id, list);
  };

  render() {
    const { index, checkout, item, listItems } = this.props;
    return (
      <tr
        className="table-item"
      >
        <td
          className="product-counter"
          data-testid={
            `customer_checkout__element-order-table-item-number-${index}`
          }
        >
          { index + 1 }
        </td>
        <td
          className="product-description"
          data-testid={
            `customer_checkout__element-order-table-name-${index}`
          }
        >
          { item.description }
        </td>
        <td
          className="product-quantity"
          data-testid={
            `customer_checkout__element-order-table-quantity-${index}`
          }
        >
          { item.quantity }
        </td>
        <td
          className="product-price-unit"
          data-testid={
            `customer_checkout__element-order-table-unit-price-${index}`
          }
        >
          R$
          {' '}
          <span
            data-testid={
              `customer_checkout__element-order-table-unit-price-${index}`
            }
          >
            { item.price.replace('.', ',') }
          </span>
        </td>
        <td
          className="product-price-total"
        >
          R$
          {' '}
          <span
            data-testid={
              `customer_checkout__element-order-table-sub-total-${index}`
            }
          >
            { (
              Math.round(item.price * item.quantity * 100) / 100)
              .toFixed(2).replace('.', ',') }
          </span>
        </td>
        {
          checkout && (
            <td>
              <Button
                className="btn-rm"
                dataTestId={ `customer_checkout__element-order-table-remove-${index}` }
                onAction={ () => this.handleDeleteItem(item.id, listItems) }
              >
                Remover
              </Button>
            </td>
          )
        }
      </tr>
    );
  }
}

ProductTableLine.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    totalPrice: PropTypes.string,
  }).isRequired,
  checkout: PropTypes.bool,
  onDeleteItem: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.string,
    totalPrice: PropTypes.string,
  })).isRequired,
};

ProductTableLine.defaultProps = {
  checkout: false,
};

export default ProductTableLine;
