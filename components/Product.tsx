import Image from 'next/image';
import Link from 'next/link';
import { ProductComponentProps } from '../types/types';
import styles from '../styles/products.module.scss';

const Product = ({
  product,
  cart,
  setCart,
  favorites,
  setFavorites,
}: ProductComponentProps): JSX.Element => {
  const { id, api_featured_image, brand, name, price, price_sign, product_colors } = product;

  const handleClick = (prop, setProp) => {
    if (favorites.length === 0) {
      setProp([product]);
    } else {
      setProp(
        prop.some((item) => item.id === id)
          ? [...prop.filter((item) => item.id !== id)]
          : [...prop, product]
      );
    }
  };

  const getClassName = cart.some((purchase) => purchase.id === id)
    ? styles.button_buy__active
    : styles.button_buy;

  const getButtonTitle = cart.some((purchase) => purchase.id === id)
    ? 'Added to cart'
    : 'Add to cart';

  const getIcon = favorites.some((item) => item.id === id)
    ? '/filledHeartLike.svg'
    : '/heartLike.svg';

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
          <p>
            {price}
            <span>{price_sign}</span>
          </p>
          <ul className={styles.colors}>
            {product_colors.slice(0, 30).map((col, i) => (
              <li
                className={styles.color}
                style={{ background: `${col.hex_value}` }}
                key={`${col.hex_value}-${i}`}
              />
            ))}
          </ul>
        </a>
      </Link>
      <div className={styles.button}>
        <button type="submit" className={getClassName} onClick={() => handleClick(cart, setCart)}>
          {getButtonTitle}
        </button>
        <button
          type="submit"
          className={styles.button_like}
          onClick={() => handleClick(favorites, setFavorites)}
        >
          <img src={getIcon} alt="heart icon" />
        </button>
      </div>
    </div>
  );
};

export default Product;
