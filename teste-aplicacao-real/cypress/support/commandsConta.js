import loc from './locators';

// Comandos de Conta
Cypress.Commands.add('navContas', () => {
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
})

Cypress.Commands.add('createConta', conta => {
    cy.get(loc.CONTAS.NOME).type(conta, {delay:50});
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso');
})

Cypress.Commands.add('editConta', () => {})

Cypress.Commands.add('deleteConta', () => {})

