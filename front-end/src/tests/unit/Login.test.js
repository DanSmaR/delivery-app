import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../../pages/login';
import {
  emailInvalidList,
  emailValid,
  passwordInvalidList,
  passwordValid,
  userDataResponse,
  userStringfied,
} from '../helpers/constants';
import instance from '../../helpers/instance';

describe('Testando a página de Login', () => {
  const getEmailInput = () => screen.getByTestId('common_login__input-email');
  const getPasswordInput = () => screen.getByTestId('common_login__input-password');
  const getLoginBtn = () => screen.getByRole('button', { name: /login/i });
  const getRegisterBtn = () => screen.getByRole('button', { name: /Ainda não tenho conta/i });

  describe('Testando a existência do formulário na página', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('Deve existir um formulário de Login com input de email e password,'
      + 'um botão de login desabilitado e um de cadastrar', () => {
      expect(getEmailInput()).toBeInTheDocument();
      expect(getPasswordInput()).toBeInTheDocument();
      expect(getLoginBtn()).toBeInTheDocument();
      expect(getLoginBtn()).toBeDisabled();
      expect(getRegisterBtn()).toBeInTheDocument();
      expect(getRegisterBtn()).not.toBeDisabled();
    });
  });

  describe('Testando a inserção de dados incorretos no formulário na página', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('O botão de login deve permanecer desabilitado ao'
      + ' inserir dados de forma incorreta', () => {
      emailInvalidList.forEach((invalidEmail) => {
        userEvent.type(getEmailInput(), invalidEmail || '{tab}');
        userEvent.type(getPasswordInput(), passwordValid);
        expect(getLoginBtn()).toBeDisabled();
      });

      passwordInvalidList.forEach((invalidPassword) => {
        userEvent.type(getPasswordInput(), invalidPassword || '{tab}');
        userEvent.type(getEmailInput(), emailValid);
        expect(getLoginBtn()).toBeDisabled();
      });
    });
  });

  describe('Testando o login com dados corretos no formulário', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
      instance.post.mockImplementationOnce(() => Promise.resolve(userDataResponse));
    });

    it('deve enviar uma requisição válida com os dados do usuário '
      + 'e ser redirecionado para a página de produtos', async () => {
      userEvent.type(getEmailInput(), emailValid);
      userEvent.type(getPasswordInput(), passwordValid);
      expect(getLoginBtn()).not.toBeDisabled();

      userEvent.click(getLoginBtn());

      await waitFor(() => {
        localStorage.getItem.mockReturnValueOnce(userStringfied);
        expect(instance.post)
          .toHaveBeenCalledWith('login', {
            email: emailValid, password: passwordValid });
        expect(instance.post).toHaveBeenCalledTimes(1);
        const navProductsLink = screen
          .getByTestId('customer_products__element-navbar-link-products');
        expect(navProductsLink)
          .toHaveTextContent('Produtos');
      });
    });
  });

  describe('Testando o redirecionamento para a página de registros'
    + ' de novos clientes', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('Ao clicar no botão de "Ainda não tenho conta", o usuário'
      + 'será redirecionado para a página de registro', async () => {
      userEvent.click(getRegisterBtn());

      await waitFor(() => {
        const registerBtn = screen.getByRole('button', { name: /cadastrar/i });
        expect(registerBtn).toBeInTheDocument();
      });
    });
  });

  describe('Testando o redirecionamento para a página de produtos', () => {
    beforeEach(() => {
      localStorage.getItem.mockRestore();
      localStorage.getItem.mockReturnValue(userStringfied);
      renderWithRouter(<App />);
    });

    it('Deve renderizar página de produtos caso o usuário já esteja logado', async () => {
      await waitFor(() => {
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
