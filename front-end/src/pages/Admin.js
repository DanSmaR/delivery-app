import React from 'react';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

class Admin extends React.Component {
  render() {
    return (
      <>
        <header>
          <Navbar history={ this.props } />
        </header>
        <main>
          <section>
            <h3>Cadastrar novo usuário</h3>
            <RegisterForm history={ this.props } />
          </section>
        </main>
      </>
    );
  }
}

export default Admin;
