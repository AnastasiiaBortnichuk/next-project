import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import Products from '../components/Products'
import { GetStaticProps } from 'next'
import { IProduct } from '../types/types'


const Lips = ({ lipstick, lip_liner, cart, setCart, favorites, setFavorites }:{
  lipstick: Array<IProduct>,
  lip_liner: Array<IProduct>,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => (
  <>
    <Link href={'/category/lipstick'}>
      <a><h2>Lipstick</h2>view all</a>
    </Link>
    <Products 
      products={lipstick.slice(0, 10)} 
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
    <br/>
    <Link href={'/category/lip_liner'}>
      <a><h2>Lip liner</h2>view all</a>
    </Link>
    <Products 
      products={lip_liner.slice(0, 10)} 
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
  const res = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick")
  const lipstick = await res.json();

  const res2 = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lip_liner")
  const lip_liner = await res2.json();
 
  return {
    props: {
      lipstick,
      lip_liner
    },
  }
}

export default Lips;
