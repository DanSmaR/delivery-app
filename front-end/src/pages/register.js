import PropTypes from 'prop-types';
import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

class Register extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main>
        <div className="register">
          <span className="animation">Cadastro</span>
          <RegistrationForm history={ history } />
        </div>
      </main>
    );
  }
}

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Register;
