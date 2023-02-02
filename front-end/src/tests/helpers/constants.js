export const validUseName = 'Cliente da Silva';
export const invalidUserName = 'nam';
export const emailValid = 'user@email.com';
export const emailInvalidList = ['', 'user', 'user@', 'user@mail', 'user@mail.c'];
export const passwordValid = '123456';
export const passwordInvalidList = ['', '12345'];
export const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJpZCI6NCwibmFtZSI6IkRhbmlsbyBNYXJ0aW5zIiwiZW1haWwiOiJkYW5z'
  + 'bTg2QG91dGxvb2suY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjc1M'
  + 'Tg2NDQxLCJleHAiOjE2NzUxOTI0NDF9.wz580Ku8jTiw4VXsEM97jMoZVXRWWf30VOL_X5wXB1c';
export const invalidToken = 'abc';
export const role = {
  customer: 'customer',
  seller: 'seller',
  admin: 'admin',
};

export const sellerData = {
  id: 2,
  name: 'Fulana Pereira',
  role: role.seller,
};

export const cart = [{
  id: 1,
  description: 'Skol Lata 250ml',
  price: '2.20',
  quantity: 3,
  totalPrice: '2.20',
}, {
  id: 2,
  description: 'Heineken 600ml',
  price: '7.50',
  quantity: 4,
  totalPrice: '7.50',
}];

export const userDataResponse = {
  data: {
    token: validToken,
    id: 4,
    email: validUseName,
    name: emailValid,
    role: role.customer,
  },
};

export const sellerResponseData = {
  data: [sellerData],
};

export const userStringfied = JSON.stringify(userDataResponse.data);
export const cartStringfied = JSON.stringify(cart);

export const checkoutTableHeadersTitle = [
  'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
];
