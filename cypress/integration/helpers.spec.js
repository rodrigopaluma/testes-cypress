/// <reference types ="cypress" />

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20};
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property', 'nome');

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        //cy.get('#formNome').type('funciona?');
        /* cy.get('#formNome').then($el => {
            cy.wrap($el).type('funciona via cypress');
        }); */


        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10);
            },500);
        });

        cy.get('#buttonSimple').then(()=> console.log('Encontrei o primeiro botão'));
        //promise.then(num => console.log(num));
        cy.wrap(promise).then(num => console.log(num));
        cy.get('#buttonList').then(()=> console.log('Encontrei o segundo botão'));

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2);
    });

    it('Its...', ()=>{
        const obj = { nome: 'User', idade: 20};
        cy.wrap(obj).should('have.property', 'nome', 'User');
        cy.wrap(obj).its('nome').should('be.equal', 'User');

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'Rua dos Bobos' }};
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'Bobos');
        cy.wrap(obj2).its('endereco.rua').should('contain', 'Bobos');

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.title().its('length').should('be.equal', 20);
    })
})