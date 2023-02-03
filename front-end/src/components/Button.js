import PropTypes from 'prop-types';
import React from 'react';

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
    const { children, submit, dataTestId, className, ariaLabel } = this.props;
    return (
      <button
        aria-label={ ariaLabel || null }
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
  children: PropTypes.node.isRequired,
  submit: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  onCheckIsDisabled: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

Button.defaultProps = {
  submit: false,
  onCheckIsDisabled: () => false,
  className: '',
  onAction: () => {},
  ariaLabel: '',
};

export default Button;
