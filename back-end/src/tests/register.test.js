const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http')
const app =  require('../api/app')
const { User } = require('../database/models')
const { mockRegister, mockToken, mockOutput, mockUser } = require('../tests/__mocks__/registerMock');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp)

const { expect } = chai


describe('Testa a rota /register', () => {
    afterEach(() => { sinon.restore() });

    it('Verificando se um usuário é registrado com sucesso', async () => {
        sinon.stub(User, 'create').resolves(mockRegister)
        sinon.stub(jwt, 'sign').onFirstCall().returns(mockToken);
        sinon.stub(User, 'findOne').onFirstCall().resolves(undefined).onSecondCall(undefined);

        let chaiHttpResponse = await chai.request(app).post('/register').send({
            name: "Scooby Doo",
            email: "scoobydoo@gmail.com",
            password: "senhaforte123",
            role: "customer"
        })

        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal({
            message: 'Created', user: mockOutput, 
        })
    })     
})

describe.only('Testa a rota /register', () => {
    afterEach(() => { sinon.restore() });

        it('Verificando se um usuário já existe', async () => {
            sinon.stub(User, 'create').resolves(mockRegister)
            sinon.stub(User, 'findOne').onFirstCall().resolves(mockUser);
    
            let chaiHttpResponse = await chai.request(app).post('/register').send({
                name: "Scooby Doo",
                email: "scoobydoo@gmail.com",
                password: "senhaforte123",
                role: "customer"
            })
    
            expect(chaiHttpResponse.status).to.be.equal(409);
            expect(chaiHttpResponse.body).to.be.deep.equal({
                message: 'Conflict'
            })
        })
    })     
