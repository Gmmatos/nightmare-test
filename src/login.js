const Nightmare = require('nightmare')
const chai = require('chai')
const expect = chai.expect;
const assert = chai.assert;
const loginPage = require('../pages/login-page.js')
 

login = (user, pass, call) => new Promise(function (resolve, reject) {
    const nightmare = Nightmare({ show: false, width: 1920, height: 1080 })

    nightmare
        .goto('https://webapp.getrak.com/getrak')
        .wait(2000)
        .exists(loginPage.logoCentral)
        .type(loginPage.login, user)
        .exists(loginPage.login)
        .type(loginPage.senha, pass)
        .exists(loginPage.senha)
        .click(loginPage.btn)
        .wait(3000) 
        .exists(loginPage.logado)
        .end()
        .then(function(result) {
            call(result)
            resolve(result)
        })
        .catch(function(err) {
            reject(err);
        })
})

describe('Login', function() {
    describe('#cliente()', function() {
        it('Cliente irá logar com sucesso', async function() {
            this.timeout(0)

            call = (result) => {
                assert.isTrue(result, "Login/senha inválidos")
            }

            return Promise.all([login('mobil', '123', call)])
        });
  
        it('Cliente irá logar com error', async function() {
            this.timeout(0)
            
            call = (result) => {
                assert.isFalse(result, "Login/senha inválidos")
            }

            return Promise.all([login('mobil', '1234', call)])
        });
    });

    describe('#subcliente()', function() {
        it('Subcliente irá logar com sucesso', async function() {
            this.timeout(0)

            call = (result) => {
                assert.isTrue(result, "Login/senha inválidos")
            }

            return Promise.all([login('subcliente', '123', call)])
        });
    });
});


