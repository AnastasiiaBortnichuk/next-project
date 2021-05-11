import React, { useState } from 'react'
import '../styles/globals.css'
import Layout from '../Layout/Layout'

function App({ Component, pageProps }) {
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
  ) 
}

export default App
