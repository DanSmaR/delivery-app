import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    const { onAction } = this.props;
    onAction();
  };

  render() {
    const { children, submit, dataTestid } = this.props;
    return (
      <button
        type={ submit ? 'submit' : 'button' }
        data-testid={ dataTestid }
        onClick={ this.handleClick }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  submit: PropTypes.bool.isRequired,
  dataTestid: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Button;
