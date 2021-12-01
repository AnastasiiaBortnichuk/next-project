/// <reference types="cypress" />

import React from 'react';

import { mount } from '@cypress/react';

import Header from '../../components/Header';

import { MENU_ITEMS } from '@shared';

describe('Header component test', () => {
  beforeEach(() => {
    mount(<Header items={MENU_ITEMS} />);
  });

  it('renders favicon', () => {
    cy.get('#test-icon').should('exist');
  });

  it('renders navigation links', () => {
    cy.getByTestId('link').should('have.length', MENU_ITEMS.length);
    cy.getByTestId('link').eq(1).should('have.text', MENU_ITEMS[1]);
    cy.getByTestId('link').eq(2).should('have.text', MENU_ITEMS[2]);
    cy.getByTestId('link').eq(3).should('have.text', MENU_ITEMS[3]);
    cy.getByTestId('link').first().should('have.text', MENU_ITEMS[0]);
    cy.getByTestId('link').eq(4).should('have.text', MENU_ITEMS[4]);
    cy.getByTestId('link').eq(5).should('have.text', MENU_ITEMS[5]);
  })
})


