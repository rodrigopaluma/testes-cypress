/// <reference types ="cypress" />

import patio from './../support/locatorsDss';

describe('Teste Cache Manobra através de Pesquisa', () => {
    before(()=>{
        cy.loginDss();
    });

    it('Verifica Cache', () => {
        cy.closeAllTabs()
    });
});