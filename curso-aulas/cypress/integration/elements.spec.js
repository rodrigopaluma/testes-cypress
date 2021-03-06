/// <reference types ="cypress" />

describe('Work with basic elements', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(()=>{
        cy.reload();
    });

    it('Texts', ()=>{
        cy.get('body').should('contain','Cuidado');
        cy.get('span').should('contain','Cuidado');
        cy.get('.facilAchar').should('contain','Cuidado');
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...');
    });

    it('Links', ()=>{
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text','Voltou!');
        
        cy.reload();
        cy.get('#resultado').should('have.not.text','Voltou!');
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text','Voltou!');
    });

    it('Text Fields', ()=>{
        cy.get('#formNome').type('Cypress');
        cy.get('#formNome').should('have.value','Cypress');

        cy.get('[data-cy=dataSobrenome]').type('Test');
        cy.get('[data-cy=dataSobrenome]').should('have.value','Test');
        
        cy.get('#formComidaPizza').click();
        cy.get('#formComidaPizza').should('be.checked');

        cy.get('#elementosForm\\:sugestoes')
            .type('Teste de Cypress')
            .should('have.value','Teste de Cypress');

        cy.get(':nth-child(2) > :nth-child(6) > input')
            .type('Teste de Cypress12{backspace}{backspace}')
            .should('have.value','Teste de Cypress');

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Apenas um Teste de Cypress com limpeza de campo')
            .should('have.value','Apenas um Teste de Cypress com limpeza de campo');


        cy.get(':nth-child(2) > :nth-child(6) > input')
            .clear()
            .type('Erro{selectall}Acerto', {delay: 100})
            .should('have.value','Acerto');
    });

    it('Radio Buttons', ()=>{
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked');

        cy.get('#formSexoFem')
            .should('not.be.checked');

        cy.get("[name='formSexo']")
            .should('have.length',2);
    });

    it('Checkboxes', ()=>{
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked');

        cy.get('#formComidaCarne')
            .click()
            .click()
            .should('not.be.checked');

        cy.get('#formComidaPizza')
            .click()
            .should('not.be.checked');

        cy.get('[name=formComidaFavorita]')
            .should('have.length',4);

        cy.get('[name=formComidaFavorita]')
            .click({multiple:true})
            .should('have.length',4);
    });

    it.only('Select', ()=>{
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value','2graucomp');

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value','1graucomp');
        
        // Validar as op????es do select
        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8);
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = [];
            $arr.each(function(){
                values.push(this.innerHTML);
            })
            expect(values).to.include.members(['Superior','Mestrado'])
        })
    });

    it.only('Multiple Select', ()=>{
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada']);

            // TODO Validar op????es selecionadas com combo multiplo

        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada','Karate']);
            //.should('have.value','Karate');
        
        //cy.get('[data-testid=dataEsportes]').should('have.value',['nada','Karate']);
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'Karate', 'nada']);
            expect($el.val()).to.have.length(4)
        });

        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'Corrida', 'Karate', 'nada']);
    });
})