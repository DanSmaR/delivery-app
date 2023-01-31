const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http')
const app =  require('../api/app')
const { User } = require('../database/models')
const { mockUserArray } = require('./__mocks__/userMocks')

chai.use(chaiHttp)

const { expect } = chai

describe('Teste da rota de User', () => {
  it('Deve retornar um array de usuários', async () => {
   sinon.stub(User, 'findAll').resolves(mockUserArray)

    const response = await chai.request(app).get('/user').send(role = 'administrator')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.an('array')
    expect(response.body[0]).to.have.property('id')
    expect(response.body[0]).to.have.property('name')
    expect(response.body[0]).to.have.property('role')
    expect(response.body[0].id).to.be.equal(1) 
    expect(response.body[0].name).to.be.equal('Delivery App Admin')
    expect(response.body[0].role).to.be.equal('administrator')

    User.findAll.restore()
  })
})