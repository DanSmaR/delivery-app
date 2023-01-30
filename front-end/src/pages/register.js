import React from 'react';
import '../App.css';
import RegisterForm from '../components/RegisterForm';

class Register extends React.Component {
  render() {
    return (
      <div className="App">
        <span className="logo">Cadastro</span>
        <RegisterForm history={ this.props } />
      </div>
    );
  }
}

export default Register;
