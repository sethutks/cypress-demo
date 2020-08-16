// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('typeTab', (shiftKey, ctrlKey) => {
    cy.focused().trigger('keydown', {
        keyCode: 9,
        which: 9,
        shiftKey: shiftKey,
        ctrlKey: ctrlKey
    });
  });

  Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe) => {
    const $iframeDoc = $iframe.contents()
    const findBody = () => $iframeDoc.find('body')
    if ($iframeDoc.prop('readyState') === 'complete') return findBody()
    return Cypress.Promise((resolve) => $iframe.on('load', () => resolve(findBody())))
  })

  let originalWindow = null;
/*
Open a new window
*/
Cypress.Commands.add('openWindow', (url) => {
  // This is the first window -> Initialization !!
  if (!originalWindow) {
    originalWindow = cy.state('window');
    originalWindow.Id = 1;
  }
  // If it is second window 
  return new Promise(resolve => {
    window.top.secondWindow = window.top.open(url, 'secondWindow');
    window.top.secondWindow.Id = 2;
    setTimeout(() => {
      cy.state('window', window.top.secondWindow);
      cy.state('document', window.top.secondWindow.document);
      resolve();
    }, 5000)
  })
})
/*
Switch Window
*/
Cypress.Commands.add('switchWindow', () => {
  if (cy.state('window').Id === 1) {
    cy.state('window', window.top.secondWindow);
    cy.state('document', window.top.secondWindow.document);
  } else {
    cy.state('window', originalWindow);
    cy.state('document', originalWindow.document);
  }
  cy.state('window').focus();
})
/*
Close the second window
*/
Cypress.Commands.add('closeSecondWindow', () => {
  return new Promise(resolve => {
    window.top.secondWindow.close();
    window.top.secondWindow = null;
    cy.state('window', originalWindow);
    cy.state('document', originalWindow.document);
    cy.state('window').focus();
    resolve();
  })
})
Cypress.Commands.add('reloadDocument', (url) => {
  // If it is second window 
  return new Promise(resolve => {
    setTimeout(() => {
      cy.state('document', window.top.secondWindow.document);
      resolve();
    }, 5000)
  })
})