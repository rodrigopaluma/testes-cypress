/// <reference types ="cypress" />

import loc from "./../support/locators";
import "../support/commandsConta";

describe("Teste em nível funcional", () => {
    
    after(()=> {
        cy.clearLocalStorage();
    })

    before(() => {
    cy.server();

    cy.route({
      method: "POST",
      url: "/signin",
      response: {
        id: 1000,
        nome: "Usuário Falso",
        token:
          "Uma string muito grande que nao deveria ser aceita mas na verdade vai",
      },
    }).as("signin");

    cy.route({
      method: "GET",
      url: "/saldo",
      response:[
        {
            conta_id: 1,
            conta: 'Conta Falsa',
            saldo: 100,
        },
        {
            conta_id: 2,
            conta: 'Conta Falsa pra kramba',
            saldo: 200,
        }
    ]
    }).as("saldo");

    cy.login("rodrigo.paluma@gmail.com", "Jame");
  });

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click();
    //cy.clearData();
  });
  /* it('Login', function() {
        cy.visit('https://barrigareact.wcaquino.me/');
        cy.fixture('userData').as('usuario').then(()=>{
            cy.get('[data-test=email]').type(this.usuario.email, {delay:100});
            cy.get('[data-test=passwd]').type(this.usuario.password, {delay:100});
            cy.get('.btn').click();
            cy.get('.toast-message').should('contain', 'Bem vindo');
        })
    }); */

  it("Cadastro de Conta", () => {
    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            {"id":1256763,"nome":"Conta de Texte","visivel":true,"usuario_id":1000},
            {"id":1256764,"nome":"Conta Tst","visivel":true,"usuario_id":1000},
            {"id":1256765,"nome":"Conta para procastinação","visivel":true,"usuario_id":1000},
            {"id":1256766,"nome":"Conta com movimentacao","visivel":true,"usuario_id":1000},
            {"id":1256767,"nome":"Conta para saldo","visivel":true,"usuario_id":1000},
            {"id":1256768,"nome":"Conta para extrato","visivel":true,"usuario_id":1000}
        ]
    }).as('contas');

    cy.route({
        method: 'POST',
        url: '/contas',
        response: [
            {"id":1256769,"nome":"Conta de Todex","visivel":true,"usuario_id":1000},
        ]
    }).as('saveConta')

    cy.navContas();

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            {"id":1256763,"nome":"Conta de Texte","visivel":true,"usuario_id":1000},
            {"id":1256764,"nome":"Conta Tst","visivel":true,"usuario_id":1000},
            {"id":1256765,"nome":"Conta para procastinação","visivel":true,"usuario_id":1000},
            {"id":1256766,"nome":"Conta com movimentacao","visivel":true,"usuario_id":1000},
            {"id":1256767,"nome":"Conta para saldo","visivel":true,"usuario_id":1000},
            {"id":1256768,"nome":"Conta para extrato","visivel":true,"usuario_id":1000},
            {"id":1256769,"nome":"Conta de Todex","visivel":true,"usuario_id":1000}
        ]
    }).as('contasSave');

    cy.createConta("Conta Corrente Bradesco");
    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso");
  });

  it("Edição de Conta", () => {
    cy.navContas();
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR("Conta para alterar")).click();
    cy.get(loc.CONTAS.NOME).clear().type("Conta alterada", { delay: 50 });
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "Conta atualizada com sucesso");
  });

  it("Criar uma conta com o mesmo nome", () => {
    cy.navContas();
    cy.get(loc.CONTAS.NOME).clear().type("Conta mesmo nome", { delay: 30 });
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "code 400");
  });

  it("Criar uma Transação", () => {
    cy.get(loc.MENU.MOVIMENTOS).click();
    cy.get(loc.MOVIMENTOS.DESCRICAO).type("Descrição", { delay: 30 });
    cy.get(loc.MOVIMENTOS.INTERESSADO).type("Eu Mesmo", { delay: 30 });
    cy.get(loc.MOVIMENTOS.CONTA).select("Conta para movimentacoes");
    cy.get(loc.MOVIMENTOS.VALOR).type("500", { delay: 30 });
    cy.get(loc.MOVIMENTOS.STATUS).click();
    cy.get(loc.MOVIMENTOS.SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
    cy.get(loc.EXTRATO.LINHAS).should("have.length", 7);
    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO("Descrição", 500)).should(
      "exist"
    );
  });

  it("Pegar o Balanço", () => {
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta para saldo")).should(
      "contain",
      "534,00"
    );

    cy.get(loc.MENU.EXTRATO).click();
    cy.xpath(
      loc.EXTRATO.FN_XP_EDITA_MOVIMENTO("Movimentacao 1, calculo saldo")
    ).click();
    cy.get(loc.MOVIMENTOS.STATUS).click();
    cy.get(loc.MOVIMENTOS.SALVAR).click();
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta para saldo")).should(
      "contain",
      "4034,00"
    );
  });

  it("Excluir uma Movimentação", () => {
    cy.get(loc.MENU.EXTRATO).click();
    cy.xpath(
      loc.EXTRATO.FN_XP_EXCLUIR_MOVIMENTO("Movimentacao para exclusao")
    ).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
  });
});
