import React from 'react';
import PropTypes from 'prop-types';

class TotalPriceInfo extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <article className="total-price-info">
        <p>
          R$
          {' '}
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            { children }
          </span>
        </p>
      </article>
    );
  }
}

TotalPriceInfo.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TotalPriceInfo;
