// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from './locators';
import patio from './locatorsDss';

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://barrigareact.wcaquino.me/');
    cy.get(loc.LOGIN.USER).type('rodrigo.paluma@gmail.com', {delay:30});
    cy.get(loc.LOGIN.PASSWORD).type('CypressNow', {delay:30});
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo');
});

Cypress.Commands.add('loginDss', (email, password) => {
    cy.visit('http://localhost:4200/login');
    cy.get(patio.LOGIN.USERNAME).type('rodrigo.paluma@nitryx.com', {delay:30});
    cy.get(patio.LOGIN.PASSWORD).type('405070Ble', {delay:30});
    cy.get(patio.LOGIN.DIVISION).click();
    cy.get(patio.LOGIN.DIREITA).click();
    cy.get(patio.LOGIN.BTN_LOGIN).click();
    cy.url()
      .should('be.equal', 'http://localhost:4200/ght')
});

Cypress.Commands.add('clearData', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.RESET).click();
});

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            senha: password,
            redirecionar: false
        }
    }).its('body.token').should('not.be.empty')
    .then(token => {
        Cypress.env('token', token);
        return token
    })
});

Cypress.Commands.add('resetRest', ()=> {
    cy.getToken('rodrigo.paluma@gmail.com','CypressNow').then(token => {
        cy.request({
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            url: '/reset'
        }).its('status').should('be.equal', 200)
    }) 
});

Cypress.Commands.add('getAccountByName', name => {
    cy.getToken('rodrigo.paluma@gmail.com','CypressNow').then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res =>{
            return res.body[0].id;
        })
    })
});

/* Cypress.Commands.add('getTransactionByName', name => {
    cy.getToken('rodrigo.paluma@gmail.com','CypressNow').then(token => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                descricao: name
            }
        }).then(res =>{
            return res.body[0].id;
        })
    })
}) */

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1) {
        if(Cypress.env('token')){
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }

    return originalFn(...options);
})