import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { children, submit } = this.props;
    return (
      <button
        type={ submit ? 'submit' : 'button' }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  submit: PropTypes.bool.isRequired,
};

export default Button;
