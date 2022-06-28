/// <reference types ="cypress" />

describe('Teste no backend', () => {

    let token

    before(()=>{
        cy.getToken('rodrigo.paluma@gmail.com','CypressNow')
            .then(tkn => {
                token = tkn
            })
    });

    beforeEach(()=>{
       cy.resetRest();
    })
    
    it('Cadastro de Conta', () => {

        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: 'Conta via Rest'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via Rest')
        })
    });

    it('Edição de Conta', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'Conta via Rest Editada'
                }
            }).as('response')
        })
        

        cy.get('@response').its('status').should('be.equal', 200)
    });

    it('Criar uma conta com o mesmo nome', () => {
        cy.request({
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            url: '/contas',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    });

    it('Criar uma Transação', () => {

    });

    it('Pegar o Balanço', () => {

    });

    it('Excluir uma Movimentação', () => {

    });

});