/// <reference types="cypress" />

describe('All products page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Have catalog link', () => {
    cy.getByTestId('link').should('exist');
    cy.contains('a', 'catalog').should('be.visible');
  });

  it('Should go to catalog page', () => {
    cy.contains('a', 'catalog').click();
    cy.wait(20000);
    cy.url().should('include', '/catalog');
    cy.getByTestId('all-products').should('be.visible');    
  });
});