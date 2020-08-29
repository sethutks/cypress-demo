///<reference types = "cypress"/>

describe('Lead module test cases', () => {

    before('Suite starts', () => {
        cy.log('Test Suite started')
    })
    
    beforeEach('Login to Leaftaps', () => {
        cy.visit('http://leaftaps.com/opentaps');

        cy.get('#username').type('DemoSalesManager');

        cy.get('#password').type('crmsfa');

        cy.get('.decorativeSubmit').click();

        cy.contains("CRM/SFA").click();

        cy.contains("Leads").click();
    })

    it('Create Lead', () => {
        cy.contains("Create Lead").click();

        cy.get("#createLeadForm_companyName").type("TestLeaf");

        cy.get("#createLeadForm_firstName").type("Sethu");

        cy.get("#createLeadForm_lastName").type("Subramanian");

        cy.get('#createLeadForm_dataSourceId').select('Direct Mail');

        cy.get('#createLeadForm_marketingCampaignId').select('CATRQ_AUTOMOBILE');

        cy.get('#createLeadForm_industryEnumId').select('IND_TELECOM');

        cy.get('#createLeadForm_ownershipEnumId').select('Corporation');

        cy.get('#createLeadForm_generalCountryGeoId').select('India');

        cy.get("input[value = 'Create Lead']").click();

        cy.title().should('eq','View Lead | opentaps CRM');
    })

    it('Duplicate Lead', () => {

        cy.contains("Find Leads").click();

        cy.contains('Email').click();

        cy.get("input[name='emailAddress']").type("abc@gmail.com");

        cy.xpath('//button[text()="Find Leads"]').click();

        cy.wait(4000);

        cy.xpath("(//div[@class='x-grid3-cell-inner x-grid3-col-partyId'])[1]/a").click();

        cy.wait(4000);

        cy.contains("Duplicate Lead").click();

        cy.title().should('eq','Duplicate Lead | opentaps CRM');

        let createleadName = 'Sample';
        cy.get('#createLeadForm_firstName').invoke('val').then($firstName =>{
            createleadName = $firstName;
            cy.log("console log", createleadName);
        })

        cy.get("input[value = 'Create Lead']").click();

        cy.wait(4000);

        let vleadName;
        cy.get('#viewLead_firstName_sp').invoke('text').then($ViewfirstName =>{
            vleadName = $ViewfirstName;
            cy.log("From view lead: ", vleadName);
        })
    })

   //It won't run in cypress 4.11 if any of the 'it' fails.
    afterEach('Logout from leaftaps', ()=>{
        cy.xpath("//a[@href='/opentaps/']").click();
        cy.get('.decorativeSubmit').click();
    })

    after("Suite Ends", () =>{
        cy.log("Test Suite Ends")
    })

    Cypress.on('uncaught:exception', (err, runnable) => {
        debugger
        return false
    })

})