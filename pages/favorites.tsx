import React from 'react'
import Products from '../components/Products'

const Favorites = ({ cart, setCart, favorites, setFavorites }) => (
  <>
    <section>
      {favorites.length ? <h1>You liked these products</h1> : <h1>Nothing was added to favorites</h1>}
      
      <Products 
        products={favorites}
        favorites={favorites}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
      />
    </section>
    <style jsx>{`
    section {
      margin: 0 30px;
    }
    h1 {
      text-align: center;
    }
    `}</style>
  </>
);

export default Favorites;