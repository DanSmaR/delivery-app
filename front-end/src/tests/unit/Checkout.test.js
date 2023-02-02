import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
// import Login from '../../pages/login';
import {
  cart,
  cartStringfied,
  checkoutTableHeadersTitle,
  order,
  orderResponseData,
  sellerResponseData,
  shipAddress,
  userStringfied,
  validToken,
} from '../helpers/constants';
import instance from '../../helpers/instance';
import getTotalPrice from '../../utils/getTotalPrice';

describe('Testando a página de Checkout', () => {
  const getAddressInput = () => screen.getByRole('textbox', { name: /Endereço/i });
  const getNumberInput = () => screen.getByRole('spinbutton', { name: /Número/i });
  const getSelectInput = () => screen.getByRole('combobox', { name: /P. Vendedora Responsável:/i });
  const getSelectOption = (name) => screen.getByRole('option', { name });
  const getTableCell = (name) => screen.getByRole('cell', { name });
  const getTableColumnHeader = (name) => screen.getByRole('columnheader', { name });
  const getRemoveBtns = () => screen.getAllByRole('button', { name: /remover/i });
  const getOrderBtn = () => screen.getByRole('button', { name: /Finalizar Pedido/i });
  const getTotalPriceInfo = () => screen
    .getByTestId('customer_checkout__element-order-total-price');

  describe('Testando a existência do formulário de entrega e tabela de'
    + ' produtos que foram adicionados ao carrinho na página de produtos', () => {
    it('Deve existir um formulário de Entrega com input de texto para'
      + ' Endereço, um input de number para Número do Endereço e'
      + ' um botão de Finalizar Pedido desabilitado', async () => {
      expect(screen.getByRole('heading', { level: 2, name: /Detalhes e Endereço para Entrega/i }));
      expect(getAddressInput()).toBeInTheDocument();
      expect(getNumberInput()).toBeInTheDocument();
      expect(getSelectInput()).toBeInTheDocument();
      sellerResponseData.data.forEach(({ name }) => {
        expect(getSelectOption(name)).toBeInTheDocument();
      });
      expect(getOrderBtn()).toBeInTheDocument();
      expect(getOrderBtn()).toBeDisabled();
    });

    it('Deve existir uma tabela com o nome Finalizar Pedido'
      + ' , com dados sobre os produtos organizados em colunas'
      + ' juntamente com os preços e quantidades, e abaixo o preço total'
      + ' do carrinho', async () => {
      expect(screen.getByRole('heading', { level: 1, name: /Finalizar Pedido/i }));
      getRemoveBtns().forEach((removeBtn) => {
        expect(removeBtn).toBeInTheDocument();
        expect(removeBtn).not.toBeDisabled();
      });
      expect(getRemoveBtns()).toHaveLength(2);
      expect(getTotalPriceInfo()).toBeInTheDocument();
      expect(getTotalPriceInfo()).toHaveTextContent(getTotalPrice(cart));
      expect(getSelectInput()).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
      checkoutTableHeadersTitle.forEach((title) => {
        expect(getTableColumnHeader(title)).toBeInTheDocument();
      });
      cart.forEach((product) => {
        expect(getTableCell(product.id)).toBeInTheDocument();
        expect(getTableCell(product.description)).toBeInTheDocument();
        expect(getTableCell(product.quantity)).toBeInTheDocument();
        expect(getTableCell(`R$ ${product.price.replace('.', ',')}`)).toBeInTheDocument();
        expect(getTableCell(`R$ ${product.totalPrice.replace('.', ',')}`))
          .toBeInTheDocument();
      });
    });
  });

  describe('Testando a remoção de itens do carrinho', () => {
    it('Deve remover da tabela o item removido pelo botão Remover ', async () => {
      const cartWithOneItemStringfied = JSON.stringify(cart[0]);
      localStorage.getItem.mockReturnValueOnce(cartWithOneItemStringfied);
      userEvent.click(getRemoveBtns()[1]);
      const secondItemCart = screen.queryByRole('cell', { name: cart[1].description });
      expect(secondItemCart).toBeNull();
      expect(getTableCell(cart[0].description)).toBeInTheDocument();
    });
  });

  describe('Testando a criação de uma ordem', () => {
    it('Deve criar uma ordem e ir para a página de detalhe do pedido ao'
      + 'preencher corretamente o formulário e clicar em Finalizar Pedido', async () => {
      instance.post.mockImplementationOnce(() => Promise.resolve(orderResponseData));
      userEvent.selectOptions(
        getSelectInput(),
        [getSelectOption(sellerResponseData.data[0].name)],
      );
      userEvent.type(getAddressInput(), shipAddress.address);
      userEvent.type(getNumberInput(), shipAddress.number);

      const orderBtn = getOrderBtn();
      expect(orderBtn).not.toBeDisabled();

      userEvent.click(orderBtn);

      await waitFor(() => {
        expect(instance.post).toHaveBeenCalled();
        expect(instance.post).toHaveBeenCalledTimes(1);
        expect(instance.post).toHaveBeenCalledWith(
          '/customer/orders',
          { ...order, sellerId: String(order.sellerId) },
          { headers: { Authorization: validToken } },
        );
        const orderDetailsHeadingSection = screen
          .getByRole('heading', { level: 1, name: 'Detalhe do Pedido' });
        expect(orderDetailsHeadingSection)
          .toBeInTheDocument();
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
    instance.get.mockImplementationOnce(() => Promise.resolve(sellerResponseData));
    localStorage.getItem.mockReturnValueOnce(cartStringfied)
      .mockReturnValue(userStringfied);
    renderWithRouter(<App />, { initialEntries: ['/customer/checkout'] });
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
