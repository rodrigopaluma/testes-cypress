/// <reference types ="cypress" />

import loc from "./../support/locators";
import "../support/commandsConta";
import buildEnv from "../support/buildEnv";

describe("Teste em nível funcional", () => {
  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    buildEnv();
    cy.login("rodrigo.paluma@gmail.com", "Jame");
    cy.get(loc.MENU.HOME).click();
  });

  it("Cadastro de Conta", () => {
    cy.route({
      method: "POST",
      url: "/contas",
      response: [
        {
          id: 1256769,
          nome: "Conta de Todex",
          visivel: true,
          usuario_id: 1000,
        },
      ],
    }).as("saveConta");

    cy.navContas();

    cy.route({
      method: "GET",
      url: "/contas",
      response: [
        {
          id: 1256763,
          nome: "Conta de Texte",
          visivel: true,
          usuario_id: 1000,
        },
        { id: 1256764, nome: "Conta Tst", visivel: true, usuario_id: 1000 },
        {
          id: 1256765,
          nome: "Conta para procastinação",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256766,
          nome: "Conta com movimentacao",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256767,
          nome: "Conta para saldo",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256768,
          nome: "Conta para extrato",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256769,
          nome: "Conta de Todex",
          visivel: true,
          usuario_id: 1000,
        },
      ],
    }).as("contasSave");

    cy.createConta("Conta Corrente Bradesco");
    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso");
  });

  it("Edição de Conta", () => {
    cy.route({
      method: "GET",
      url: "/contas",
      response: [
        {
          id: 1256763,
          nome: "Conta de Texte",
          visivel: true,
          usuario_id: 1000,
        },
        { id: 1256764, nome: "Conta Tst", visivel: true, usuario_id: 1000 },
        {
          id: 1256765,
          nome: "Conta para procastinação",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256766,
          nome: "Conta com movimentacao",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256767,
          nome: "Conta para saldo",
          visivel: true,
          usuario_id: 1000,
        },
        {
          id: 1256768,
          nome: "Conta para extrato",
          visivel: true,
          usuario_id: 1000,
        },
      ],
    }).as("contas");
    cy.navContas();
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR("Conta de Texte")).click();
    cy.get(loc.CONTAS.NOME).clear().type("Conta alterada", { delay: 50 });
    cy.route({
      method: "PUT",
      url: "/contas/**",
      response: [
        {
          id: 1256763,
          nome: "Conta alterada",
          visivel: true,
          usuario_id: 1000,
        },
      ],
    }).as("contaSaved");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "Conta atualizada com sucesso");
  });

  it("Criar uma conta com o mesmo nome", () => {
    cy.route({
      method: "POST",
      url: "/contas",
      response: 
        {
          error: 'Já existe uma conta com esse nome!'
        },
        status: 400
    }).as("saveContaMesmoNome");
    cy.navContas();
    cy.get(loc.CONTAS.NOME).clear().type("Conta mesmo nome", { delay: 30 });
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "code 400");
  });

  it("Criar uma Transação", () => {
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: [
        {
          conta_id: 1256764,
          data_pagamento: "2022-07-02T03:00:00.000Z",
          data_transacao: "2022-07-02T03:00:00.000Z",
          descricao: "Teste",
          envolvido: "Eu",
          id: 1174530,
          observacao: null,
          parcelamento_id: null,
          status: true,
          tipo: "REC",
          transferencia_id: null,
          usuario_id: 30951,
          valor: "1000.00"
        }
      ]
    }).as('saveTransacao');

    cy.route({
      method: 'GET',
      url: '/transacoes',
      response: 'fixture:movimentacaoSalva'
    }).as('listaTransacao');

    cy.get(loc.MENU.MOVIMENTOS).click();
    cy.get(loc.MOVIMENTOS.DESCRICAO).type("Teste", { delay: 30 });
    cy.get(loc.MOVIMENTOS.INTERESSADO).type("Eu Mesmo", { delay: 30 });
    cy.get(loc.MOVIMENTOS.CONTA).select("Conta de Texte");
    cy.get(loc.MOVIMENTOS.VALOR).type("123", { delay: 30 });
    cy.get(loc.MOVIMENTOS.STATUS).click();
    cy.get(loc.MOVIMENTOS.SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
    cy.get(loc.EXTRATO.LINHAS).should("have.length", 1);
    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO("Teste", '1.000,00')).should(
      "exist"
    );
  });

  it("Pegar o Balanço", () => {
    cy.route({
      method: 'PUT',
      url: '/transacoes/**',
      response: 'balanco'
    })
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta Falsa")).should(
      "contain",
      "100,00"
    );

    cy.get(loc.MENU.EXTRATO).click();
    cy.xpath(
      loc.EXTRATO.FN_XP_EDITA_MOVIMENTO("Conta mesmo nome")
    ).click();
    cy.get(loc.MOVIMENTOS.STATUS).click();
    cy.get(loc.MOVIMENTOS.SALVAR).click();
    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Conta mesmo nome")).should(
      "contain",
      "100,00"
    );
  });

  it("Excluir uma Movimentação", () => {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**',
      response: {},
      status: 204
    }).as('deleteTransacao');
    cy.get(loc.MENU.EXTRATO).click();
    cy.xpath(
      loc.EXTRATO.FN_XP_EXCLUIR_MOVIMENTO("Movimentacao para exclusao")
    ).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
  });

  it.only('Teste Responsividade', ()=>{
    cy.get('[data-test=menu-home]').should('exist').and('be.visible');
    cy.viewport(500,700);
    cy.get('[data-test=menu-home]').should('exist').and('be.not.visible');
    cy.viewport('iphone-5');
    cy.get('[data-test=menu-home]').should('exist').and('be.not.visible');
    cy.viewport('ipad-2');
    cy.get('[data-test=menu-home]').should('exist').and('be.visible');
  })

});
