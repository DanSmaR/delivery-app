const mockOrder = [
  {
    "id": 1,
    "userId": 4,
    "sellerId": 2,
    "totalPrice": "19.40",
    "deliveryAddress": "Jose Ruz Ruiz",
    "deliveryNumber": "210",
    "saleDate": "2023-01-31T22:50:11.000Z",
    "status": "Pendente"
  },
  {
    "id": 2,
    "userId": 4,
    "sellerId": 2,
    "totalPrice": "21.40",
    "deliveryAddress": "Jose Ruz Ruiz",
    "deliveryNumber": "210",
    "saleDate": "2023-01-31T22:55:11.000Z",
    "status": "Pendente"
  },
  {
    "id": 3,
    "userId": 4,
    "sellerId": 2,
    "totalPrice": "121.40",
    "deliveryAddress": "Jose Ruz Ruiz",
    "deliveryNumber": "210",
    "saleDate": "2023-01-31T22:57:11.000Z",
    "status": "Entregue"
  }
];

const mockById = {
    "id": 1,
    "userId": 4,
    "sellerId": 2,
    "totalPrice": "19.40",
    "deliveryAddress": "Jose Ruz Ruiz",
    "deliveryNumber": "210",
    "saleDate": "2023-01-31T22:50:11.000Z",
    "status": "Pendente",
    "products": [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20",
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
        "SaleProduct": {
          "saleId": 1,
          "productId": 1,
          "quantity": 2
        }
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
        "SaleProduct": {
          "saleId": 1,
          "productId": 2,
          "quantity": 2
        }
      }
    ],
    "seller": {
      "id": 2,
      "name": "Fulana Pereira",
      "email": "fulana@deliveryapp.com",
      "password": "3c28d2b0881bf46457a853e0b07531c6",
      "role": "seller"
    }
  }

const mockData = {
  data: {
    id: 4,
    name: 'Bruno Diniz Tomaz',
    email: 'tomaz.bruno@gmail.com',
    role: 'customer',
    iat: 1675205052,
    exp: 1675211052
  },
};

const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkJydW5vIERpbml6IFRvbWF6IiwiZW1haWwiOiJ0b21hei5icnVub0BnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzUyMDUwNTIsImV4cCI6MTY3NTIxMTA1Mn0.dMibq-DgABLflCFtR6_SXaq9dBmbtAXp3YIP3QBPJao"

module.exports = { mockOrder, mockData,  mockToken, mockById };