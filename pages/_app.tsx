import { AppProps } from 'next/app';
import { useState } from 'react';
import Layout from '../Layout/Layout';
import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  return (
    <Layout>
      <Component
        {...pageProps}
        favorites={favorites}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
      />
    </Layout>
  );
};

export default App;
