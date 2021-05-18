import React, { Dispatch, SetStateAction } from 'react'
import styles from './products.module.scss'
import Product from './Product'
import { IProduct } from '../types/types';

export default function Products({ products, cart, setCart, favorites, setFavorites }: {
  products: Array<IProduct>,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}){
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <Product 
          product={product}  
          key={product.id}
          favorites={favorites}
          setFavorites={setFavorites}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}
