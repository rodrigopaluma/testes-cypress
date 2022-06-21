/// <reference types ="cypress" />

describe('Work with alerts', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('Desafio - Valida msg',()=>{

        const stub =  cy.stub().as('Alerta');
       
        cy.on('window:alert', stub);
        
        cy.get('#formCadastrar').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio');
        });
        
        cy.get('#formNome').type('Cypress',{delay: 100}).should('have.value','Cypress');
        cy.get('#formCadastrar').click().then(()=>{
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio');
        });       
        
        cy.get('[data-cy=dataSobrenome]').type('eh Muito Foda',{delay: 100}).should('have.value','eh Muito Foda');
        cy.get('#formCadastrar').click().then(()=>{
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio');
        });

        cy.get('#formSexoMasc').click();
        cy.get('#formCadastrar').click();
        cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!');
        
    });

});