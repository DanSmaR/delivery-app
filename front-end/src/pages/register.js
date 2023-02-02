import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import RegistrationForm from '../components/RegistrationForm';

class Register extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="App">
        <span className="logo">Cadastro</span>
        <RegistrationForm history={ history } />
      </div>
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
