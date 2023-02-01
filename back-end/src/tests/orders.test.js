const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http')
const app =  require('../api/app');
const jwt = require('jsonwebtoken');
const { mockToken, mockOrder, mockData, mockById } = require('./__mocks__/orderMock');
const { Sale, SaleProduct } = require('../database/models')

chai.use(chaiHttp)

const { expect } = chai

describe('Testes da rota orders', () => {
  beforeEach(() => { sinon.stub(jwt, 'verify').onFirstCall().returns(mockData)});
  afterEach(() => { sinon.restore() });

  it('verifica se é possível listar os pedidos', async () => {
    sinon.stub(Sale, 'findAll').resolves(mockOrder);
    
    let chaiHttpResponse = await chai.request(app).get('/customer/orders').set('authorization', mockToken);

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.an('array')
    expect(chaiHttpResponse.body).to.have.lengthOf(3)
    expect(chaiHttpResponse.body).to.be.deep.equal(mockOrder)
    
  })
  
  it('verifica se é possível listar os pedidos pelo id', async () => {
    sinon.stub(Sale, 'findByPk').resolves(mockById);
    
    let chaiHttpResponse = await chai.request(app).get('/customer/orders/2')
      .set('authorization', mockToken);

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.an('object')
    expect(chaiHttpResponse.body).to.be.deep.equal(mockById)
    
  })

  it('verifica se é possível criar uma nova order', async () => {
    sinon.stub(Sale, 'create').resolves(mockById);
    sinon.stub(SaleProduct, 'create').resolves();

    let chaiHttpResponse = await chai.request(app).post('/customer/orders').set('authorization', mockToken).send(mockById);

    expect(chaiHttpResponse.status).to.be.equal(201)
    expect(chaiHttpResponse.body).to.be.an('object')
    expect(chaiHttpResponse.body).to.be.deep.equal(mockById)

  })

  it('verifica se é possível atualizar o status de uma order', async () => {
    sinon.stub(Sale, 'update').resolves(mockOrder[2]);
    sinon.stub(Sale, 'findByPk').resolves(mockById);

    let chaiHttpResponse = await chai.request(app).put('/orders/3')
      .set('authorization', mockToken)
      .send({status: 'Entregue'});

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.an('object')
    expect(chaiHttpResponse.body).to.be.deep.equal({ status: mockById.status })

  })
})