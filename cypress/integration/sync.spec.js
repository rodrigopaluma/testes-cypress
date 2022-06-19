/// <reference types ="cypress" />

describe('Sincronismo', ()=>{
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('Deve aguardar o elemento estar disponível',()=>{
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        cy.get('#novoCampo').should('exist');
        cy.get('#novoCampo').type('Funciona');
    });

    it('Deve fazer Retrys',()=>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist')
        
        cy.get('#novoCampo')
            .should('exist')
            .type('Funciona');
    });

    it('Uso do find',()=>{
        cy.get('#buttonList').click();
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1');
        cy.get('#lista li span')
            .should('contain','Item 2');
    });

    it('Uso do find via DOM',()=>{
        cy.get('#buttonListDOM').click();
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1');
        cy.get('#lista li span')
            .should('contain','Item 2');
    });

    it('Uso do Timeout',()=>{
        //cy.get('#buttonDelay').click();
        //cy.get('#novoCampo', {timeout: 1000}).should('exist');
        
        //cy.get('#buttonListDOM').click();
        //cy.wait(5000);
        //cy.get('#lista li span',{timeout: 30000})
        //  .should('contain','Item 2');

        cy.get('#buttonListDOM').click();
        cy.get('#lista li span')
            .should('have.length',1);
        cy.get('#lista li span')
            .should('have.length',2);
    });

    it('Click Retry', ()=>{
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value','111');
    });

    it.only('Should vs Then', ()=>{
        // cy.get('#buttonListDOM').click();
        // Then aguarda a finalização para ser executado, diferente do should que executa o comando antes de aguardar
        cy.get('#buttonListDOM').should($el => {
            //.should('have.length',1);
            //console.log($el);
            expect($el).to.have.length(1)
            //return 2
            //cy.get('#buttonList')
        })

        // Apenas o then considera o return
        // Novas buscas devem ficar dentro do then
    })
})