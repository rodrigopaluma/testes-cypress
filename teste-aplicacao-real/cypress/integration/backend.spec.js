/// <reference types ="cypress" />

describe('Teste no backend', () => {

    before(()=>{
        cy.getToken('rodrigo.paluma@gmail.com','CypressNow')
    });

    beforeEach(()=>{
       cy.resetRest();
    })
    
    it('Cadastro de Conta', () => {

        cy.request({
            method: 'POST',
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
        cy.getAccountByName('Conta para alterar').then(contaId => {
            cy.request({
                url: `/contas/${contaId}`,
                method: 'PUT',
                body: {
                    nome: 'Conta via Rest Editada' // nome da conta alterada
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    });

    it('Criar uma conta com o mesmo nome', () => {
        cy.request({
            method: 'POST',
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
        cy.getAccountByName('Conta para movimentacoes').then(contaId => {
            cy.request({
                method: "POST",
                url: "/transacoes",
                body: {
                  conta_id: contaId,
                  data_pagamento: Cypress.moment().add({days:1}).format('DD/MM/YYYY'),
                  data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                  descricao: 'Teste de Movimentação',
                  envolvido: 'Interessado na Movimentação',
                  status: true,
                  tipo: 'REC',
                  valor: '550',
                },
            }).as("response");
        });

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('conta_id')
            expect(res.body).to.have.property('descricao', 'Teste de Movimentação')
        });
    });

    it('Pegar o Balanço', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo'){
                    saldoConta = c.saldo;
                }
            })
            expect(saldoConta).to.be.equal('534.00')
        });
    });

    it('Excluir uma Movimentação', () => {

            cy.request({
                method: 'GET',
                url: '/transacoes',
                qs: {
                    descricao: 'Movimentacao para exclusao'
                }
            }).then(res =>{
                cy.request({
                    url: `/transacoes/${res.body[0].id}`,
                    method: 'DELETE',
                }).its('status').should('be.equal', 204)
            })

    });

});