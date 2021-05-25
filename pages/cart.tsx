import React from 'react';
import Image from 'next/image';
import { IProduct } from '../shared';
import styles from '../styles/cart.module.scss';

const CART_TITLE = 'Cart';
const EMPTY_CART = 'Your cart is empty';

const Cart = ({ cart }: { cart: IProduct[] }): JSX.Element => {
  const Count = cart.length
    ? cart.map((product) => Number(product.price)).reduce((a, b) => a + b)
    : '0';

  const { cart_container, details, image, product, title, total } = styles;

  return (
    <div className={cart_container}>
      <h2 className={title}>{cart.length ? CART_TITLE : EMPTY_CART}</h2>
      {cart.map(({ id, api_featured_image, name, brand, price }) => (
        <div className={product} key={id}>
          <Image
            src={`http:${api_featured_image}`}
            width={210}
            height={210}
            alt={name}
            className={image}
          />
          <p className={details}>{brand}</p>
          <p className={details}>{name}</p>
          <p className={details}>{price}</p>
        </div>
      ))}
      <p className={total}>Total: {Count}</p>
    </div>
  );
};

export default Cart;
