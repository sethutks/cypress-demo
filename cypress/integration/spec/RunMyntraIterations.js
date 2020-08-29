/// <reference types = 'cypress'/>
const jsonArray = require("../../fixtures/Myntra.json");
describe('Myntra Product search', () => {
  
  jsonArray.forEach(eachData => {
    it('Sunglasses search and validate Similar products', () => {
      cy.visit('https://www.myntra.com/', {
        headers: {
          "Accept-Encoding": "gzip, deflate"
        }
      })
      cy.get('input[class = desktop-searchBar]').type(eachData.searchProduct).type('{enter}')
      cy.wait(6000);
      cy.get('input[value="'.concat(eachData.searchBrand).concat('"]')).first().click({ force: true });
      cy.wait(6000);
      let searchItemLctr = '//h4[text()="'.concat(eachData.searchItem).concat('"]');
      cy.xpath(searchItemLctr).siblings('.product-sizes').first().invoke('text').then($productSize => {
        let productSize = $productSize;
        cy.log("Productb Size: ", productSize)
      })
      cy.xpath(searchItemLctr).siblings('.product-price').first().invoke('text').then($productPrice => {
        let productPrice = $productPrice;
        cy.log("Productb Price: ", productPrice)
      })
      cy.get('.product-ratingsContainer').first().siblings('a').trigger('mouseover');
      cy.wait(5000);
      cy.get('.image-grid-similarColorsCta').first().click({ force: true })
      cy.get('.results-similarItemContainer').find('li').then(listing => {
        const listingCount = Cypress.$(listing).length;
        assert.isAbove(listingCount, 5, 'Similar products are greater than 5')
      });
    })
  })

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      debugger
      return false
    })
  })