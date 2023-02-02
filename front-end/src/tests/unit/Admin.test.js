import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../../pages/login';
import {
  emailValid,
  passwordValid,
  role,
  validToken,
  validUseName,
  usersList } from '../helpers/constants';
import instance from '../../helpers/instance';

describe('Testando a pagina do administrador', () => {
  const getNameInput = () => screen.getByTestId('admin_manage__input-name');
  const getEmailInput = () => screen.getByTestId('admin_manage__input-email');
  const getPasswordInput = () => screen.getByTestId('admin_manage__input-password');
  const getTypeSelect = () => screen.getByTestId('admin_manage__select-role');
  const getRegisterBtn = () => screen.getByRole('button', { name: /cadastrar/i });

  const userDataResponse = {
    data: {
      token: validToken,
      id: 4,
      email: validUseName,
      name: emailValid,
      role: role.admin,
    },
  };

  const userStringfied = JSON.stringify(userDataResponse.data);

  describe('Testando a existência do formulário na página', () => {
    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/admin/manage'] });
    });

    it('Deve existir um formulário de cadastro com input de name,'
      + 'de email, de password, um select do tipo'
      + ', um botão de cadastro desabilitado e uma tabela com usuários', async () => {
      expect(getNameInput()).toBeInTheDocument();
      expect(getEmailInput()).toBeInTheDocument();
      expect(getPasswordInput()).toBeInTheDocument();
      expect(getTypeSelect()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeDisabled();

      await waitFor(() => {
        expect(instance.get)
          .toHaveBeenCalledWith('user/admin');
        expect(instance.get).toHaveBeenCalledTimes(1);

        usersList.forEach((user, index) => {
          expect(screen
            .findByTestId(`admin_manage__element-user-table-item-number-${index}`))
            .toHaveTextContent(user.id);
          expect(screen
            .findByTestId(`admin_manage__element-user-table-name-${index}`))
            .toHaveTextContent(user.name);
          expect(screen
            .findByTestId(`admin_manage__element-user-table-email-${index}`))
            .toHaveTextContent(user.email);
          expect(screen
            .findByTestId(`admin_manage__element-user-table-role-${index}`))
            .toHaveTextContent(user.role);
          expect(screen
            .findByTestId(`admin_manage__element-user-table-remove-${index}`))
            .toHaveTextContent(/excluir/i);
        });
      });
    });
  });

  describe('Testando o cadastro de novo usuário com dados corretos'
    + ' no formulário', () => {
    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/admin/manage'] });
      instance.post.mockImplementation(() => Promise.resolve(userDataResponse));
      localStorage.getItem.mockRestore();
      localStorage.getItem.mockReturnValueOnce(userStringfied);
    });

    it('deve enviar uma requisição válida com os dados do usuário '
      + 'e ser adicionado na lista de usuários', async () => {
      userEvent.type(getNameInput(), validUseName);
      userEvent.type(getEmailInput(), emailValid);
      userEvent.type(getPasswordInput(), passwordValid);
      userEvent.selectOptions(getTypeSelect(), [screen.findByText(role.admin)]);
      expect(getRegisterBtn()).not.toBeDisabled();

      userEvent.click(getRegisterBtn());

      await waitFor(() => {
        expect(instance.post)
          .toHaveBeenCalledWith('register', {
            name: validUseName,
            email: emailValid,
            password: passwordValid,
            role: role.admin }, {
            headers: { Authorization: validToken },
          });
        expect(instance.post).toHaveBeenCalledTimes(1);

        expect(screen
          .findByTestId(`admin_manage__element-user-table-item-number-
            ${usersList.length}`))
          .toHaveTextContent(usersList.length + 1);
        expect(screen
          .findByTestId(`admin_manage__element-user-table-name-
            ${usersList.length}`))
          .toHaveTextContent(validUseName);
        expect(screen
          .findByTestId(`admin_manage__element-user-table-email-
            ${usersList.length}`))
          .toHaveTextContent(emailValid);
        expect(screen
          .findByTestId(`admin_manage__element-user-table-role-
            ${usersList.length}`))
          .toHaveTextContent(role.admin);
        expect(screen
          .findByTestId(`admin_manage__element-user-table-remove-
            ${usersList.length}`))
          .toHaveTextContent(/excluir/i);
      });
    });
    it('deve deletar um dos usuários', async () => {
      expect(screen
        .findByTestId('admin_manage__element-user-table-name-1'))
        .toHaveTextContent('Fulana Pereira');

      const deleteButton = () => screen
        .findByTestId('admin_manage__element-user-table-remove-1');

      userEvent.click(deleteButton());

      await waitFor(() => {
        expect(instance.post)
          .toHaveBeenCalledWith(
            'user/admin/1',
            {},
            { headers: { Authorization: validToken } },
          );
        expect(instance.post).toHaveBeenCalledTimes(1);

        expect(screen
          .findByTestId('admin_manage__element-user-table-name-1'))
          .toHaveTextContent('Cliente Zé Birita');
      });
    });
  });

  beforeAll(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  beforeEach(() => {
    localStorage.getItem.mockReturnValueOnce(null);
  });

  afterAll(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem.mockClear();
    Storage.prototype.getItem.mockClear();
  });
});
