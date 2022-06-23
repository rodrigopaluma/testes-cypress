import loc from './locators';

Cypress.Commands.add('navContas', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
})

Cypress.Commands.add('navHome', () => {
    cy.get(loc.MENU.HOME).click();
})

Cypress.Commands.add('navMov', () => {
    cy.get(loc.MENU.MOVIMENTOS).click();
})

Cypress.Commands.add('navExtrato', () => {
    cy.get(loc.MENU.EXTRATO).click();
})

Cypress.Commands.add('navLogout', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.LOGOUT).click();
})