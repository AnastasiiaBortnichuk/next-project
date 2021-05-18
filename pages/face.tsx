import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import Products from '../components/Products'
import { GetStaticProps } from 'next'
import { IProduct } from '../types/types'


const Face = ({ blush, bronzer, foundation, cart, setCart, favorites, setFavorites }:{
  blush: Array<IProduct>,
  bronzer: Array<IProduct>,
  foundation: Array<IProduct>,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => (
  <>
    <Link href={'/category/blush'}>
      <a><h2>Blush</h2>view all</a>
    </Link>
    <Products 
      products={blush.slice(0, 10)} 
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
    <br/>
    <Link href={'/category/bronzer'}>
      <a><h2>Bronzer</h2>view all</a>
    </Link>
    <Products 
      products={bronzer.slice(0, 10)} 
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
    <br/>
    <Link href={'/category/foundation'}>
      <a><h2>Foundation</h2>view all</a>
    </Link>
    <Products 
      products={foundation.slice(0, 10)} 
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
    <style jsx>{`
      a {
        display: inline-block;
        margin-left: 100px;
        font-size: 20px;
      }
    `}</style>
  </>
)

export const getStaticProps: GetStaticProps = async() => {
  const res = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush")
  const blush = await res.json();

  const res2 = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=bronzer")
  const bronzer = await res2.json();

  const res3 = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation")
  const foundation = await res3.json();
 
  return {
    props: {
      blush,
      bronzer,
      foundation
    },
  }
}

export default Face;