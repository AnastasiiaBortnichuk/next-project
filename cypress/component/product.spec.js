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
    {hex_value: '#FCD9CB', colour_name: '108 Muguet'},
    {hex_value: '#EA4D54', colour_name: '445 Coral Crush'},
    {hex_value: '#F9C8C8', colour_name: '155 Tra-la-la'}
  ],
};

describe('Product component test', () => {
  beforeEach(() => {
    mount(<Product product={product} />);
  });

  it('renders product image', () => {
    cy.get('#test-image').should('exist');
  });
});
