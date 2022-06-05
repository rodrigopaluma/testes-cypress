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
    });

    it('Uso do find',()=>{
        cy.get('#buttonList').click();
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1');
        cy.get('#lista li span')
            .should('contain','Item 2');
    });

    it('Uso do find via DOM',()=>{
        cy.get('#buttonListDOM').click();
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1');
        cy.get('#lista li span')
            .should('contain','Item 2');
    });
})