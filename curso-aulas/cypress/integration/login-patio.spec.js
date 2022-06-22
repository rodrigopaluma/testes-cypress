/// <reference types ="cypress" />

describe('Acesso ao Login do Pátio DSS', ()=>{

    before(()=>{
        cy.visit('http://localhost:4200/login');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('Acesso ao Login', ()=>{
        cy.title().should('be.equal','NitroYard - PátioDSS');
        cy.get('.mat-form-field.ng-tns-c164-0 > .mat-form-field-wrapper > .mat-form-field-flex').type('rodrigo.paluma@nitryx.com',{delay: 100});
        cy.get('.mat-form-field.ng-tns-c164-1 > .mat-form-field-wrapper > .mat-form-field-flex').type('405070Ble',{delay: 100});
        cy.get('.mat-form-field-type-mat-select > .mat-form-field-wrapper > .mat-form-field-flex').click();
        cy.get('#mat-option-0')
            .click()
            .select('Margem Direita')
            .find('.mat-select-min-line')
            //.should('have.value','Margem Direita');
        cy.get('form.ng-dirty > .btn-entrar').click();
    });
});