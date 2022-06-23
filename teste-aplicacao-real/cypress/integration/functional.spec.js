/// <reference types ="cypress" />

import loc from './../support/locators'

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
        cy.get(loc.MENU.SETTINGS).click();
        cy.get(loc.MENU.CONTAS).click();
        cy.get(loc.CONTAS.NOME).type('Conta Corrente Bradesco', {delay:50});
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');
    });

    it('Edição de Conta', () => {
        //cy.clearData();
        cy.get(loc.MENU.SETTINGS).click();
        cy.get(loc.MENU.CONTAS).click();
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click();
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Corrente Bradesco - Editado', {delay:50});
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso');
    });
});