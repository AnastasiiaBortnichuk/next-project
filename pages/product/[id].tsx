import Image from 'next/image'
import { GetStaticProps, GetStaticPaths } from 'next'
import styles from './id.module.scss'
import { IProduct } from '../../types/types';
import { Dispatch, SetStateAction } from 'react';

const ProductPage = ({ product, cart, setCart, favorites, setFavorites }:{
  product: IProduct,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => {
  
  const { id, api_featured_image, brand, name, description, rating, price, price_sign, product_colors } = product;

  const handleClick = () => {
    if (favorites.length === 0) {
      setFavorites([product]);
    } else {
      setFavorites(
        favorites.some(item => item.id === id)
          ? [...favorites.filter(item => item.id !== id)]
          : [...favorites, product]
      );
    }
  };

  const handleAddCart = () => {
    if (cart.length === 0) {
      setCart([product]);
    } else {
      setCart(
        cart.some(item => item.id === id)
          ? [...cart.filter(item => item.id !== id)]
          : [...cart, product]
      );
    }
  };

  return (
    <>
    <h2 className={styles.name}>{name}</h2>
    <div className={styles.container}>
      <div className={styles.container_box}>
        <Image 
          src={`http:${api_featured_image}`}
          width={320}
          height={320}
          className={styles.image}
        />
        <p className={styles.text}>Price: {price}<span>{price_sign}</span></p>
        <div className={styles.button}>
        <button
          type="button"
          className={
            cart.some(purchase => purchase.id === id)
              ? styles.button_buy__active
              : styles.button_buy
          }
          onClick={handleAddCart}
        >
          {cart.some(purchase => purchase.id === id)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button type="button" className={styles.button_like} onClick={handleClick}>
          {favorites.some(item => item.id === id) ? (
            <img src="/FilledHeartLike.svg" alt="heart icon" />
          ) : (
            <img src="/HeartLike.svg" alt="heart icon" />
          )}
        </button>
      </div>
      </div>
      <div className={styles.container_box}>
        <h3 className={styles.brand}>Brand: {brand}</h3>
        <p className={styles.text}>{description}</p>
        <p className={styles.text}>Star rating:{ rating ? rating : ' unrated'} </p>
      </div> 
    </div>
    <div className={styles.colors}>
          {product_colors.map(col => (
            <div className={styles.colors_box} key={col.colour_name}>
              <div className={styles.color} style={{ background: `${col.hex_value}` }}></div>
              <div className={styles.text}>{col.colour_name}</div>
            </div>
          ))}
        </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json`)
  const products = await res.json();
  //const paths = products.map(product => Object.assign({}, {params: { name: product.name.replace(/[\/\s+]/g, '') }}));
  const paths = products.map(product => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products/${params.id}.json`)
  const product = await res.json()
  
  return {
    props: {
      product,
    },
  }
}

export default ProductPage;