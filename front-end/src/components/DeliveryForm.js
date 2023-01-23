import React from 'react';
import PropTypes from 'prop-types';

class DeliveryForm extends React.Component {
  render() {
    const { sellersList } = this.props;
    return (
      <div>Form</div>
    );
  }
}

DeliveryForm.propTypes = {
  sellersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

export default DeliveryForm;
