import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import PurchasePopup from '@components/PurchasePopup';
import { CART_TITLE, CART_EMPTY, DELETE_BUTTON, useCartContext } from '@shared';
import styles from '@styles/cart.module.scss';

const Cart: NextPage = () => {
  const { cart, setCart } = useCartContext();
  const [isPopupShown, setPopupShown] = useState<boolean>(false);

  const handleDelete = (id: number) => () => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const handleClick = (): void => {
    setPopupShown(true);
  };

  const Count: number = cart.length
    ? cart.map((product) => +product.price).reduce((a, b) => a + b)
    : 0;

  const {
    cart_container,
    checkout_button,
    delete_button,
    details,
    image,
    product,
    title,
    total,
  } = styles;

  useEffect(() => {
    if (isPopupShown) {
      setPopupShown(true);
    }
  }, [isPopupShown]);

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
          <button
            type="submit"
            className={delete_button}
            onClick={handleDelete(id)}
          >
            <img
              src={DELETE_BUTTON}
              alt="delete button"
              title="remove from cart"
            />
          </button>
        </div>
      ))}
      <p className={total}>Total: {Count}</p>
      <button
        type="submit"
        className={checkout_button}
        onClick={handleClick}
        disabled={Count === 0}
      >
        Checkout
      </button>
      {isPopupShown && <PurchasePopup setShown={setPopupShown} />}
    </div>
  );
};

export default Cart;
