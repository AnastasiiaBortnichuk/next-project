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
    cy.get('[data-testid=test-link]').should('have.length', MENU_ITEMS.length);
    cy.get('[data-testid=test-link]').first().should('have.text', MENU_ITEMS[0])
    cy.get('[data-testid=test-link]').eq(1).should('have.text', MENU_ITEMS[1])
  })
})

