import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import Products from '../components/Products'
import { GetStaticProps } from 'next'
import { IProduct } from '../types/types'


const Eyes = ({ mascara, eyeliner, eyeshadow, cart, setCart, favorites, setFavorites }:{
  mascara: Array<IProduct>,
  eyeliner: Array<IProduct>,
  eyeshadow: Array<IProduct>,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => (
  <>
    <Link href={'/category/mascara'}>
      <a><h2>Mascara</h2>view all</a>
    </Link>
    <Products 
      products={mascara.slice(0, 10)} 
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
    <br/>
    <Link href={'/category/eyeliner'}>
      <a><h2>Eyeliner</h2>view all</a>
    </Link>
    <Products 
      products={eyeliner.slice(0, 10)} 
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
    <br/>
    <Link href={'/category/eyeshadow'}>
      <a><h2>Eyeshadow</h2>view all</a>
    </Link>
    <Products 
      products={eyeshadow.slice(0, 10)} 
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
  const res = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=mascara")
  const mascara = await res.json();

  const res2 = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner")
  const eyeliner = await res2.json();

  const res3 = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeshadow")
  const eyeshadow = await res3.json();
 
  return {
    props: {
      mascara,
      eyeliner,
      eyeshadow
    },
  }
}

export default Eyes;