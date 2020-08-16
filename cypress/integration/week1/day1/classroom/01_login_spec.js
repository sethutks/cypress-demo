///<reference types = "cypress"/>

describe('Leaftaps Application Smoke Tests', () => {

  it('Test Leaftaps Login', () => {

    cy.visit('http://leaftaps.com/opentaps');

    cy.get('#username').type('DemoSalesManager');
    
    cy.get('#password').type('crmsfa');
    
    cy.get('.decorativeSubmit').click();
    
  })

})