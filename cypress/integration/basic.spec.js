/// <reference types ="cypress" />

describe('Cypress Basic', ()=>{
    it('Should visit a page and assert title', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        
        cy.title().should('be.equal','Campo de Treinamento');
        cy.title().should('contain','Campo');

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo');

        //TODO imprimir o title no console
        //TODO escrever o title em um campo de texto
    })
})