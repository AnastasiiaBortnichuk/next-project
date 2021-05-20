import React from 'react';
import Image from 'next/image';
import { IProduct } from '../shared';
import styles from '../styles/cart.module.scss';

const CART_TITLE = 'Cart';
const EMPTY_CART = 'Your cart is empty';

const Cart = ({ cart }: { cart: IProduct[] }): JSX.Element => {
  const getTotal = cart.length
    ? cart.map((product) => Number(product.price)).reduce((a, b) => a + b)
    : '0';

  return (
    <div className={styles.cart}>
      <p className={styles.title}>{cart.length ? CART_TITLE : EMPTY_CART}</p>
      {cart.map((prod) => (
        <div className={styles.product} key={prod.id}>
          <Image
            src={`http:${prod.api_featured_image}`}
            width={210}
            height={210}
            alt={prod.name}
            className={styles.image}
          />
          <p className={styles.details}>{prod.brand}</p>
          <p className={styles.details}>{prod.name}</p>
          <p className={styles.details}>{prod.price}</p>
        </div>
      ))}
      <p className={styles.total}>Total: {getTotal}</p>
    </div>
  );
};

export default Cart;
