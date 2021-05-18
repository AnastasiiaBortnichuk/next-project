import { Dispatch, SetStateAction } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Products from '../../components/Products'
import { IProduct } from '../../types/types'

const ProductPage = ({ products, type, cart, setCart, favorites, setFavorites }:{
  products: Array<IProduct>,
  type: string,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>

}) => {
  return (
    <>
      <h2>{type}</h2>
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
          text-transform: capitalize;
        }
      `}</style>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json`)
  const products = await res.json();
  
  const allPaths = products.map(product => ({
    params: { type: product.product_type },
  }));

  const paths = Array.from(new Set(allPaths.map(JSON.stringify))).map((i:string) => JSON.parse(i));

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${params.type}`)
  const products = await res.json()
  
  return {
    props: {
      products,
      type: params.type,
    },
  }
}

export default ProductPage;