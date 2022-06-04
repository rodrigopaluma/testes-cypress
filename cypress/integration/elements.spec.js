/// <reference types ="cypress" />

describe('Work with basic elements', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('Texts', ()=>{
        cy.get('body').should('contain','Cuidado');
        cy.get('span').should('contain','Cuidado');
        cy.get('.facilAchar').should('contain','Cuidado');
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...');
    });

    it('Links', ()=>{
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text','Voltou!');
        
        cy.reload();
        cy.get('#resultado').should('have.not.text','Voltou!');
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text','Voltou!');
    });

    it.only('Text Fields', ()=>{
        cy.get('#formNome').type('Cypress');
        cy.get('#formNome').should('have.value','Cypress');
        cy.get('[data-cy=dataSobrenome]').type('Test');
        cy.get('[data-cy=dataSobrenome]').should('have.value','Test');
        cy.get('#formSexoMasc').click();
        cy.get('#formSexoMasc').should('be.checked');
        cy.get('#formComidaPizza').click();
        cy.get('#formComidaPizza').should('be.checked');

        cy.get('#elementosForm\\:sugestoes')
            .type('Teste de Cypress')
            .should('have.value','Teste de Cypress');

        cy.get(':nth-child(2) > :nth-child(6) > input')
            .type('Teste de Cypress12{backspace}{backspace}')
            .should('have.value','Teste de Cypress');

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Apenas um Teste de Cypress com limpeza de campo')
            .should('have.value','Apenas um Teste de Cypress com limpeza de campo');


        cy.get(':nth-child(2) > :nth-child(6) > input')
            .clear()
            .type('Erro{selectall}Acerto', {delay: 100})
            .should('have.value','Acerto');
    })
})