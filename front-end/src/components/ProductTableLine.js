import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class ProductTableLine extends React.Component {
  render() {
    const { index, description, quantity, price, checkout } = this.props;
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
          { description }
        </td>
        <td
          className="product-quantity"
          data-testid={
            `customer_checkout__element-order-table-quantity-${index}`
          }
        >
          { quantity }
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
            { price }
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
            { Math.round(price * quantity * 100) / 100 }
          </span>
        </td>
        {
          checkout && <td><Button submit>Remover</Button></td>
        }
      </tr>
    );
  }
}

ProductTableLine.propTypes = {
  index: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  checkout: PropTypes.bool.isRequired,
};

export default ProductTableLine;
