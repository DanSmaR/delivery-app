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
  usersList,
  userListResponseData } from '../helpers/constants';
import instance from '../../helpers/instance';

describe('Testando a pagina do administrador', () => {
  const getNameInput = () => screen.getByRole('textbox', { name: /Nome/i });
  const getEmailInput = () => screen.getByRole('textbox', { name: /Email/i });
  const getPasswordInput = () => screen.getByLabelText('Senha');
  const getSelectInput = () => screen.getByRole('combobox', { name: /Tipo/i });
  const getRegisterBtn = () => screen.getByRole('button', { name: /cadastrar/i });
  const getSelectOption = (name) => screen.getByRole('option', { name });
  const getAllTableCells = (name) => screen.getAllByRole('cell', { name });
  const getTableCell = (name) => screen.getByRole('cell', { name });
  const getAllRemoveBtns = () => screen.getAllByRole('button', { name: /excluir/i });

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

  describe.only('Testando a existência do formulário na página', () => {
    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/admin/manage'] });
    });

    it('Deve existir um formulário de cadastro com input de name,'
      + 'de email, de password, um select do tipo'
      + ', um botão de cadastro desabilitado e uma tabela com usuários', async () => {
      expect(getNameInput()).toBeInTheDocument();
      expect(getEmailInput()).toBeInTheDocument();
      expect(getPasswordInput()).toBeInTheDocument();
      expect(getSelectInput()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeDisabled();

      await waitFor(() => {
        expect(instance.get)
          .toHaveBeenCalledWith('user/admin');
        expect(instance.get).toHaveBeenCalledTimes(1);

        usersList.forEach((user, index) => {
          expect(screen
            .getByTestId(`admin_manage__element-user-table-item-number-${index}`))
            .toHaveTextContent(user.id);
          expect(screen
            .getByTestId(`admin_manage__element-user-table-name-${index}`))
            .toHaveTextContent(user.name);
          expect(screen
            .getByTestId(`admin_manage__element-user-table-email-${index}`))
            .toHaveTextContent(user.email);
          expect(screen
            .getByTestId(`admin_manage__element-user-table-role-${index}`))
            .toHaveTextContent(user.role);
          expect(screen
            .getByTestId(`admin_manage__element-user-table-remove-${index}`))
            .toHaveTextContent(/excluir/i);
        });
      });
    });
  });

  describe.only('Testando o cadastro de novo usuário com dados corretos'
    + ' no formulário', () => {
    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/admin/manage'] });
      instance.post.mockImplementationOnce(() => Promise.resolve(userDataResponse));
    });

    it.only('deve enviar uma requisição válida com os dados do usuário '
      + 'e ser adicionado na lista de usuários', async () => {
      const increasedUsersListResponse = {
        data: [...userListResponseData.data, {
          id: 4,
          name: validUseName,
          email: emailValid,
          password: '1c37466c159755ce1fa181bd247cb925',
          role: role.admin }],
      };

      userEvent.type(getNameInput(), validUseName);
      userEvent.type(getEmailInput(), emailValid);
      userEvent.type(getPasswordInput(), passwordValid);
      userEvent.selectOptions(getSelectInput(), [getSelectOption('Administrador')]);
      expect(getRegisterBtn()).not.toBeDisabled();

      instance.get.mockRestore();
      instance.get.mockReturnValue(increasedUsersListResponse);
      userEvent.click(getRegisterBtn());

      await waitFor(() => {
        expect(instance.post).toHaveBeenCalledWith('register', {
          name: validUseName,
          email: emailValid,
          password: passwordValid,
          role: role.admin }, {
          headers: { Authorization: validToken },
        });
        expect(instance.post).toHaveBeenCalledTimes(1);
        screen.logTestingPlaygroundURL();
        expect(getTableCell(`${increasedUsersListResponse.data[3].id}`))
          .toHaveTextContent(increasedUsersListResponse.data.length);
        expect(getTableCell(`${increasedUsersListResponse.data[3].name}`))
          .toHaveTextContent(validUseName);
        expect(getTableCell(`${increasedUsersListResponse.data[3].email}`))
          .toHaveTextContent(emailValid);
        expect(getAllTableCells(`${increasedUsersListResponse.data[3].role}`)[1])
          .toHaveTextContent(role.admin);
        expect(getAllRemoveBtns()).toHaveLength(increasedUsersListResponse.data.length);
      });
    });
    it('deve deletar um dos usuários', async () => {
      expect(screen
        .getByTestId('admin_manage__element-user-table-name-1'))
        .toHaveTextContent('Fulana Pereira');

      const deleteButton = () => screen
        .getByTestId('admin_manage__element-user-table-remove-1');

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
    instance.get.mockReturnValue(userListResponseData);
    localStorage.getItem.mockReturnValue(userStringfied);
  });

  afterEach(() => {
    localStorage.getItem.mockRestore();
  });

  afterAll(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem.mockClear();
    Storage.prototype.getItem.mockClear();
  });
});
