import React from 'react';

class TotalPriceInfo extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <article className="total-price-info">
        <p>
          R$
          {' '}
          { children }
        </p>
      </article>
    );
  }
}

TotalPriceInfo.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TotalPriceInfo;
