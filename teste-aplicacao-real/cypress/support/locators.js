const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        HOME: '[data-test=menu-home]',
        MOVIMENTOS: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]',
        LOGOUT: '[href="/logout"]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: "//table//td[contains(.,'Conta Corrente Bradesco')]/..//i[@class='far fa-edit']",
        FN_XP_BTN_ALTERAR: nomeConta => `//table//td[contains(.,'${nomeConta}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTOS: {
        T_RECEITA: '[data-test=tipo-receita]',
        T_DESPESA: '[data-test=tipo-despesa]',
        INICIO: '[data-test=data-transacao]',
        PAGAMENTO: '[data-test=data-pagamento]',
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (nomeMovimento, valor) => `//span[contains(., '${nomeMovimento}')]/following-sibling::small[contains(., '${valor}')]`,
        FN_XP_EXCLUIR_MOVIMENTO: nomeMovimento => `//span[contains(.,'${nomeMovimento}')]/../../..//i[@class='far fa-trash-alt']`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    },
    MESSAGE: '.toast-message',

}

export default locators;