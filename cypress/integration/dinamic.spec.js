/// <reference types ="cypress" />

describe('Dinamic tests', () => {
    
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });
    
    beforeEach(()=>{
        cy.reload();
    });

    const foods = ['Carne','Frango','Pizza','Vegetariano'];

    foods.forEach(food => {
        it(`Cadastro com a comida ${food}`, () => {
            cy.get('#formNome').type('Rodrigo',{delay:150});
            cy.get('#formSobrenome').type('Paluma',{delay:150});
            cy.get(`[name=formSexo][value=M]`).click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        });
    })
});