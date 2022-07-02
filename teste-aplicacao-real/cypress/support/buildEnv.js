const buildEnv = () => {
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
        },
        {
            conta_id: 3,
            conta: 'Conta mesmo nome',
            saldo: 100,
        },
    ]
    }).as("saldo");

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
            {"id":1256769,"nome":"Conta mesmo nome","visivel":true,"usuario_id":1000},
            {"id":1256770,"nome":"Conta Falsa","visivel":true,"usuario_id":1000}
        ]
    }).as('contas');

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            {conta: "Conta mesmo nome",
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
            valor: "1000.00"},
            {conta: "Conta Falsa",
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
            valor: "100.00"}
        ]
    }).as('extrato')
}

export default buildEnv;