/// <reference types ="cypress" />

describe('Work with alerts', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('...',()=>{
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]');
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input');
        cy.get('[onclick*=\'Francisco\']').click()
        cy.get("[onclick*=\'Francisco\']").click()
    });
});