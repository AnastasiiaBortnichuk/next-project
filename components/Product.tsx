import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './products.module.scss'
import { IProduct } from '../types/types'

const Product = ({ product, cart, setCart, favorites, setFavorites }:{
  product: IProduct,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => {
  const { id, api_featured_image, brand, name, price, price_sign, product_colors } = product;

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
    <div className={styles.product}>
      <Link href={`/product/${id}`}>
        <a className={styles.product_container}>
            <Image 
              src={`http:${api_featured_image}`}
              width={210}
              height={210}
              className={styles.image}
            />
            <h3 className={styles.brand}>{brand}</h3>
            <p>{name}</p>
            <p>{price}<span>{price_sign}</span></p>
            <div className={styles.colors}>
              {product_colors.slice(0, 30).map((col, i) => (
                <div className={styles.color} style={{ background: `${col.hex_value}` }} key={`${col.hex_value}-${i}`}></div>
              ))}
            </div>
        </a>  
      </Link>
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
  );
}

export default Product;