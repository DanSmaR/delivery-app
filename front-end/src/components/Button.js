import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    const { onAction } = this.props;
    onAction();
  };

  handleIsDisabled = () => {
    const { onCheckIsDisabled } = this.props;
    return onCheckIsDisabled();
  };

  render() {
    const { children, submit, dataTestId, className } = this.props;
    return (
      <button
        type={ submit ? 'submit' : 'button' }
        data-testid={ dataTestId }
        onClick={ !submit ? this.handleClick : () => {} }
        disabled={ this.handleIsDisabled() }
        className={ className }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  submit: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  onCheckIsDisabled: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  submit: false,
  onCheckIsDisabled: () => false,
  className: '',
  onAction: () => {},
};

export default Button;
