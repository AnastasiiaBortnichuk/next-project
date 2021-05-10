import React from 'react'

import Products from '../components/Products'
import { GetStaticProps } from 'next'


export default function Nails({ products, brands, cart, setCart, favorites, setFavorites }) {
  
  // const paths = products.map(product => Object.assign({}, {params: { name: product.name.replace(/[\/\s+]/g, '') }}));

  return (
    <>
      <h2>Nail Polishes</h2>
      <Products 
        products={products} 
        favorites={favorites}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
      />
      <style jsx>{`
        h2 {
          display: inline-block;
          margin-left: 100px;
          font-size: 1.5em;
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const res = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish")
  const products = await res.json()
 
  return {
    props: {
      products,
    },
  }
}