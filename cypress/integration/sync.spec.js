/// <reference types ="cypress" />

describe('Sincronismo', ()=>{
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('Deve aguardar o elemento estar disponível',()=>{
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        cy.get('#novoCampo').should('exist');
        cy.get('#novoCampo').type('Funciona');
    });

    it('Deve fazer Retrys',()=>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist')
        
        cy.get('#novoCampo')
            .should('exist')
            .type('Funciona');
    })
})