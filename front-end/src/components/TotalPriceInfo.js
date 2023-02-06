import PropTypes from 'prop-types';
import React from 'react';

class TotalPriceInfo extends React.Component {
  render() {
    const { children, dataTestId } = this.props;
    return (
      <article className="total-price-info">
        <p>
          Total: R$
          {' '}
          <span
            data-testid={ dataTestId }
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
  dataTestId: PropTypes.string.isRequired,
};

export default TotalPriceInfo;
