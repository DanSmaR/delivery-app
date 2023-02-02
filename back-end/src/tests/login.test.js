const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http')
const app =  require('../api/app')
const { User } = require('../database/models')
const jwt = require('jsonwebtoken')
const { mockUser, mockOutput, mockToken  } = require('./__mocks__/loginMocks');

chai.use(chaiHttp)

const { expect } = chai

describe('Testa a rota /login', () => {
    afterEach(sinon.restore)

    beforeEach(() => {
        sinon.stub(jwt, 'sign').onFirstCall().returns(mockToken)
    })
        afterEach(() => {
            sinon.restore();
        });

    it('Verificando se o login foi realizado com sucesso', async () => {
        sinon.stub(User, 'findOne').resolves(mockUser)

        let chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'grupoalegria@gmail.com',
            password: 'senhamock'
        })
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(mockOutput)
    })

    it('Verificando se o email foi passado', async () => {
        sinon.stub(User, 'findOne').resolves(undefined)

        let chaiHttpResponse = await chai.request(app).post('/login').send({
            password: 'senhamock'
        })
        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found'})
    })

    it('Verificando se a senha estar incorreta', async () => {
        sinon.stub(User, 'findOne').resolves(undefined)
        let chaiHttpResponse = await chai.request(app).post('/login').send({
            password: 'socorro',
        })
        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found'})
    })

    it('Verificando se existe um email', async () => {
        sinon.stub(User, 'findOne').resolves(undefined)
        let chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'grupoalegriaok@gmail.com',
            password: 'senhaforte123',
        })
        expect(chaiHttpResponse.status).to.be.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Not found'})
    })
})