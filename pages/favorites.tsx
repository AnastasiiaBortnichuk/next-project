import React, { Dispatch, SetStateAction } from 'react'
import Products from '../components/Products'
import { IProduct } from '../types/types';

const Favorites = ({ cart, setCart, favorites, setFavorites }:{
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => (
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