const locators = {
    // Login
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
        XP_BTN_ALTERAR: "//table//td[contains(.,'Conta Corrente Bradesco')]/..//i[@class='far fa-edit']"
    },
    MESSAGE: '.toast-message',
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
    }

}

export default locators;