/// <reference types ="cypress" />

import loc from './../support/locators';
import '../support/commandsConta'

describe('Teste em nível funcional', () => {
    before(()=>{
        cy.login()
        cy.clearData()
    });

    /* it('Login', function() {
        cy.visit('https://barrigareact.wcaquino.me/');
        cy.fixture('userData').as('usuario').then(()=>{
            cy.get('[data-test=email]').type(this.usuario.email, {delay:100});
            cy.get('[data-test=passwd]').type(this.usuario.password, {delay:100});
            cy.get('.btn').click();
            cy.get('.toast-message').should('contain', 'Bem vindo');
        })
    }); */

    it('Cadastro de Conta', () => {
        cy.navContas();
        cy.createConta('Conta Corrente Bradesco');
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');
    });

    it('Edição de Conta', () => {
        cy.navContas();
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Corrente Bradesco - Editado', {delay:50});
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso');
    });

    it('Should not create an account with same name', () => {
        cy.navContas();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Corrente Bradesco - Editado', {delay:50});
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'code 400');
    });

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTOS).click();
        cy.get(loc.MOVIMENTOS.DESCRICAO).type('Descrição',{delay:50});
        cy.get(loc.MOVIMENTOS.INTERESSADO).type('Eu Mesmo',{delay:50});
        cy.get(loc.MOVIMENTOS.VALOR).type('500',{delay:50});
        cy.get(loc.MOVIMENTOS.SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'sucesso');

        //cy.clearData();
    });

    
});