/// <reference types ="cypress" />

it('A external test ...', () => {
    
});

// skip - Pula o teste
// only - Executa apenas o teste

describe('Shold group tests...', () => {
    describe('Should group more specific tests1...', ()=>{
        it.skip('A specific1 test ...', () => {
    
        });
    });

    describe('Should group more specific tests2...', ()=>{
        it('A specific1 test in group 2 ...', () => {
    
        });
    });

    it('A internal test ...', () => {
    
    });
})