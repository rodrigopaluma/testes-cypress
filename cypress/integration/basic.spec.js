/// <reference types ="cypress" />

describe('Cypress Basic', ()=>{
    it.only('Should visit a page and assert title', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.pause();
        
        cy.title().should('be.equal','Campo de Treinamento');
        cy.title().should('contain','Campo').debug();

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo');

        //TODO imprimir o title no console
        //TODO escrever o title em um campo de texto
    });

    it('Should find and interact with an element', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#buttonSimple')
            .click()
            .should('have.value','Obrigado!');
    });
})