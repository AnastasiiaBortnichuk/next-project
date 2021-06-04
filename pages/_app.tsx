import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import Header from '@components/Header';
import { MENU_ITEMS, AppContextProvider } from '@shared';
import '@styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>MakeUp</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header items={MENU_ITEMS} />
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  </>
);

export default App;
