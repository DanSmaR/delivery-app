import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../../pages/login';
import {
  cartStringfied,
  sellerResponseData,
  userStringfied,
} from '../helpers/constants';
import instance from '../../helpers/instance';

describe('Testando a página de Checkout', () => {
  const getAddressInput = () => screen.getByRole('textbox', { name: /Endereço/i });
  const getNumberInput = () => screen.getByRole('spinbutton', { name: /Número/i });
  const getSelectInput = () => screen.getByRole('combobox', { name: /P. Vendedora Responsável:/i });
  const getRemoveBtn = () => screen.getByRole('button', { name: /remover/i });
  const getOrderBtn = () => screen.getByRole('button', { name: /Finalizar Pedido/i });

  describe('Testando a existência do formulário de entrega e tabela de'
    + ' produtos adicionados ao carrinho na página de produtos', () => {
    beforeEach(() => {
      instance.get.mockImplementationOnce(() => Promise.resolve(sellerResponseData));
      localStorage.getItem.mockRestore();
      localStorage.getItem.mockReturnValueOnce(cartStringfied);
      localStorage.getItem.mockReturnValueOnce(userStringfied);
      renderWithRouter(<App />, { initialEntries: ['/customer/checkout'] });
    });
    it('Deve existir um formulário de Entrega com input de texto para'
      + ' Endereço, um input de number para Número do Endereço e'
      + 'um botão de Finalizar Pedido desabilitado', async () => {
      expect(getAddressInput()).toBeInTheDocument();
      expect(getNumberInput()).toBeInTheDocument();
      expect(getSelectInput()).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: /Detalhes e Endereço para Entrega/i }));
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
