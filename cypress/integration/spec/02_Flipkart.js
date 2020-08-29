/// <reference types = 'cypress'/>
/// <reference types = 'cypress-xpath'/>  
describe('Flipkart search for Vivo Phones', () =>{
    it('Search for Vivo Phones', () => {
       cy.visit('https://www.flipkart.com/');
       cy.contains('Electronics').trigger('mouseover');
       cy.wait(5000);
       cy.contains('Vivo').click();
       cy.wait(10000);
       cy.contains('Price -- High to Low').click();
       cy.get('select').first().select('₹13000');
       cy.get('select').last().select('₹25000');
       cy.scrollTo("bottom").contains('Number of Cores').click();
       cy.get('div[title="Octa Core"]').siblings().first().click();
      
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        debugger
        return false
    })
})