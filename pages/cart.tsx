import { NextPage } from 'next';
import Image from 'next/image';
import { CART_TITLE, CART_EMPTY, useAppContext } from '@shared';
import styles from '@styles/cart.module.scss';

const Cart: NextPage = () => {
  const { cart } = useAppContext();

  const Count: number = cart.length
    ? cart.map((product) => +product.price).reduce((a, b) => a + b)
    : 0;

  const { cart_container, details, image, product, title, total } = styles;

  return (
    <div className={cart_container}>
      <h2 className={title}>{cart.length ? CART_TITLE : CART_EMPTY}</h2>
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
