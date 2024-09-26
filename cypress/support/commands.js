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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// function addTask(task) {
//     cy.get('.new-todo').type(`${task}{enter}`)
// }

// function shouldContainTask(task) {
//     cy.get('.todo-list li').should('contain', 'task')
// }

// Pasirinktina komanda, kad pridėtumėte užduotį
Cypress.Commands.add('addTask', (task) => {
    cy.get('.new-todo').type(`${task}{enter}`)
})

// Pasirinktina komanda, kad patvirtintumėte, jog užduotis yra sąraše
Cypress.Commands.add('shouldContainTask', (task) => {
    cy.contains(task).should('exist')
})
