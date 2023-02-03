import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import {
  emailValid,
  passwordValid,
  role,
  validToken,
  validUseName,
  usersList,
  userListResponseData,
  increasedUsersListResponse,
  decreasedUsersListResponse } from '../helpers/constants';
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
      expect(getSelectInput()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeDisabled();

      await waitFor(() => {
        expect(instance.get).toHaveBeenCalledWith('user/admin');
        expect(instance.get).toHaveBeenCalledTimes(1);

        usersList.forEach((user, index) => {
          expect(getTableCell(user.id)).toBeInTheDocument();
          expect(getTableCell(user.name)).toBeInTheDocument();
          expect(getTableCell(user.email)).toBeInTheDocument();
          expect(getTableCell(user.role)).toBeInTheDocument();
          expect(getAllRemoveBtns()[index]).toBeInTheDocument();
        });
      });
    });
  });

  describe('Testando o cadastro de novo usuário com dados corretos'
    + ' no formulário', () => {
    it('deve enviar uma requisição válida com os dados do usuário '
      + 'e ser adicionado na lista de usuários', async () => {
      instance.post.mockResolvedValueOnce(userDataResponse);
      userEvent.type(getNameInput(), validUseName);
      userEvent.type(getEmailInput(), emailValid);
      userEvent.type(getPasswordInput(), passwordValid);
      userEvent.selectOptions(getSelectInput(), [getSelectOption('Administrador')]);
      expect(getRegisterBtn()).not.toBeDisabled();

      instance.get.mockResolvedValueOnce(increasedUsersListResponse);
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
        expect(getTableCell(`${increasedUsersListResponse.data[3].id}`))
          .toBeInTheDocument();
        expect(getTableCell(`${increasedUsersListResponse.data[3].name}`))
          .toBeInTheDocument();
        expect(getTableCell(`${increasedUsersListResponse.data[3].email}`))
          .toBeInTheDocument();
        expect(getAllTableCells(`${increasedUsersListResponse.data[3].role}`)[1])
          .toBeInTheDocument();
        expect(getAllRemoveBtns()).toHaveLength(increasedUsersListResponse.data.length);
      });
      instance.post.mockRestore();
    });

    it('deve ser possível deletar um dos usuários', async () => {
      instance.delete.mockResolvedValueOnce({ message: 'user deleted' });
      instance.get.mockResolvedValueOnce(decreasedUsersListResponse);
      expect(getTableCell('Cliente Zé Birita')).toBeInTheDocument();
      userEvent.click(getAllRemoveBtns()[2]);

      await waitFor(() => {
        expect(instance.delete).toHaveBeenCalledWith(
          `user/admin/${usersList.length}`,
          {},
          { headers: { Authorization: validToken } },
        );
        expect(instance.delete).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('cell', { name: /cliente zé birita/i }))
          .toBeNull();
        screen.logTestingPlaygroundURL();
      });
      instance.delete.mockRestore();
    });

    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/admin/manage'] });
    });
  });

  beforeAll(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  beforeEach(() => {
    instance.get.mockResolvedValue(userListResponseData);
    localStorage.getItem.mockReturnValue(userStringfied);
  });

  afterEach(() => {
    localStorage.getItem.mockRestore();
    instance.get.mockRestore();
  });

  afterAll(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem.mockClear();
    Storage.prototype.getItem.mockClear();
  });
});
