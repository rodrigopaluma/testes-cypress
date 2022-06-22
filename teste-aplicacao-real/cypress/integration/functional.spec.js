/// <reference types ="cypress" />

describe('Teste em nível funcional', () => {
    /* before(()=>{
        cy.visit('https://barrigareact.wcaquino.me/');
        cy.get('[data-test=email]').type('rodrigo.paluma@gmail.com', {delay:100});
        cy.get('[data-test=passwd]').type('CypressNow', {delay:100});
        cy.get('.btn').click();
        cy.get('.toast-message').should('exist');
    }); */

    it('Login', function() {
        cy.visit('https://barrigareact.wcaquino.me/');
        cy.fixture('userData').as('usuario').then(()=>{
            cy.get('[data-test=email]').type(this.usuario.email, {delay:100});
            cy.get('[data-test=passwd]').type(this.usuario.password, {delay:100});
            cy.get('.btn').click();
            cy.get('.toast-message').should('contain', 'Bem vindo');
        })
    });
});