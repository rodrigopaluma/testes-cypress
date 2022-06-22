/// <reference types ="cypress" />

describe('Work with alerts', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it.only('Alert',()=>{
        /* cy.get('#alert').click();
        cy.on('window:alert', msg => {
            expect(msg).to.eq('Alert Simples');
        }); */
        cy.clickAlert('#alert', 'Alert Simples');
    });

    it('Alert com Mock',()=>{
        const stub = cy.stub().as('Alerta'); // Dar nome as interações .as('nome-da-interacao')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples');
        });
    });

    it('Confirm',()=>{
        
        cy.on('window:confirm', msg => {
            expect(msg).to.eq('Confirm Simples');
        });
        cy.on('window:alert', msg => {
            expect(msg).to.eq('Confirmado');
        });

        cy.get('#confirm').click();
    });

    it('Deny',()=>{
        
        cy.on('window:confirm', msg => {
            expect(msg).to.eq('Confirm Simples');
            return false
        });
        cy.on('window:alert', msg => {
            expect(msg).to.eq('Negado');
        });

        cy.get('#confirm').click();
    });

    it('Prompt',()=>{
        cy.window().then(win => {
            cy.stub(win, 'prompt').as('Prompt').returns('42');
        })
        cy.on('window:prompt', msg => {
            expect(msg).to.eq('Era 42?');
        });
        cy.on('window:alert', msg => {
            expect(msg).to.eq(':D');
        });

        cy.get('#prompt').click();
    });
});