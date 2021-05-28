import { AppProps } from 'next/app';
import { FC, useState } from 'react';
import Layout from '@layout/Layout';

import '../styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header items={MENU_ITEMS} />
      <Component
        {...pageProps}
        favorites={favorites}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
};

export default App;
