import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../../pages/login';
// import { emailValid } from '../helpers/constants';

describe('Testando a página de Login', () => {
  describe('Testando a existência do formulário na página', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    const getEmailInput = () => screen.getByTestId('common_login__input-email');
    const getPasswordINput = () => screen.getByTestId('common_login__input-password');
    const loginBtn = () => screen.getByRole('button', { name: /login/i });
    const registerBtn = () => screen.getByRole('button', { name: /Ainda não tenho conta/i });

    it('Deve existir um formulário de Login com input de test e email', () => {
      screen.logTestingPlaygroundURL();
      expect(getEmailInput()).toBeInTheDocument();
      expect(getPasswordINput()).toBeInTheDocument();
      expect(loginBtn()).toBeInTheDocument();
      expect(registerBtn()).toBeInTheDocument();
    });
  });
});
