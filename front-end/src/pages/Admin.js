import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import RegistrationForm from '../components/RegistrationForm';

class Admin extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <header>
          <Navbar history={ this.props } />
        </header>
        <main>
          <section>
            <h3>Cadastrar novo usuário</h3>
            <RegistrationForm history={ history } />
          </section>
        </main>
      </>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Admin;
