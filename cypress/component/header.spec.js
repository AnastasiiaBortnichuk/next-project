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
    cy.getLink().should('have.length', MENU_ITEMS.length);
    cy.getLink().first().should('have.text', MENU_ITEMS[0]);
    cy.getLink().eq(1).should('have.text', MENU_ITEMS[1]);
    cy.getLink().eq(2).should('have.text', MENU_ITEMS[2]);
    cy.getLink().eq(3).should('have.text', MENU_ITEMS[3]);
    cy.getLink().eq(4).should('have.text', MENU_ITEMS[4]);
    cy.getLink().eq(5).should('have.text', MENU_ITEMS[5]);
  })
})


