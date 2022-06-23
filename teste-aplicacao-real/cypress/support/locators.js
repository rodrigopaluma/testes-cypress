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
    MESSAGE: '.toast-message'

}

export default locators;