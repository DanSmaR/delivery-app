import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import instance from '../helpers/instance';

class UserTableLine extends React.Component {
  handleDeleteItem = async (id) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    await instance.delete(`user/admin/${id}`, {}, { headers: { Authorization: token } });
    const { getUsers } = this.props;
    getUsers();
  };

  render() {
    const { user, index } = this.props;
    return (
      <tr
        className="table-item"
      >
        <td
          className="product-counter"
          data-testid={
            `admin_manage__element-user-table-item-number-${index}`
          }
        >
          { index + 1 }
        </td>
        <td
          className="product-description"
          data-testid={
            `admin_manage__element-user-table-name-${index}`
          }
        >
          { user.name }
        </td>
        <td
          className="product-quantity"
          data-testid={
            `admin_manage__element-user-table-email-${index}`
          }
        >
          { user.email }
        </td>
        <td
          className="product-quantity"
          data-testid={
            `admin_manage__element-user-table-role-${index}`
          }
        >
          { user.role }
        </td>
        <td>
          <Button
            dataTestId={ `admin_manage__element-user-table-remove-${index}` }
            onAction={ () => this.handleDeleteItem(user.id) }
          >
            Excluir
          </Button>
        </td>
      </tr>
    );
  }
}

UserTableLine.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  getUsers: PropTypes.func.isRequired,
};

export default UserTableLine;
