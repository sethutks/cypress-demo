/// <reference types = 'cypress'/> 
describe('Myntra Product search', () => {
  it('Sunglasses search and validate Similar products', () => {


    cy.visit('https://www.myntra.com/', {
      headers: {
        "Accept-Encoding": "gzip, deflate"
      }
    })
    cy.get('input[class = desktop-searchBar]').type('Sunglasses').type('{enter}')

    cy.wait(6000)

    cy.get('input[value="Polaroid"]').first().click({ force: true });

    cy.wait(6000)

    cy.xpath("//h4[text()='Men Rectangle Sunglasses']").siblings('.product-sizes').first().invoke('text').then($productSize => {
      let productSize = $productSize;
      cy.log("Productb Size: ", productSize)
    })

    cy.xpath("//h4[text()='Men Rectangle Sunglasses']").siblings('.product-price').first().invoke('text').then($productPrice => {
      let productPrice = $productPrice;
      cy.log("Productb Price: ", productPrice)
    })

    cy.screenshot();
    cy.get('.product-ratingsContainer').first().siblings('a').trigger('mouseover');
    cy.wait(5000);
    cy.get('.image-grid-similarColorsCta').first().click({ force: true })
    
    var listofSimilarProducts = cy.get('.results-similarItemContainer').find('li').then(listing => {
      const listingCount = Cypress.$(listing).length;
      assert.isAbove(listingCount, 5, 'Similar products are greater than 5')
    });

  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    debugger
    return false
  })
})