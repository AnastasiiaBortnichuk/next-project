import React from 'react';
import Header from './Header';

const MENU_ITEMS = [
  'catalog',
  'face',
  'eyes',
  'lips',
  'brows',
  'nails',
  'cart',
  'favorites',
];

const Layout = ({ children }): JSX.Element => (
  <>
    <Header items={MENU_ITEMS} />
    {children}
  </>
);

export default Layout;
