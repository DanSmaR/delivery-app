import getTotalPrice from '../../utils/getTotalPrice';

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
  admin: 'administrator',
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

export const usersList = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  },
];

export const userListResponseData = {
  data: usersList,
};

export const increasedUsersListResponse = {
  data: [...userListResponseData.data, {
    id: 4,
    name: validUseName,
    email: emailValid,
    password: '1c37466c159755ce1fa181bd247cb925',
    role: role.admin }],
};

export const decreasedUsersListResponse = {
  data: [...userListResponseData.data
    .filter(({ id }, _index, users) => id !== users.length)],
};

export const shipAddress = {
  address: 'Avenida José',
  number: '300',
};

export const order = {
  sellerId: sellerData.id,
  deliveryAddress: shipAddress.address,
  deliveryNumber: shipAddress.number,
  totalPrice: getTotalPrice(cart).replace(',', '.'),
  products: cart.map((product) => ({
    id: product.id, quantity: product.quantity })),
};

export const orderResponseData = {
  data: {
    saleDate: '2023-02-02T20:48:44.622Z',
    status: 'Pendente',
    id: 7,
    userId: 4,
    sellerId: 2,
    totalPrice: 44,
    deliveryAddress: 'Rua 1',
    deliveryNumber: 100,
  },
};

export const productsResponseData = { data: [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: '7.50',
    urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: '2.19',
    urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: '4.49',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: '4.99',
    urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: '2.79',
    urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: '8.89',
    urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: '3.57',
    urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: '3.49',
    urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
  },
] };
