import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../../pages/login';
import {
  sellerData,
} from '../helpers/constants';
import instance from '../../helpers/instance';

describe('Testando a página de Checkout', () => {
  const getAddressInput = () => screen.getByTestId('common_register__input-name');
  const getNumberInput = () => screen.getByTestId('common_register__input-email');
  const getSelectInput = () => screen.getByTestId('common_register__input-password');
  const getRemoveBtn = () => screen.getByRole('button', { name: /remover/i });
  const getOrderBtn = () => screen.getByRole('button', { name: /Finalizar Pedido/i });

  const sellerResponseData = {
    data: [sellerData],
  };

  const userStringfied = JSON.stringify(userDataResponse.data);

  describe('', () => {
    it('', async () => {

    });
  });
});
