import React from 'react'
import styles from './products.module.scss'
import Product from './Product'

export default function Products({ products, cart, setCart, favorites, setFavorites }){
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
