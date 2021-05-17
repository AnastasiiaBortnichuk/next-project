import React, { Dispatch, SetStateAction } from 'react'

import Products from '../components/Products'
import { GetStaticProps } from 'next'
import { IProduct } from '../types/types'


const Brows = ({ products, cart, setCart, favorites, setFavorites }: {
  products: Array<IProduct>,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => (
  <>
    <h2>Eyebrows</h2>
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

export const getStaticProps: GetStaticProps = async() => {
  const res = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyebrow")
  const products = await res.json()
 
  return {
    props: {
      products,
    },
  }
}

export default Brows;
