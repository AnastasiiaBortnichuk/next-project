/// <reference types="cypress" />

import React from 'react';

import { mount } from '@cypress/react';

import Product from '../../components/Product';

const product = {
  api_featured_image: "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/740/original/data?1514062742",
  brand: "dior",
  id: 740,
  name: "Junon",
  price: "20.0",
  price_sign: "£",
  product_colors: [
    {hex_value: '#FCD9CB', colour_name: '108 Muguet'}, // rgb(252, 217, 203)
    {hex_value: '#EA4D54', colour_name: '445 Coral Crush'}, // rgb(234, 77, 84)
    {hex_value: '#F9C8C8', colour_name: '155 Tra-la-la'} // rgb(249, 200, 200)
  ],
};

describe('Product component test', () => {
  beforeEach(() => {
    mount(<Product product={product} />);
  });

  it('renders product image', () => {
    cy.get('#test-image').should('exist');
  });

  it('renders product name', () => {
    cy.findByText(product.name).should("exist");
  });

  it('renders product brand', () => {
    cy.findByText(product.brand).should("exist");
  });

  it('renders product price', () => {
    cy.findByText(product.price).should("exist");
  });

  it('renders product colour #FCD9CB', () => {
    cy.get(`${product.product_colors[0].hex_value}`)
      .should('have.attr', 'style')
      .and('include', 'rgb(252, 217, 203)')
  });  

  it('renders product colour #EA4D54', () => {
    cy.get(`${product.product_colors[1].hex_value}`)
      .should('have.attr', 'style')
      .and('include', 'rgb(234, 77, 84)')
  });  

  it('renders product colour #F9C8C8', () => {
    cy.get(`${product.product_colors[2].hex_value}`)
      .should('have.attr', 'style')
      .and('include', 'rgb(249, 200, 200)')
  });  
});
