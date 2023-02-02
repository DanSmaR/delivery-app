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
  validUseName } from '../helpers/constants';
import instance from '../../helpers/instance';

describe('Testando a pagina de registro de novos clientes', () => {
  const getNameInput = () => screen.getByTestId('common_register__input-name');
  const getEmailInput = () => screen.getByTestId('common_register__input-email');
  const getPasswordInput = () => screen.getByTestId('common_register__input-password');
  const getRegisterBtn = () => screen.getByRole('button', { name: /cadastrar/i });

  const userDataResponse = {
    data: {
      token: validToken,
      id: 4,
      email: validUseName,
      name: emailValid,
      role: role.customer,
    },
  };

  const userStringfied = JSON.stringify(userDataResponse.data);

  describe('Testando a existência do formulário na página', () => {
    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/register'] });
    });

    it('Deve existir um formulário de cadastro com input de name, de email e password,'
    + 'um botão de cadastro desabilitado', () => {
      expect(getEmailInput()).toBeInTheDocument();
      expect(getPasswordInput()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeInTheDocument();
      expect(getRegisterBtn()).toBeDisabled();
    });
  });

  describe('Testando o cadastro de novo usuário com dados corretos'
    + ' no formulário', () => {
    beforeEach(() => {
      renderWithRouter(<App />, { initialEntries: ['/register'] });
      instance.post.mockImplementation(() => Promise.resolve(userDataResponse));
      localStorage.getItem.mockRestore();
      localStorage.getItem.mockReturnValueOnce(userStringfied);
    });

    it('deve enviar uma requisição válida com os dados do usuário '
      + 'e ser redirecionado para a página de produtos', async () => {
      userEvent.type(getNameInput(), validUseName);
      userEvent.type(getEmailInput(), emailValid);
      userEvent.type(getPasswordInput(), passwordValid);
      expect(getRegisterBtn()).not.toBeDisabled();

      userEvent.click(getRegisterBtn());

      await waitFor(() => {
        expect(instance.post)
          .toHaveBeenCalledWith('register', {
            name: validUseName,
            email: emailValid,
            password: passwordValid,
            role: role.customer }, {
            headers: { Authorization: '' },
          });
        expect(instance.post).toHaveBeenCalledTimes(1);
        const navProductsLink = screen
          .getByTestId('customer_products__element-navbar-link-products');
        expect(navProductsLink)
          .toHaveTextContent('Produtos');
        screen.logTestingPlaygroundURL();
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
