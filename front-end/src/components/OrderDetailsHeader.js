import React from 'react';
import PropTypes from 'prop-types';

class OrderDetailsHeader extends React.Component {
  render() {
    const { status, saleDate, sellerName, id, isSeller, pathname } = this.props;
    const formattedSaleDate = new Date(saleDate).toLocaleDateString('pt-BR');

    return (
      <>
        <span>
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
            <span>
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
          data-testid={
            `${pathname}_order_details__element-order-details-label-order-date`
          }
        >
          { formattedSaleDate }
        </span>
        <span
          data-testid={
            `${pathname}_order_details__element-order-details-label-delivery-status${id}`
          }
        >
          { status }
        </span>
      </>
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
