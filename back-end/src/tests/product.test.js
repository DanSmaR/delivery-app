const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http')
const app =  require('../api/app')
const { Product } = require('../database/models')
const { saidaMockada, productsMockado } = require('./__mocks__/productsMock')

chai.use(chaiHttp)

const { expect } = chai

describe('Testa a rota de /products', () => {
    afterEach(sinon.restore)

    it('Verificando se todos os produtos são retornados corretamente', async () => {
        sinon.stub(Product, 'findAll').resolves(productsMockado)
        let chaiHttpResponse = await chai.request(app).get('/products')

        expect(chaiHttpResponse.status).to.be.equal(200)
        expect(chaiHttpResponse.body).to.be.deep.equal(saidaMockada)
    })
})
