/// <reference types="cypress" />

describe('All products page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Have catalog link', () => {
    cy.get('[data-testid=test-link]').should('exist');
    cy.contains('a', 'catalog').should('be.visible');
  });

  it('Should go to catalog page', () => {
    cy.contains('a', 'catalog').click();
    cy.wait(10000);
    cy.url().should('include', '/catalog');
    cy.get('[data-testid=all-products]').should('be.visible');    
  });
});