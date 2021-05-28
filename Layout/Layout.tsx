import React from 'react';
import Header from './Header';

const Layout = ({ children }): JSX.Element => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
