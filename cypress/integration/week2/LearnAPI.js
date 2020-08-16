/// <reference types = 'cypress'/> 
describe('Learn API', () => {
    it('Validate API response and UI data', () => {
        cy.visit('https://uibank.uipath.com/');
        cy.get('#username').type('sethutks');
        cy.get('#password').type('Usha@s3kar');
        cy.get('button[type="submit"]').first().click();
        cy.contains(' Loan Status ').click();
        cy.request('GET', 'https://uibank-api.azurewebsites.net/api/quotes/').then(response => {  
            let randomNumber = Math.floor(Math.random() * response.body.length);
            let idInApi = response.body[randomNumber].id;
            let amountInAPI = response.body[randomNumber].amount;
            cy.get('#quoteID').type(idInApi);
            cy.get('button[type="submit"]').first().click();
            cy.get('#amountValue').invoke('text').as('amountfromUI');
            cy.get('@amountfromUI').should('contains', amountInAPI);
        })
    })
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        debugger
        return false
    })   
})