import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import RegistrationForm from '../components/RegistrationForm';
import instance from '../helpers/instance';
import UserTableLine from '../components/UserTableLine';

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const result = await instance.get('user/admin');
    this.setState({
      users: result.data,
    });
  };

  render() {
    const { history } = this.props;
    const { users } = this.state;
    return (
      <>
        <header>
          <Navbar history={ this.props } />
        </header>
        <main>
          <section>
            <h3>Cadastrar novo usuário</h3>
            <RegistrationForm history={ history } getUsers={ this.getUsers } />
          </section>
          <section>
            {
              users.length > 0 ? (
                <table className="table">
                  <thead className="table-head">
                    <tr>
                      <th>Item</th>
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>tipo</th>
                      <th>Excluir</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {
                      users.map((user, i) => (
                        <UserTableLine
                          getUsers={ this.getUsers }
                          key={ i }
                          index={ i }
                          user={ user }
                        />
                      ))
                    }
                  </tbody>
                </table>
              ) : (<h3>Não existem usuários cadastrados</h3>)
            }
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
