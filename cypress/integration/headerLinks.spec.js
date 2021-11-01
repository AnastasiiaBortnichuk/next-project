/// <reference types="cypress" />

describe('Header links test', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Have face link', () => {
    cy.get('[data-testid=test-link]').should('exist');
    cy.contains('a', 'face').should('be.visible');
  });

  it('Should go to face products page', () => {
    cy.contains('a', 'face').click();
    cy.wait(10000);
    cy.url().should('include', '/face');   
  });

  it('Should go to cart page', () => {
    cy.contains('a', 'cart').click();
    cy.wait(10000);
    cy.url().should('include', '/cart');   
  });

  it('Have favorites link', () => {
    cy.get('[data-testid=test-link]').should('exist');
    cy.contains('a', 'favorites').should('be.visible');
  });

  it('Should go to favorites page', () => {
    cy.contains('a', 'favorites').click();
    cy.wait(10000);
    cy.url().should('include', '/favorites');   
  });
});
