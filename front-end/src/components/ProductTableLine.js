import React from 'react';
import PropTypes from 'prop-types';
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
        <th
          className="product-counter"
          data-testid={
            `customer_checkout__element-order-table-item-number-${index}`
          }
        >
          { index }
        </th>
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
          className="product-price"
          data-testid={
            `customer_checkout__element-order-table-unit-price-${index}`
          }
        >
          R$
          { }
          <span
            data-testid={
              `customer_checkout__element-order-table-unit-price-${index}`
            }
          >
            { item.price }
          </span>
        </td>
        <td
          className="product-price-total"
        >
          R$
          { }
          <span
            data-testid={
              `customer_checkout__element-order-table-sub-total-${index}`
            }
          >
            { Math.round(item.price * item.quantity * 100) / 100 }
          </span>
        </td>
        {
          checkout && (
            <td>
              <Button
                submit
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
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  checkout: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
};

export default ProductTableLine;
