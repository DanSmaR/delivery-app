import PropTypes from 'prop-types';
import React from 'react';

class OrderDetailsHeader extends React.Component {
  render() {
    const { status, saleDate, sellerName, id, isSeller, pathname } = this.props;
    const formattedSaleDate = new Date(saleDate).toLocaleDateString('pt-BR');

    return (
      <div className="forms-full order-details">
        <span className="forms-child-non-basis">
          Pedido
          {' '}
          <span
            data-testid={
              `${pathname}_order_details__element-order-details-label-order-id`
            }
          >
            { id }
          </span>
          ;
        </span>
        {
          !isSeller && (
            <span className="forms-child-non-basis">
              P. Vend:
              {' '}
              <span
                data-testid={
                  `${pathname}_order_details__element-order-details-label-seller-name`
                }
              >
                { sellerName }
              </span>
            </span>
          )
        }
        <span
          className="forms-child-non-basis"
          data-testid={
            `${pathname}_order_details__element-order-details-label-order-date`
          }
        >
          { formattedSaleDate }
        </span>
        <span
          className="forms-child-non-basis delivery-status"
          data-testid={
            `${pathname}_order_details__element-order-details-label-delivery-status${id}`
          }
        >
          { status }
        </span>
      </div>
    );
  }
}

OrderDetailsHeader.propTypes = {
  id: PropTypes.number.isRequired,
  sellerName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  isSeller: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
};

OrderDetailsHeader.defaultProps = {
  isSeller: false,
};

export default OrderDetailsHeader;
